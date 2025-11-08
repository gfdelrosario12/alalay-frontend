import ResidentNavigation from '../../resident-components/resident-navigation';
import ProfileHeader from '@/app/universal-components/profile-header';

export default function ResidentProfile() {
	return (
		<>
			<div className='resident-profile-container'>
				{/* Header for the Profile */}
				<ProfileHeader
					role='resident'
					username='Juan A. Dela Cruz'
					city='Quezon City'
					residentId='R12345'
					rescuerId='S67890'
					image='/images/header-icon.jpg'
				/>
				{/* Placeholder for now */}

				{/* Navigation Bar */}
				<ResidentNavigation />
			</div>
		</>
	);
}
