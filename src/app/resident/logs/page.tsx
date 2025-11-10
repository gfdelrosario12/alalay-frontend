import ResidentHeader from '../../resident-components/resident-header';
import ResidentNavigation from '../../resident-components/resident-navigation';
import LogsCard from '../../resident-components/logs/logs-card';

import '../../resident-styles/logs/resident-logs.css';

import Link from 'next/link';
import Image from 'next/image';

export default function ResidentLogs() {
	return (
		<>
			{/* Header for the Logs */}
			<ResidentHeader
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
			<ResidentNavigation />
		</>
	);
}
