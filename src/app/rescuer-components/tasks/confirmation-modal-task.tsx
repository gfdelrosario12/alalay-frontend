'use client';

import '../../rescuer-styles/profile/confirmation-modal-task.css';

interface ConfirmationModalProps {
	show: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function ConfirmationTaskModal({
	show,
	title,
	message,
	onConfirm,
	onCancel,
}: ConfirmationModalProps) {
	if (!show) return null;

	return (
		<div className='modal-backdrop'>
			<div className='modal-content'>
				<h3>{title}</h3>
				<p>{message}</p>
				<div className='modal-buttons'>
					<button
						className='modal-confirm-btn'
						onClick={onConfirm}>
						Yes
					</button>
					<button
						className='modal-cancel-btn'
						onClick={onCancel}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
