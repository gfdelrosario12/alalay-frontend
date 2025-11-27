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

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function RescuerProfile() {
	const [activeModal, setActiveModal] = useState<string | null>(null);
	const router = useRouter();
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const userStr = typeof window !== 'undefined' ? localStorage.getItem('alalay_user') : null;
		const sessionUser = userStr ? JSON.parse(userStr) : null;
		if (!sessionUser || !sessionUser.id) return;
		const fetchUser = async () => {
			const query = `query GetUser($id: ID!) { user(id: $id) { id email firstName middleName lastName permanentAddress age birthDate emergencyContactName emergencyContactDetails phoneNumber currentLatitude currentLongitude role createdAt } }`;
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
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('alalay_user');
		router.push('/login');
	};

	const displayUser = user || (typeof window !== 'undefined' && localStorage.getItem('alalay_user') ? JSON.parse(localStorage.getItem('alalay_user') as string) : null);

	let modalChild: React.ReactElement | null = null;
	if (activeModal === 'edit') {
		modalChild = <EditProfileForm />;
	} else if (activeModal === 'password') {
		modalChild = <ChangePasswordForm />;
	}

	return (
		<>
			<ProtectedRoute roles={['RESCUER']}>
				{/* Header for the Profile */}
				<ProfileHeader
					role={displayUser?.role?.toLowerCase() || 'rescuer'}
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
				<AlalayNavigation role='rescuer' />

				{/* Modal Form for Editing User Profile */}
				<EditModalForm
					isOpen={!!activeModal}
					title={activeModal === 'edit' ? 'Edit Profile' : 'Change Password'}
					onClose={() => setActiveModal(null)}>
					{modalChild || <></>}
				</EditModalForm>
			</ProtectedRoute>
		</>
	);
}
