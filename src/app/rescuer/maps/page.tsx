'use client';

import '../../rescuer-styles/maps/rescuer-map.css';
import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import dynamic from 'next/dynamic';
import RescuerMapStatus from '../../rescuer-components/maps/rescuer-map-status';
import ProtectedRoute from '@/app/universal-components/protected-route';
import { useEffect, useState } from 'react';

const MapComponent = dynamic(
	() => import('../../universal-components/map-component'),
	{
		ssr: false,
	}
);

export default function RescuerMap() {
	const [now, setNow] = useState(new Date());
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userStr = localStorage.getItem('alalay_user');
			if (userStr) setUser(JSON.parse(userStr));
		}
	}, []);

	const displayName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Juan';
	const dateStr = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
	const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

	return (
		<>
			<ProtectedRoute roles={['RESCUER']}>
				<div className='rescuer-map-container'>
					{/* Header for the Maps */}
					<Header
						title={`Welcome, ${displayName}!`}
						subtitle='What will you do today?'
						date={dateStr}
						time={timeStr}
						image='/images/header-icon.jpg'
					/>
					{/* Placeholder for now */}

					<MapComponent role='RESCUER' />
					<RescuerMapStatus />

					{/* Navigation Bar */}
					<AlalayNavigation role='rescuer' />
				</div>
			</ProtectedRoute>
		</>
	);
}
