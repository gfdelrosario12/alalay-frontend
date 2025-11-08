'use client';

import '../../resident-styles/maps/resident-map.css';
import ResidentHeader from '../../resident-components/resident-header';
import ResidentNavigation from '../../resident-components/resident-navigation';
import dynamic from 'next/dynamic';
import ResidentMapStatus from '@/app/resident-components/maps/resident-map-status';

const MapComponent = dynamic(
	() => import('../../universal-components/map-component'),
	{
		ssr: false,
	}
);

export default function ResidentMap() {
	return (
		<>
			<div className='resident-map-container'>
				{/* Header for the Maps */}
				<ResidentHeader
					title='Welcome, Juan!'
					subtitle='How are you today?'
					date='December 25, 2025'
					time='10:30 AM'
					image='/images/header-icon.jpg'
				/>
				{/* Placeholder for now */}

				<MapComponent />
				<ResidentMapStatus />

				{/* Navigation Bar */}
				<ResidentNavigation />
			</div>
		</>
	);
}
