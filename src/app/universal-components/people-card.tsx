'use client';
import { useState } from 'react';

import Image, { StaticImageData } from 'next/image';
import '../universal-styles/people-card.css';
import DeleteModal from './delete-modal';

type PeopleCardProps = {
	residentName: string;
	barangay: string;
	residentStatus: string;
	residentId: string;
	residentAddress: string;
	residentAvatar: string | StaticImageData;
};

export default function PeopleCard({
	residentName,
	barangay,
	residentStatus,
	residentId,
	residentAddress,
	residentAvatar,
}: PeopleCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleAdditionalInfo = () => {
		setIsExpanded(!isExpanded);
	};

	// This will be called when user confirms delete
	const handleConfirmDelete = () => {
		console.log(`Contact with UID ${residentId} deleted`);
		// Replace the main logic for deleting the contact
	};

	// CSS Class for different statuses
	const statusClass =
		{
			safe: 'status-safe',
			unsafe: 'status-unsafe',
			monitoring: 'status-monitoring',
		}[residentStatus.toLowerCase()] || 'status-default';

	return (
		<>
			<div
				className='resident-people-card'
				onClick={toggleAdditionalInfo}>
				{/* The people-info section is the container for the person's image, name, city, and status */}
				<div className='people-info'>
					<div className='image-card'>
						<Image
							src={residentAvatar}
							alt='Resident Image'
							width={50}
							height={50}
						/>
					</div>
					<div className='name-card'>
						<p>{residentName}</p>
					</div>
					<div className='city-card'>
						<p>{barangay}</p>
					</div>
					<div className='status-card'>
						<p className={`status-card ${statusClass}`}>{residentStatus}</p>
					</div>
				</div>
				{/* The additional-info section is used to display more details about the person */}
				<div
					className={`additional-info overflow-hidden transition-all duration-300 ${
						isExpanded ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
					}`}>
					<div className='uid'>
						<span>UID: </span>
						<p>{residentId}</p>
					</div>
					<div className='add-info-content'>
						<div className='content-left'>
							<h2>Latest Log:</h2>
							<p>{residentStatus}</p>
						</div>
						<div className='content-right'>
							<h2>Last Location:</h2>
							<p>{residentAddress}</p>
						</div>
					</div>
					<div className='add-info-btn'>
						<DeleteModal
							title='Delete Contact'
							description='Are you sure you want to delete this contact? This action cannot be undone.'
							onConfirm={handleConfirmDelete}
							triggerText='Delete Contact'
						/>
					</div>
				</div>
			</div>
		</>
	);
}
