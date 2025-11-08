'use client';
import { useState } from 'react';

type AddContactModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function AddContactModal({
	isOpen,
	onClose,
}: AddContactModalProps) {
	const [uid, setUid] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Added Contact UID:', uid);
		setUid('');
		onClose();
	};

	if (!isOpen) return null; // ⛔ Prevent rendering if modal is closed

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
			<div className='bg-white w-[90%] max-w-sm rounded-2xl shadow-lg p-6 relative'>
				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl'>
					×
				</button>

				<h3 className='text-lg font-semibold text-gray-900 text-center mb-4'>
					Add Contact by UID
				</h3>

				<form
					onSubmit={handleSubmit}
					className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Enter UID
						</label>
						<input
							type='text'
							value={uid}
							onChange={(e) => setUid(e.target.value)}
							placeholder='e.g., 123456789'
							className='w-full rounded-lg border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]'
							required
						/>
					</div>

					<div className='flex justify-end gap-2 pt-2'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900'>
							Cancel
						</button>
						<button
							type='submit'
							className='px-4 py-2 bg-[var(--color-yellow)] text-white rounded-lg shadow-md hover:bg-opacity-90'>
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
