'use client';
import { useState } from 'react';
import UserFormModal, {
	UserFormData,
	ResidentData,
} from '../components/user-form-modal';

type Resident = {
	id: number;
	name: string;
	email: string;
	address: string;
	phone: string;
	password: string;
};

export default function ResidentsTable() {
	const [residents, setResidents] = useState<Resident[]>([
		{
			id: 1,
			name: 'Maria Dela Cruz',
			email: 'maria@email.com',
			address: '123 Main St',
			phone: '09123456789',
			password: '******',
		},
	]);

	const [showForm, setShowForm] = useState(false);
	const [editingUser, setEditingUser] = useState<Resident | null>(null);

	const handleAdd = () => {
		setEditingUser(null);
		setShowForm(true);
	};

	const handleEdit = (user: Resident) => {
		setEditingUser(user);
		setShowForm(true);
	};

	const handleDelete = (id: number) => {
		setResidents((prev) => prev.filter((r) => r.id !== id));
	};

	// FIX: Use UserFormData (not ResidentFormData)
	const handleSubmit = (data: UserFormData) => {
		const residentData = data as ResidentData;

		if (editingUser) {
			setResidents((prev) =>
				prev.map((r) =>
					r.id === editingUser.id ? { ...r, ...residentData } : r
				)
			);
		} else {
			setResidents((prev) => [...prev, { id: Date.now(), ...residentData }]);
		}

		setShowForm(false);
		setEditingUser(null);
	};

	return (
		<div>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold'>Residents</h2>
				<button
					onClick={handleAdd}
					className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
					Add Resident
				</button>
			</div>

			<table className='w-full border-collapse'>
				<thead className='bg-gray-100'>
					<tr>
						<th className='p-3 text-left'>Name</th>
						<th className='p-3 text-left'>Email</th>
						<th className='p-3 text-left'>Address</th>
						<th className='p-3 text-left'>Phone</th>
						<th className='p-3 text-left'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{residents.map((r) => (
						<tr
							key={r.id}
							className='border-b'>
							<td className='p-3'>{r.name}</td>
							<td className='p-3'>{r.email}</td>
							<td className='p-3'>{r.address}</td>
							<td className='p-3'>{r.phone}</td>
							<td className='p-3 flex gap-2'>
								<button
									onClick={() => handleEdit(r)}
									className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
									Edit
								</button>
								<button
									onClick={() => handleDelete(r.id)}
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
					role='resident'
					onSubmit={handleSubmit}
					initialData={editingUser ?? undefined}
					onCancel={() => setShowForm(false)}
				/>
			)}
		</div>
	);
}
