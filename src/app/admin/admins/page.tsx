'use client';
import { useState } from 'react';
import UserFormModal, {
	UserFormData,
	AdminData,
} from '../components/user-form-modal';

type Admin = {
	id: number;
	name: string;
	email: string;
	phone: string;
	roleLevel: string;
	permissions: string[];
	password: string;
};

export default function AdminsTable() {
	const [admins, setAdmins] = useState<Admin[]>([
		{
			id: 1,
			name: 'Ana Santos',
			email: 'ana@email.com',
			phone: '09123456789',
			roleLevel: 'Super Admin',
			permissions: ['manage_users', 'view_logs'],
			password: '******',
		},
	]);

	const [showForm, setShowForm] = useState(false);
	const [editingUser, setEditingUser] = useState<Admin | null>(null);

	const handleAdd = () => {
		setEditingUser(null);
		setShowForm(true);
	};

	const handleEdit = (user: Admin) => {
		setEditingUser(user);
		setShowForm(true);
	};

	const handleDelete = (id: number) => {
		setAdmins((prev) => prev.filter((a) => a.id !== id));
	};

	// Proper type narrowing for admin modal
	const handleSubmit = (data: UserFormData) => {
		const adminData = data as AdminData;

		if (editingUser) {
			setAdmins((prev) =>
				prev.map((a) => (a.id === editingUser.id ? { ...a, ...adminData } : a))
			);
		} else {
			setAdmins((prev) => [...prev, { id: Date.now(), ...adminData }]);
		}

		setShowForm(false);
		setEditingUser(null);
	};

	return (
		<div>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold'>Admins</h2>
				<button
					onClick={handleAdd}
					className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
					Add Admin
				</button>
			</div>

			<table className='w-full border-collapse'>
				<thead className='bg-gray-100'>
					<tr>
						<th className='p-3 text-left'>Name</th>
						<th className='p-3 text-left'>Email</th>
						<th className='p-3 text-left'>Phone</th>
						<th className='p-3 text-left'>Role Level</th>
						<th className='p-3 text-left'>Permissions</th>
						<th className='p-3 text-left'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{admins.map((a) => (
						<tr
							key={a.id}
							className='border-b'>
							<td className='p-3'>{a.name}</td>
							<td className='p-3'>{a.email}</td>
							<td className='p-3'>{a.phone}</td>
							<td className='p-3'>{a.roleLevel}</td>
							<td className='p-3'>{a.permissions.join(', ')}</td>
							<td className='p-3 flex gap-2'>
								<button
									onClick={() => handleEdit(a)}
									className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
									Edit
								</button>
								<button
									onClick={() => handleDelete(a.id)}
									className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{showForm && (
				<UserFormModal
					role='admin'
					onSubmit={handleSubmit}
					initialData={editingUser ?? undefined}
					onCancel={() => setShowForm(false)}
				/>
			)}
		</div>
	);
}
