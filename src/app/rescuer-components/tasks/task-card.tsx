'use client';

import { useState } from 'react';
import '../../rescuer-styles/profile/task-card.css';
import ConfirmationTaskModal from './confirmation-modal-task';

interface TaskCardProps {
	id: string;
	taskName: string;
	taskLocation: string;
	taskDate: string;
	taskTime: string;
	taskStatus: 'New' | 'In Progress' | 'Completed';
	onStatusChange: (id: string, newStatus: 'In Progress' | 'Completed') => void;
}

export default function TaskCard({
	id,
	taskName,
	taskLocation,
	taskDate,
	taskTime,
	taskStatus,
	onStatusChange,
}: TaskCardProps) {
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState<'Accept' | 'Complete' | null>(
		null
	);

	const statusClass =
		taskStatus === 'New'
			? 'task-status-new'
			: taskStatus === 'In Progress'
			? 'task-status-inprogress'
			: 'task-status-completed';

	const handleActionClick = (type: 'Accept' | 'Complete') => {
		setActionType(type);
		setShowModal(true);
	};

	const handleConfirm = () => {
		if (actionType === 'Accept') onStatusChange(id, 'In Progress');
		if (actionType === 'Complete') onStatusChange(id, 'Completed');
		setShowModal(false);
		setActionType(null);
	};

	const handleCancel = () => {
		setShowModal(false);
		setActionType(null);
	};

	return (
		<div className='task-card'>
			<div className='task-info'>
				<h2>{taskName}</h2>
				<div className='task-actions'>
					{taskStatus === 'New' && (
						<button
							className='task-accept-btn'
							onClick={() => handleActionClick('Accept')}>
							Accept
						</button>
					)}
					{taskStatus === 'In Progress' && (
						<button
							className='task-complete-btn'
							onClick={() => handleActionClick('Complete')}>
							Complete
						</button>
					)}
				</div>
			</div>

			<div className='task-additional'>
				<div className='task-add-info'>
					<div className='task-left'>
						<h2>Location</h2>
						<p>{taskLocation}</p>
					</div>
					<div className='task-right'>
						<h2>Date & Time</h2>
						<p>
							{taskDate} - {taskTime}
						</p>
					</div>
				</div>

				<p className={statusClass}>Status: {taskStatus}</p>
			</div>

			{/* Modal */}
			<ConfirmationTaskModal
				show={showModal}
				title={`Confirm ${actionType}?`}
				message={`Are you sure you want to ${actionType?.toLowerCase()} this task?`}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</div>
	);
}
