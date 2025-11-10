import { useState } from 'react';
import '../../rescuer-styles/maps/rescuer-map-status.css';
import RescuerMapConfirmStatus from '../maps/rescuer-map-confirm-status';

type ResidentHeaderProps = {
	myCurrentStatus?: string;
	myCurrentDescription?: string;
};

export default function RescuerMapStatus({
	myCurrentStatus = 'Awaiting Status',
	myCurrentDescription = 'What will you do today?',
}: ResidentHeaderProps) {
	const [status, setStatus] = useState(myCurrentStatus);
	const [description, setDescription] = useState(myCurrentDescription);
	const [showModal, setShowModal] = useState(false);
	const [selectedType, setSelectedType] = useState<'rescuing' | 'idle' | null>(
		null
	);
	const [statusType, setStatusType] = useState<
		'awaiting' | 'rescuing' | 'idle'
	>('awaiting');

	const handleMarkRescuing = () => {
		// Open confirmation modal
		setSelectedType('rescuing');
		setShowModal(true);
	};

	const handleIdle = () => {
		// Open confirmation modal
		setSelectedType('idle');
		setShowModal(true);
	};

	// Confirmation of Modal Form

	const handleConfirm = () => {
		if (selectedType === 'rescuing') {
			setStatus('You are currently on field');
			setDescription('You are currently on active rescuing. Keep safe!');
			setStatusType('rescuing');
		} else if (selectedType === 'idle') {
			setStatus('You are currently waiting for rescue mission');
			setDescription('Waiting for residents needing help.');
			setStatusType('idle');
		}
		setShowModal(false);
	};

	// Cancellation of Modal Confirmation
	const handleCancel = () => {
		setShowModal(false);
		setSelectedType(null);
	};

	// Determine color based on current status
	let statusColor = 'status-awaiting';
	if (statusType === 'rescuing') statusColor = 'status-rescuing';
	else if (statusType === 'idle') statusColor = 'status-idle';

	return (
		<div className='resident-map-status'>
			<div className='status-header'>
				<div className='status-title'>
					<h2 className={statusColor}>{status}</h2>
				</div>
				<div className='status-description'>{description}</div>
			</div>
			<div className='status-buttons'>
				<button
					className='mark-rescuing'
					onClick={handleMarkRescuing}>
					I`m going on field
				</button>
				<button
					className='mark-idle'
					onClick={handleIdle}>
					I`m monitoring
				</button>
			</div>
			{showModal && selectedType && (
				<RescuerMapConfirmStatus
					type={selectedType}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}
		</div>
	);
}
