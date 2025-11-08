'use client';

import '../../resident-styles/people/resident-people.css';
import ResidentHeader from '../../resident-components/resident-header';
import ResidentNavigation from '../../resident-components/resident-navigation';
import PeopleCard from '@/app/universal-components/people-card';
import AddContactModal from '@/app/resident-components/people/add-contact-modal';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ResidentPeople() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			{/* Header for the People Page */}
			<ResidentHeader
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
				{/* Placeholder for now */}
				<div className='resident-people-cards'>
					<PeopleCard
						residentName='Luke Chiang'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123123123'
						residentStatus='Safe'
					/>
					<PeopleCard
						residentName='Niki Zefanya'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='231231231'
						residentStatus='Unsafe'
					/>
					<PeopleCard
						residentName='Jeff Bernat'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123143234'
						residentStatus='Monitoring'
					/>
					<PeopleCard
						residentName='Jeff Bernat'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123143234'
						residentStatus='Monitoring'
					/>
					<PeopleCard
						residentName='Jeff Bernat'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123143234'
						residentStatus='Monitoring'
					/>
					<PeopleCard
						residentName='Jeff Bernat'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123143234'
						residentStatus='Monitoring'
					/>
				</div>

				{/* Navigation Bar */}
				<ResidentNavigation />
			</div>
			{/* Add Contact Modal */}
			<AddContactModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
}
