'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import AlalayNavigation from '../../universal-components/alalay-navigation';
import ProfileHeader from '@/app/universal-components/profile-header';
import '../../resident-styles/profile/resident-profile.css';
import ProfileLink from '@/app/universal-components/profile-components/profile-link';
import EditModalForm from '@/app/universal-components/profile-components/edit-modal-form';

import EditProfileForm from '@/app/universal-components/profile-components/edit-profile-form';
import ChangePasswordForm from '@/app/universal-components/profile-components/change-password-form';

import editName from '../../../../public/images/universal-icons/profile-link-icons/edit-profile.png';
import editPassword from '../../../../public/images/universal-icons/profile-link-icons/password.png';

import ProtectedRoute from '@/app/universal-components/protected-route';
import { useAuth } from '@/app/context/auth';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function RescuerProfile() {
	const [activeModal, setActiveModal] = useState<string | null>(null);
	const router = useRouter();
	const { user: sessionUser, logout } = useAuth();
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		if (!sessionUser || !sessionUser.id) return;
		const fetchUser = async () => {
			const query = `query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    email\n    firstName\n    middleName\n    lastName\n    permanentAddress\n    age\n    birthDate\n    emergencyContactName\n    emergencyContactDetails\n    phoneNumber\n    currentLatitude\n    currentLongitude\n    role\n    createdAt\n  }\n}`;
			const variables = { id: sessionUser.id };
			const res = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query, variables })
			});
			const data = await res.json();
			if (data.data && data.data.user) {
				setUser(data.data.user);
			}
		};
		fetchUser();
	}, [sessionUser]);

	const handleLogout = () => {
		logout();
		router.push('/login');
	};

	const displayUser = user || sessionUser;

	// Only render one modal child at a time
	let modalChild: React.ReactElement | null = null;
	if (activeModal === 'edit') {
		modalChild = <EditProfileForm />;
	} else if (activeModal === 'password') {
		modalChild = <ChangePasswordForm />;
	}

	return (
		<>
			<ProtectedRoute roles={['RESIDENT']}>
				{/* Header for the Profile */}
				<ProfileHeader
					role={displayUser?.role?.toLowerCase() || 'resident'}
					username={displayUser ? `${displayUser.firstName || ''} ${displayUser.lastName || ''}`.trim() : ''}
					city={displayUser?.permanentAddress || ''}
					residentId={displayUser?.id || ''}
					rescuerId={displayUser?.id || ''}
					image='/images/header-icon.jpg'
				/>
				<div className='resident-profile-container'>
					<div className=''>
						<ProfileLink
							linkIcon={editName}
							linkName='Edit Profile'
							onClick={() => setActiveModal('edit')}
						/>
						<ProfileLink
							linkIcon={editPassword}
							linkName='Change Password'
							onClick={() => setActiveModal('password')}
						/>
					</div>
					<div className='logout-container'>
						<button
							className='logout-button'
							onClick={handleLogout}>
							<span>Logout</span>
						</button>
					</div>
				</div>
				{/* Navigation Bar */}
				<AlalayNavigation role='resident' />

				{/* Modal Form for Editing User Profile */}
				<EditModalForm
					isOpen={!!activeModal}
					title={activeModal === 'edit' ? 'Edit Profile' : 'Change Password'}
					onClose={() => setActiveModal(null)}
				>
					{modalChild || <></>}
				</EditModalForm>
			</ProtectedRoute>
		</>
	);
}
