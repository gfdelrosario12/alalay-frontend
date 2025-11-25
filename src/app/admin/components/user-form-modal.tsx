'use client';
import { useState } from 'react';

type Role = 'resident' | 'rescuer' | 'admin';

export type ResidentData = {
	name: string;
	email: string;
	phone: string;
	password: string;
	address: string;
};

export type RescuerData = {
	name: string;
	email: string;
	phone: string;
	password: string;
	assignedArea: string;
	shift: string;
};

export type AdminData = {
	name: string;
	email: string;
	phone: string;
	password: string;
	roleLevel: string;
	permissions: string[];
};

export type UserFormData = ResidentData | RescuerData | AdminData;

type UserFormProps = {
	onSubmit: (data: UserFormData) => void;
	initialData?: UserFormData;
	onCancel: () => void;
	role: Role;
};

function Modal({
	isOpen,
	onClose,
	children,
}: {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}) {
	if (!isOpen) return null;
	return (
		<div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50'>
			<div className='bg-white p-6 rounded-xl relative max-w-lg w-full'>
				<button
					onClick={onClose}
					className='absolute top-3 right-3 text-gray-600 font-bold'>
					✕
				</button>
				{children}
			</div>
		</div>
	);
}

function getFieldValue(data: UserFormData, field: string): string {
	const typed = data as Record<string, unknown>;
	return typeof typed[field] === 'string' ? (typed[field] as string) : '';
}

export default function UserFormModal({
	onSubmit,
	initialData,
	onCancel,
	role,
}: UserFormProps) {
	// ---------- Role-based fields ----------
	const roleFields: Record<Role, string[]> = {
		resident: ['name', 'email', 'phone', 'password', 'address'],
		rescuer: ['name', 'email', 'phone', 'password', 'assignedArea', 'shift'],
		admin: ['name', 'email', 'phone', 'password', 'roleLevel', 'permissions'],
	};

	// ---------- Generate default data ----------
	const defaultData: UserFormData = initialData
		? initialData
		: (Object.fromEntries(
				roleFields[role].map((field) => [
					field,
					field === 'permissions' ? [] : '',
				])
		  ) as UserFormData);

	const [formData, setFormData] = useState<UserFormData>(defaultData);

	// ---------- Handlers ----------
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value } as UserFormData));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (role !== 'admin') return;

		const { value, checked } = e.target;
		const prevAdmin = formData as AdminData;

		const updatedPermissions = checked
			? [...prevAdmin.permissions, value]
			: prevAdmin.permissions.filter((p) => p !== value);

		setFormData({
			...prevAdmin,
			permissions: updatedPermissions,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	// ---------- Render ----------
	return (
		<Modal
			isOpen={true}
			onClose={onCancel}>
			<h2 className='text-xl font-bold mb-4 capitalize'>
				{initialData ? `Edit ${role}` : `Add New ${role}`}
			</h2>

			<form
				onSubmit={handleSubmit}
				className='space-y-3'>
				{roleFields[role].map((field) => {
					// Special case: Admin permissions checkboxes
					if (role === 'admin' && field === 'permissions') {
						return (
							<div key='permissions'>
								<label className='font-medium block mb-1'>Permissions</label>

								{['manage_users', 'view_logs', 'edit_settings'].map((perm) => (
									<label
										key={perm}
										className='inline-flex items-center mr-4'>
										<input
											type='checkbox'
											value={perm}
											checked={(formData as AdminData).permissions.includes(
												perm
											)}
											onChange={handleCheckboxChange}
										/>
										<span className='ml-1'>{perm}</span>
									</label>
								))}
							</div>
						);
					}

					// Normal input fields
					return (
						<input
							key={field}
							name={field}
							type={field === 'password' ? 'password' : 'text'}
							value={getFieldValue(formData, field)}
							onChange={handleChange}
							placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
							required
							className='w-full p-2 border rounded-lg'
						/>
					);
				})}

				<div className='flex justify-end gap-3 mt-4'>
					<button
						type='button'
						onClick={onCancel}
						className='px-4 py-2 bg-gray-200 rounded-lg'>
						Cancel
					</button>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-600 text-white rounded-lg'>
						{initialData ? 'Update' : 'Add'}
					</button>
				</div>
			</form>
		</Modal>
	);
}
