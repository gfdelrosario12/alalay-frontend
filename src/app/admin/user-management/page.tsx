'use client';
import { useState } from 'react';
import UserFormModal, { UserFormData } from '../components/user-form-modal';
import UserTable from '../components/user-table';
import UserConfirmationDeleteModal from '../components/user-confirmation-delete-modal';
import ProtectedRoute from '@/app/universal-components/protected-route';

type User = UserFormData & { id: number; createdAt: string };

const tabs = ['residents', 'rescuer', 'admin'] as const;

export default function UsersPage() {
	const [activeTab, setActiveTab] = useState<(typeof tabs)[number] | 'all'>(
		'all'
	);
	const [showModal, setShowModal] = useState(false);
	const [mode, setMode] = useState<'add' | 'edit'>('add');
	const [editingUser, setEditingUser] = useState<User | null>(null);

	const [deleteUser, setDeleteUser] = useState<User | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [users, setUsers] = useState<User[]>([
		{
			id: 1,
			email: 'juan@mail.com',
			firstName: 'Juan',
			middleName: 'D.',
			lastName: 'Santos',
			permanentAddress: 'QC',
			age: 30,
			birthdate: '1995-01-01',
			emergencyContact: '09171234567',
			role: 'resident',
			createdAt: '2025-11-26',
		},
		{
			id: 2,
			email: 'mark@mail.com',
			firstName: 'Mark',
			middleName: 'L.',
			lastName: 'Reyes',
			permanentAddress: 'Manila',
			age: 28,
			birthdate: '1997-03-15',
			emergencyContact: '09179876543',
			role: 'rescuer',
			createdAt: '2025-11-26',
		},
		{
			id: 3,
			email: 'admin@mail.com',
			firstName: 'Admin',
			middleName: 'A.',
			lastName: 'One',
			permanentAddress: 'Cebu',
			age: 35,
			birthdate: '1990-06-20',
			emergencyContact: '09170001111',
			role: 'admin',
			createdAt: '2025-11-26',
		},
	]);

	// Filtered users
	const displayedUsers =
		activeTab === 'all'
			? users
			: users.filter(
					(user) =>
						user.role === (activeTab === 'residents' ? 'resident' : activeTab)
			  );

	// Add User
	const handleAddClick = () => {
		setMode('add');
		setEditingUser(null);
		setShowModal(true);
	};

	// Edit User
	const handleEditClick = (user: User) => {
		setMode('edit');
		setEditingUser(user);
		setShowModal(true);
	};

	// Delete User (open confirmation)
	const handleDeleteClick = (user: User) => {
		setDeleteUser(user);
		setShowDeleteModal(true);
	};

	// Confirm Delete
	const confirmDelete = () => {
		if (deleteUser) {
			setUsers(users.filter((u) => u.id !== deleteUser.id));
			setDeleteUser(null);
			setShowDeleteModal(false);
		}
	};

	// Cancel Delete
	const cancelDelete = () => {
		setDeleteUser(null);
		setShowDeleteModal(false);
	};

	// Submit from modal
	const handleSubmit = (data: UserFormData) => {
		if (mode === 'add') {
			const newUser: User = {
				...data,
				id: Date.now(),
				createdAt: new Date().toISOString(),
			};
			setUsers([...users, newUser]);
		} else if (mode === 'edit' && editingUser) {
			setUsers(
				users.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u))
			);
		}
		setShowModal(false);
	};

	return (
		<ProtectedRoute roles={['ADMIN']}>
			<div className='p-4 md:p-6 lg:p-3'>
				<h1 className='text-2xl font-bold mb-6'>User Management</h1>

				{/* Tabs */}
				<div className='flex flex-col sm:flex-row gap-3 mb-6'>
					<button
						onClick={() => setActiveTab('all')}
						className={`px-4 py-2 rounded-lg font-medium w-full sm:w-auto ${
							activeTab === 'all'
								? 'bg-red-600 text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}>
						All Users
					</button>

					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`px-4 py-2 rounded-lg font-medium w-full sm:w-auto ${
								activeTab === tab
									? 'bg-red-600 text-white'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</button>
					))}
				</div>

				{/* Add User button */}
				<div className='flex justify-end mb-4'>
					<button
						onClick={handleAddClick}
						className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
						Add User
					</button>
				</div>

				<UserTable
					users={displayedUsers}
					onEdit={handleEditClick}
					onDelete={handleDeleteClick}
				/>

				{showModal && (
					<UserFormModal
						mode={mode}
						initialData={editingUser ?? undefined}
						onSubmit={handleSubmit}
						onDelete={
							mode === 'edit'
								? () => handleDeleteClick(editingUser!)
								: undefined
						}
						onCancel={() => setShowModal(false)}
					/>
				)}

				{/* Delete Confirmation Modal */}
				{showDeleteModal && deleteUser && (
					<UserConfirmationDeleteModal
						message={`Are you sure you want to delete ${deleteUser.firstName} ${deleteUser.lastName}?`}
						onConfirm={confirmDelete}
						onCancel={cancelDelete}
					/>
				)}
			</div>
		</ProtectedRoute>
	);
}
