import '../../resident-styles/resident-map.css';
import ResidentHeader from '../../resident-components/resident-header';
import ResidentNavigation from '../../resident-components/resident-navigation';

export default function ResidentLogs() {
	return (
		<>
			<div className='resident-logs-container'>
				{/* Header for the Logs */}
				<ResidentHeader
					title='Personal Logs'
					subtitle="Here's your logs overview"
					date='December 25, 2025'
					time='10:30 AM'
					image='/images/header-icon.jpg'
				/>
				{/* Placeholder for now */}
				<div className='logs'>This is the logs</div>
				{/* Navigation Bar */}
				<ResidentNavigation />
			</div>
		</>
	);
}
