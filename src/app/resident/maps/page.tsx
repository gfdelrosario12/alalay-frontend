'use client';

import '../../resident-styles/maps/resident-map.css';
import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import dynamic from 'next/dynamic';
import ResidentMapStatus from '@/app/resident-components/maps/resident-map-status';
import ProtectedRoute from '@/app/universal-components/protected-route';
import { useEffect, useState } from 'react';
import { getUser, getToken } from '../../context/auth';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';
const MapComponent = dynamic(
	() => import('../../universal-components/map-component'),
	{
		ssr: false,
	}
);

export default function RescuerMap() {
	const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
	const [friends, setFriends] = useState<any[]>([]);

	useEffect(() => {
		const user = getUser();
		if (!user || !user.id) return;

		const updateLocation = () => {
			if (!navigator.geolocation) return;
			navigator.geolocation.getCurrentPosition(async (pos) => {
				const { latitude, longitude } = pos.coords;
				console.log('[Location] Fetched:', { latitude, longitude });
				setCurrentLocation({ lat: latitude, lng: longitude });
				const mutation = `mutation UpdateUserLocation($userId: ID!, $latitude: Float!, $longitude: Float!) {\n  updateUserLocation(userId: $userId, latitude: $latitude, longitude: $longitude)\n}`;
				const variables = { userId: user.id, latitude, longitude };
				await fetch(GRAPHQL_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${getToken()}`
					},
					body: JSON.stringify({ query: mutation, variables })
				});
			});
		};

		updateLocation();
		const interval = setInterval(updateLocation, 15 * 60 * 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const user = getUser();
		if (!user || !user.id) return;

		// Fetch bookmarked users (friends)
		const fetchFriends = async () => {
			const query = `query BookmarkedUsers($userId: ID!) {\n  bookmarkedUsers(userId: $userId) {\n    id\n    firstName\n    lastName\n    currentLatitude\n    currentLongitude\n    role\n    email\n    phoneNumber\n    permanentAddress\n    age\n    birthDate\n    emergencyContactName\n    emergencyContactDetails\n    createdAt\n  }\n}`;
			const variables = { userId: user.id };
			const res = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query, variables })
			});
			const data = await res.json();
			if (data.data && data.data.bookmarkedUsers) {
				setFriends(
					data.data.bookmarkedUsers.map((u: any) => ({
						residentName: `${u.firstName || ''} ${u.lastName || ''}`.trim(),
						residentStatus: 'safe', // You can update this if you have status info
						residentLocation: [u.currentLatitude, u.currentLongitude],
						id: u.id,
						email: u.email,
						role: u.role,
						phoneNumber: u.phoneNumber,
						permanentAddress: u.permanentAddress,
						age: u.age,
						birthDate: u.birthDate,
						emergencyContactName: u.emergencyContactName,
						emergencyContactDetails: u.emergencyContactDetails,
						createdAt: u.createdAt,
					}))
				);
			}
		};
		fetchFriends();
	}, []);

	const user = getUser();
	const displayName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Juan';

	const [now, setNow] = useState(new Date());
	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);
	const dateStr = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
	const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

	return (
		<>
			<ProtectedRoute roles={['RESIDENT']}>
				<div className='resident-map-container'>
					<Header
						title={`Welcome, ${displayName}!`}
						subtitle='How are you today?'
						date={dateStr}
						time={timeStr}
						image='/images/header-icon.jpg'
					/>

					<MapComponent role='RESIDENT' currentLocation={currentLocation} friends={friends} />
					<ResidentMapStatus />

					<AlalayNavigation role='resident' />
				</div>
			</ProtectedRoute>
		</>
	);
}
