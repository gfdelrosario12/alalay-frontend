'use client';
import { useState } from 'react';
import '../universal-styles/delete-modal.css';

type DeleteModalProps = {
	title: string;
	description: string;
	onConfirm: () => void;
	triggerText?: string;
};

export default function DeleteModal({
	title,
	description,
	onConfirm,
	triggerText = 'Delete',
}: DeleteModalProps) {
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowDeleteConfirm(true);
	};

	const confirmDelete = () => {
		onConfirm();
		setShowDeleteConfirm(false);
	};

	const cancelDelete = () => {
		setShowDeleteConfirm(false);
	};

	return (
		<>
			<button
				onClick={handleDeleteClick}
				className='delete-trigger-btn'>
				{triggerText}
			</button>

			{showDeleteConfirm && (
				<div className='delete-modal'>
					<div className='delete-modal-overlay'>
						<h2>{title}</h2>
						<p>{description}</p>
						<div className='delete-modal-buttons'>
							<button
								onClick={confirmDelete}
								className='confirm-btn'>
								Yes, Delete
							</button>
							<button
								onClick={cancelDelete}
								className='cancel-btn'>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
