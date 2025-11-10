'use client';

import '../../resident-styles/logs/logs-card.css';
import DeleteModal from '@/app/universal-components/delete-modal';

type LogsCardProps = {
	logsDate: string;
	logsTime: string;
	logsStatus: string;
	logsAddress: string;
};

export default function LogsCard({
	logsDate,
	logsTime,
	logsStatus,
	logsAddress,
}: LogsCardProps) {
	// This will be called when user confirms delete for logs
	const handleConfirmDelete = () => {
		console.log(`Log is deleted`);
		// Replace the main logic for deleting the contact
	};

	return (
		<>
			<div className='logs-card'>
				<div className='card-top'>
					<div className='logs-date'>
						<p>Date:</p>
						<span>{logsDate}</span>
					</div>
					<div className='logs-time'>
						<p>Time:</p>
						<span>{logsTime}</span>
					</div>
					<div className='logs-status'>
						<p>Status:</p>
						<span>{logsStatus}</span>
					</div>
				</div>
				<div className='card-bottom'>
					<div className='logs-address'>
						<p>Address:</p>
						<span>{logsAddress}</span>
					</div>
					<div className='logs-button'>
						<button className='delete-button'>
							<DeleteModal
								title='Delete Log'
								description='Are you sure you want to delete this log? This action cannot be undone.'
								onConfirm={handleConfirmDelete}
								triggerText='Delete'
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
