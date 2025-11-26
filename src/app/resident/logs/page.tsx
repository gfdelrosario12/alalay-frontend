import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import LogsCard from '../../resident-components/logs/logs-card';
import ProtectedRoute from '@/app/universal-components/protected-route';
import '../../resident-styles/logs/resident-logs.css';

import Link from 'next/link';
import Image from 'next/image';

export default function RescuerLogs() {
	return (
		<>
			<ProtectedRoute roles={['resident']}>
				{' '}
				{/* Header for the Logs */}
				<Header
					title='Personal Logs'
					subtitle="Here's your logs overview"
					date='December 25, 2025'
					time='10:30 AM'
					image='/images/header-icon.jpg'
				/>
				<div className='resident-logs-container'>
					<div className='resident-logs-header'>
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
						<LogsCard
							logsDate='December 25, 2025'
							logsTime='08:08 PM'
							logsStatus='Monitoring'
							logsAddress='123 Chicken Curry St., Brgy. UP Diliman, Quezon City, PH, 1101'
						/>
						<LogsCard
							logsDate='December 25, 2025'
							logsTime='08:08 PM'
							logsStatus='Monitoring'
							logsAddress='123 Chicken Curry St., Brgy. UP Diliman, Quezon City, PH, 1101'
						/>
						<LogsCard
							logsDate='December 25, 2025'
							logsTime='08:08 PM'
							logsStatus='Monitoring'
							logsAddress='123 Chicken Curry St., Brgy. UP Diliman, Quezon City, PH, 1101'
						/>
						<LogsCard
							logsDate='December 25, 2025'
							logsTime='08:08 PM'
							logsStatus='Monitoring'
							logsAddress='123 Chicken Curry St., Brgy. UP Diliman, Quezon City, PH, 1101'
						/>
					</div>
				</div>
				{/* Navigation Bar */}
				<AlalayNavigation role='resident' />
			</ProtectedRoute>
		</>
	);
}
