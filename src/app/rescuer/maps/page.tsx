'use client';

import '../../rescuer-styles/maps/rescuer-map.css';
import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import dynamic from 'next/dynamic';
import RescuerMapStatus from '../../rescuer-components/maps/rescuer-map-status';
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
			<ProtectedRoute roles={['rescuer']}>
				<div className='rescuer-map-container'>
					{/* Header for the Maps */}
					<Header
						title='Welcome, Juan!'
						subtitle='What will you do today?'
						date='December 25, 2025'
						time='10:30 AM'
						image='/images/header-icon.jpg'
					/>
					{/* Placeholder for now */}

					<MapComponent role='rescuer' />
					<RescuerMapStatus />

					{/* Navigation Bar */}
					<AlalayNavigation role='rescuer' />
				</div>
			</ProtectedRoute>
		</>
	);
}
