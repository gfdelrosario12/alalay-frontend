'use client';

import '../../rescuer-styles/people/rescuer-people.css';
import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import PeopleCard from '@/app/universal-components/people-card';
import Link from 'next/link';
import Image from 'next/image';

export default function RescuerPeople() {
	return (
		<>
			{/* Header for the People Page */}
			<Header
				title='Residents'
				subtitle='Check the status of all the residents'
				date='December 25, 2025'
				time='10:30 AM'
				image='/images/header-icon.jpg'
			/>
			<div className='rescuer-people-container'>
				<div className='rescuer-people-link'>
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
				<div className='rescuer-people-cards'>
					<PeopleCard
						residentName='Luke Chiang'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123123123'
						residentStatus='Safe'
						isRescuer={true}
					/>
					<PeopleCard
						residentName='Niki Zefanya'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='231231231'
						residentStatus='Unsafe'
						isRescuer={true}
					/>
					<PeopleCard
						residentName='Jeff Bernat'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123143234'
						residentStatus='Monitoring'
						isRescuer={true}
					/>
					<PeopleCard
						residentName='Jeff Bernat'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123143234'
						residentStatus='Monitoring'
						isRescuer={true}
					/>
					<PeopleCard
						residentName='Jeff Bernat'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123143234'
						residentStatus='Monitoring'
						isRescuer={true}
					/>
					<PeopleCard
						residentName='Jeff Bernat'
						residentAddress='123 Emilio St., Brgy. Kalipi, Quezon City'
						barangay='Brgy. Kalipi'
						residentAvatar='/images/header-icon.jpg'
						residentId='123143234'
						residentStatus='Monitoring'
						isRescuer={true}
					/>
				</div>

				{/* Navigation Bar */}
				<AlalayNavigation role='rescuer' />
			</div>
		</>
	);
}
