import { useState } from 'react';
import '../../resident-styles/maps/resident-map-status.css';
import ResidentMapConfirmStatus from './resident-map-confirm-status';

type ResidentHeaderProps = {
	myCurrentStatus?: string;
	myCurrentDescription?: string;
};

export default function ResidentMapStatus({
	myCurrentStatus = 'Awaiting Status',
	myCurrentDescription = 'What`s your current situation right now?',
}: ResidentHeaderProps) {
	const [status, setStatus] = useState(myCurrentStatus);
	const [description, setDescription] = useState(myCurrentDescription);
	const [showModal, setShowModal] = useState(false);
	const [selectedType, setSelectedType] = useState<'safe' | 'help' | null>(
		null
	);

	const handleMarkSafe = () => {
		// Open confirmation modal
		setSelectedType('safe');
		setShowModal(true);
	};

	const handleNeedHelp = () => {
		// Open confirmation modal
		setSelectedType('help');
		setShowModal(true);
	};

	// Confirmation of Modal Form

	const handleConfirm = () => {
		if (selectedType === 'safe') {
			setStatus('You are marked as safe');
			setDescription(
				'You are now marked safe. You may check in with your family and friends.'
			);
		} else if (selectedType === 'help') {
			setStatus('You need help');
			setDescription(
				'We are now connecting the authorities with your location. Kindly wait for rescue.'
			);
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
	if (status.toLowerCase().includes('safe')) statusColor = 'status-safe';
	else if (status.toLowerCase().includes('help')) statusColor = 'status-help';

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
					className='mark-safe'
					onClick={handleMarkSafe}>
					Mark as Safe
				</button>
				<button
					className='mark-help'
					onClick={handleNeedHelp}>
					I need help
				</button>
			</div>
			{showModal && selectedType && (
				<ResidentMapConfirmStatus
					type={selectedType}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}
		</div>
	);
}
