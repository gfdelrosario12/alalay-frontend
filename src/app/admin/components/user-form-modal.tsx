'use client';
import { useState } from 'react';

type UserData = {
	name: string;
	email: string;
	address: string;
	phone: string;
	password: string;
};

type UserFormProps = {
	onSubmit: (data: UserData) => void;
	initialData?: UserData;
	onCancel: () => void;
	role: 'resident' | 'rescuer';
};

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
	return (
		<div
			className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ${
				isOpen
					? 'opacity-100 pointer-events-auto'
					: 'opacity-0 pointer-events-none'
			}`}>
			{/* Overlay */}
			<div
				className='absolute inset-0 bg-black bg-opacity-50'
				onClick={onClose}></div>

			{/* Modal Content */}
			<div
				className={`bg-white rounded-xl p-6 shadow-lg w-full max-w-lg transform transition-transform duration-300 ${
					isOpen ? 'translate-y-0 scale-100' : '-translate-y-10 scale-95'
				} relative`}>
				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold'>
					✕
				</button>
				{children}
			</div>
		</div>
	);
}

export default function UserFormModal({
	onSubmit,
	initialData,
	onCancel,
	role,
}: UserFormProps) {
	// Initialize formData directly from initialData to avoid useEffect
	const [formData, setFormData] = useState<UserData>(
		initialData ?? { name: '', email: '', address: '', phone: '', password: '' }
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<Modal
			isOpen={true}
			onClose={onCancel}>
			<h2 className='text-xl font-semibold mb-4'>
				{initialData
					? `Edit ${role === 'resident' ? 'Resident' : 'Rescuer'}`
					: `Add New ${role === 'resident' ? 'Resident' : 'Rescuer'}`}
			</h2>

			<form
				onSubmit={handleSubmit}
				className='space-y-4'>
				<input
					type='text'
					name='name'
					value={formData.name}
					onChange={handleChange}
					placeholder='Full Name'
					required
					className='w-full p-2 border rounded-lg'
				/>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					placeholder='Email'
					required
					className='w-full p-2 border rounded-lg'
				/>
				<input
					type='text'
					name='address'
					value={formData.address}
					onChange={handleChange}
					placeholder='Address'
					required
					className='w-full p-2 border rounded-lg'
				/>
				<input
					type='tel'
					name='phone'
					value={formData.phone}
					onChange={handleChange}
					placeholder='Phone Number'
					required
					className='w-full p-2 border rounded-lg'
				/>
				<input
					type='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
					placeholder='Password'
					required
					className='w-full p-2 border rounded-lg'
				/>

				<div className='flex justify-end gap-3 mt-4'>
					<button
						type='button'
						onClick={onCancel}
						className='px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'>
						Cancel
					</button>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
						{initialData ? 'Update' : 'Add'}
					</button>
				</div>
			</form>
		</Modal>
	);
}
