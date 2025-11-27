import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import RescuerLogCard from '@/app/rescuer-components/logs/rescuer-log-card';
import '../../rescuer-styles/logs/rescuer-logs.css';
import ProtectedRoute from '@/app/universal-components/protected-route';

import Link from 'next/link';
import Image from 'next/image';

export default function RescuerLogs() {
	return (
		<>
			<ProtectedRoute roles={['RESCUER']}>
				{/* Header for the Logs */}
				<Header
					title='Resident Logs'
					subtitle='Check all the logs from the residents'
					date='December 25, 2025'
					time='10:30 AM'
					image='/images/header-icon.jpg'
				/>
				<div className='rescuer-logs-container'>
					<div className='rescuer-logs-header'>
						<p>All Status Logs</p>
						<Link
							href=''
							className='filter'>
							<p>Filter</p>
							<Image
								src='/images/universal-icons/filter.png'
								alt='filter.png'
								width={20}
								height={20}
							/>
						</Link>
					</div>
					{/* Placeholder for now */}
					<div className='logs'>
						<RescuerLogCard
							residentName='Niki Zefanya'
							logsDate='December 25, 2025'
							logsTime='08:08 PM'
							logsStatus='monitoring'
							logsAddress='123 Chicken Curry St., Brgy. UP Diliman, Quezon City, PH, 1101'
						/>
						<RescuerLogCard
							residentName='Luke Chiang'
							logsDate='December 25, 2025'
							logsTime='08:08 PM'
							logsStatus='safe'
							logsAddress='123 Chicken Curry St., Brgy. UP Diliman, Quezon City, PH, 1101'
						/>
						<RescuerLogCard
							residentName='Niki Zefanya'
							logsDate='December 25, 2025'
							logsTime='08:08 PM'
							logsStatus='not safe'
							logsAddress='123 Chicken Curry St., Brgy. UP Diliman, Quezon City, PH, 1101'
						/>
					</div>
				</div>
				{/* Navigation Bar */}
				<AlalayNavigation role='rescuer' />
			</ProtectedRoute>
		</>
	);
}
