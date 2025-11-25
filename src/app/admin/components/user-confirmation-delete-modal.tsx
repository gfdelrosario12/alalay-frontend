'use client';
import React from 'react';

type UserConfirmationDeleteModalProps = {
	title?: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
};

export default function UserConfirmationDeleteModal({
	title = 'Confirm',
	message,
	onConfirm,
	onCancel,
}: UserConfirmationDeleteModalProps) {
	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-6 w-96'>
				<h2 className='text-xl font-semibold mb-4'>{title}</h2>
				<p className='mb-6'>{message}</p>
				<div className='flex justify-end gap-2'>
					<button
						onClick={onCancel}
						className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
