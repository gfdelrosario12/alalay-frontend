'use client';

import '../../resident-styles/people/resident-people.css';
import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import PeopleCard from '@/app/universal-components/people-card';
import AddContactModal from '@/app/resident-components/people/add-contact-modal';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/universal-components/protected-route';
import { getUser } from '../../context/auth';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function RescuerPeople() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [friends, setFriends] = useState<any[]>([]);

	useEffect(() => {
		const user = getUser();
		if (!user || !user.id) return;
		const fetchFriends = async () => {
			const query = `query BookmarkedUsers($userId: ID!) {\n  bookmarkedUsers(userId: $userId) {\n    id\n    firstName\n    lastName\n    permanentAddress\n    currentLatitude\n    currentLongitude\n    role\n    email\n    phoneNumber\n    age\n    birthDate\n    emergencyContactName\n    emergencyContactDetails\n    createdAt\n  }\n}`;
			const variables = { userId: user.id };
			const res = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query, variables })
			});
			const data = await res.json();
			if (data.data && data.data.bookmarkedUsers) {
				setFriends(data.data.bookmarkedUsers);
			}
		};
		fetchFriends();
	}, []);

	return (
		<>
			<ProtectedRoute roles={['RESIDENT']}>
				<Header
					title='My People'
					subtitle='Check-in on your love ones'
					date='December 25, 2025'
					time='10:30 AM'
					image='/images/header-icon.jpg'
				/>
				<div className='resident-people-container'>
					<div className='resident-people-link'>
						<button
							onClick={() => setIsModalOpen(true)}
							className='add-contact-button'>
							+ Add Contact
						</button>
						<Link
							href=''
							className='refresh'>
							<p>Refresh</p>
							<Image
								src='/images/universal-icons/refresh.png'
								alt='refresh.png'
								width={20}
								height={20}
							/>
						</Link>
					</div>
					<div className='resident-people-cards'>
						{friends.map(friend => (
							<PeopleCard
								key={friend.id}
								residentName={`${friend.firstName || ''} ${friend.lastName || ''}`.trim()}
								residentAddress={friend.permanentAddress || ''}
								barangay={''}
								residentAvatar='/images/header-icon.jpg'
								residentId={friend.id}
								residentStatus='Unknown'
							/>
						))}
					</div>

					{/* Navigation Bar */}
					<AlalayNavigation role='resident' />
				</div>
				{/* Add Contact Modal */}
				<AddContactModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</ProtectedRoute>
		</>
	);
}
