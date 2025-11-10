'use client';

import { useState } from 'react';

import ResidentNavigation from '../../resident-components/resident-navigation';
import ProfileHeader from '@/app/universal-components/profile-header';
import '../../resident-styles/profile/resident-profile.css';
import ProfileLink from '@/app/universal-components/profile-components/profile-link';
import EditModalForm from '@/app/universal-components/profile-components/edit-modal-form';

import EditProfileForm from '@/app/universal-components/profile-components/edit-profile-form';
import ChangeEmailForm from '@/app/universal-components/profile-components/change-email-form';
import ChangePasswordForm from '@/app/universal-components/profile-components/change-password-form';

import editName from '../../../../public/images/universal-icons/profile-link-icons/edit-profile.png';
import editEmail from '../../../../public/images/universal-icons/profile-link-icons/email.png';
import editPassword from '../../../../public/images/universal-icons/profile-link-icons/password.png';

export default function ResidentProfile() {
	const [activeModal, setActiveModal] = useState<string | null>(null);

	return (
		<>
			{/* Header for the Profile */}
			<ProfileHeader
				role='resident'
				username='Juan A. Dela Cruz'
				city='Quezon City'
				residentId='R12345'
				rescuerId='S67890'
				image='/images/header-icon.jpg'
			/>
			<div className='resident-profile-container'>
				<ProfileLink
					linkIcon={editName}
					linkName='Edit Profile'
					onClick={() => setActiveModal('edit')}
				/>
				<ProfileLink
					linkIcon={editEmail}
					linkName='Change Email'
					onClick={() => setActiveModal('email')}
				/>
				<ProfileLink
					linkIcon={editPassword}
					linkName='Change Password'
					onClick={() => setActiveModal('password')}
				/>
			</div>
			{/* Navigation Bar */}
			<ResidentNavigation />

			{/* Modal Form for Editing User Profile */}
			<EditModalForm
				isOpen={!!activeModal}
				title={
					activeModal === 'edit'
						? 'Edit Profile'
						: activeModal === 'email'
						? 'Change Email'
						: 'Change Password'
				}
				onClose={() => setActiveModal(null)}>
				{activeModal === 'edit' && <EditProfileForm />}
				{activeModal === 'email' && <ChangeEmailForm />}
				{activeModal === 'password' && <ChangePasswordForm />}
			</EditModalForm>
		</>
	);
}
