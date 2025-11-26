'use client';

import '../../resident-styles/maps/resident-map.css';
import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import dynamic from 'next/dynamic';
import ResidentMapStatus from '@/app/resident-components/maps/resident-map-status';
import ProtectedRoute from '@/app/universal-components/protected-route';

const MapComponent = dynamic(
	() => import('../../universal-components/map-component'),
	{
		ssr: false,
	}
);

export default function RescuerMap() {
	return (
		<>
			<ProtectedRoute roles={['resident']}>
				<div className='resident-map-container'>
					{/* Header for the Maps */}
					<Header
						title='Welcome, Juan!'
						subtitle='How are you today?'
						date='December 25, 2025'
						time='10:30 AM'
						image='/images/header-icon.jpg'
					/>
					{/* Placeholder for now */}

					<MapComponent role='resident' />
					<ResidentMapStatus />

					{/* Navigation Bar */}
					<AlalayNavigation role='resident' />
				</div>
			</ProtectedRoute>
		</>
	);
}
