'use client';
import { useState } from 'react';
import UserFormModal from '../components/user-form-modal';

type Resident = {
	id: number;
	name: string;
	email: string;
	address: string;
	phone: string;
	password: string;
};

type Log = {
	id: number;
	name: string;
	address: string;
	date: string;
	time: string;
	status: string;
};

type ResidentFormData = Omit<Resident, 'id'>;

export default function ResidentsPage() {
	const [activeTab, setActiveTab] = useState<'registered' | 'logs'>(
		'registered'
	);
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

	const [logs] = useState<Log[]>([
		{
			id: 1,
			name: 'Maria Dela Cruz',
			address: '123 Main St',
			date: '2025-11-10',
			time: '9:30 AM',
			status: 'Safe',
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

	const handleSubmit = (data: ResidentFormData) => {
		if (editingUser) {
			setResidents((prev) =>
				prev.map((r) => (r.id === editingUser.id ? { ...r, ...data } : r))
			);
		} else {
			const newResident: Resident = { id: Date.now(), ...data };
			setResidents((prev) => [...prev, newResident]);
		}
		setShowForm(false);
		setEditingUser(null);
	};

	return (
		<div className='p-4 md:p-6 lg:p-10'>
			<h1 className='text-2xl font-bold mb-6'>Residents</h1>

			{/* Tabs */}
			<div className='flex flex-col sm:flex-row gap-3 mb-6'>
				<button
					onClick={() => setActiveTab('registered')}
					className={`px-4 py-2 rounded-lg font-medium w-full sm:w-auto ${
						activeTab === 'registered'
							? 'bg-red-600 text-white'
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}>
					Registered Accounts
				</button>
				<button
					onClick={() => setActiveTab('logs')}
					className={`px-4 py-2 rounded-lg font-medium w-full sm:w-auto ${
						activeTab === 'logs'
							? 'bg-red-600 text-white'
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
					}`}>
					Logs
				</button>
			</div>

			{/* Registered Table */}
			{activeTab === 'registered' && (
				<div>
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3'>
						<h2 className='text-xl font-semibold'>Registered Residents</h2>
						<button
							onClick={handleAdd}
							className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
							Add Resident
						</button>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full min-w-[500px] bg-white rounded-xl shadow border-collapse'>
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
										<td className='p-3 flex flex-wrap gap-2'>
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
					</div>
				</div>
			)}

			{/* Logs Table */}
			{activeTab === 'logs' && (
				<div className='bg-white p-6 rounded-xl shadow overflow-x-auto'>
					<h2 className='text-xl font-semibold mb-4'>Resident Logs</h2>
					<table className='w-full min-w-[500px] border-collapse'>
						<thead className='bg-gray-100'>
							<tr>
								<th className='p-3 text-left'>Name</th>
								<th className='p-3 text-left'>Address</th>
								<th className='p-3 text-left'>Date</th>
								<th className='p-3 text-left'>Time</th>
								<th className='p-3 text-left'>Status</th>
							</tr>
						</thead>
						<tbody>
							{logs.map((l) => (
								<tr
									key={l.id}
									className='border-b'>
									<td className='p-3'>{l.name}</td>
									<td className='p-3'>{l.address}</td>
									<td className='p-3'>{l.date}</td>
									<td className='p-3'>{l.time}</td>
									<td className='p-3'>{l.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* Modal Form */}
			{showForm && (
				<UserFormModal
					onSubmit={handleSubmit}
					initialData={editingUser ?? undefined}
					onCancel={() => setShowForm(false)}
					role='resident'
				/>
			)}
		</div>
	);
}
