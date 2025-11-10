'use client';

import '../../rescuer-styles/logs/rescuer-logs-card.css';

type LogsCardProps = {
	residentName: string;
	logsDate: string;
	logsTime: string;
	logsStatus: 'safe' | 'monitoring' | 'not safe';
	logsAddress: string;
};

// Map statuses to CSS class names
const statusClass: Record<string, string> = {
	safe: 'status-safe',
	monitoring: 'status-monitoring',
	'not safe': 'status-not-safe',
};

// Map statuses to border CSS variables
const statusBorder: Record<string, string> = {
	safe: '--color-green',
	monitoring: '--color-yellow',
	'not safe': '--color-red',
};

export default function RescuerLogCard({
	residentName,
	logsDate,
	logsTime,
	logsStatus,
	logsAddress,
}: LogsCardProps) {
	const borderVar = statusBorder[logsStatus] || '--color-gray';

	return (
		<div
			className='logs-card border-l-4'
			style={{ borderColor: `var(${borderVar})` }}>
			<div className='card-top'>
				<div className='log-top'>
					<div className='logs-name'>
						<p>Name:</p>
						<span>{residentName}</span>
					</div>
					<div className='logs-status'>
						<p>Status:</p>
						<span className={statusClass[logsStatus] || ''}>{logsStatus}</span>
					</div>
				</div>
				<div className='log-bottom'>
					<div className='logs-date'>
						<p>Date:</p>
						<span>{logsDate}</span>
					</div>
					<div className='logs-time'>
						<p>Time:</p>
						<span>{logsTime}</span>
					</div>
				</div>
			</div>
			<div className='card-bottom'>
				<div className='logs-address'>
					<p>Address:</p>
					<span>{logsAddress}</span>
				</div>
			</div>
		</div>
	);
}
