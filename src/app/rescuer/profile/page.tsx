'use client';

import { useState } from 'react';
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

export default function RescuerProfile() {
	const [activeModal, setActiveModal] = useState<string | null>(null);
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem('user');
		router.push('/login');
	};

	return (
		<>
			<ProtectedRoute roles={['rescuer']}>
				{/* Header for the Profile */}
				<ProfileHeader
					role='rescuer'
					username='Juan A. Dela Cruz'
					city='Quezon City'
					residentId='R12345'
					rescuerId='S67890'
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
					{activeModal === 'edit' && <EditProfileForm />}
					{activeModal === 'password' && <ChangePasswordForm />}
				</EditModalForm>
			</ProtectedRoute>
		</>
	);
}
