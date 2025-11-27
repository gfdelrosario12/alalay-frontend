'use client';
import { useEffect, useState } from 'react';
import UserFormModal from '../components/user-form-modal';
import UserTable from '../components/user-table';
import UserConfirmationDeleteModal from '../components/user-confirmation-delete-modal';
import ProtectedRoute from '@/app/universal-components/protected-route';

// Unified User type matching backend
export type User = {
	id: string;
	email: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	permanentAddress?: string;
	age?: number;
	birthDate?: string;
	emergencyContactName?: string;
	emergencyContactDetails?: string;
	phoneNumber?: string;
	role: 'RESIDENT' | 'RESCUER' | 'ADMIN';
	createdAt?: string;
};

export type UserFormData = Omit<User, 'id' | 'createdAt'>;

const tabs = ['RESIDENT', 'RESCUER', 'ADMIN'] as const;
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function UsersPage() {
	const [activeTab, setActiveTab] = useState<(typeof tabs)[number] | 'all'>('all');
	const [showModal, setShowModal] = useState(false);
	const [mode, setMode] = useState<'add' | 'edit'>('add');
	const [editingUser, setEditingUser] = useState<User | null>(null);

	const [deleteUser, setDeleteUser] = useState<User | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			const query = `query { getUsers { id email firstName middleName lastName permanentAddress age birthDate emergencyContactName emergencyContactDetails phoneNumber role createdAt } }`;
			const res = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query }),
			});
			const data = await res.json();
			setUsers(data.data?.getUsers || []);
			setLoading(false);
		};
		fetchUsers();
	}, []);

	// Filtered users
	const displayedUsers =
		activeTab === 'all'
			? users
			: users.filter((user) => user.role === activeTab);

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

	// Helper to refetch users after mutation
	const refetchUsers = async () => {
		const query = `query { getUsers { id email firstName middleName lastName permanentAddress age birthDate emergencyContactName emergencyContactDetails phoneNumber role createdAt } }`;
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query }),
		});
		const data = await res.json();
		setUsers(data.data?.getUsers || []);
	};

	// Submit from modal
	const handleSubmit = async (data: UserFormData) => {
		if (mode === 'add') {
			const mutation = `mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) { id }\n}`;
			const variables = {
				input: {
					...data,
					age: data.age ? Number(data.age) : null,
				}
			};
			await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: mutation, variables })
			});
			await refetchUsers();
		} else if (mode === 'edit' && editingUser) {
			const mutation = `mutation UpdateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) { id }\n}`;
			const variables = {
				input: {
					id: editingUser.id,
					...data,
					age: data.age ? Number(data.age) : null,
				}
			};
			await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: mutation, variables })
			});
			await refetchUsers();
		}
		setShowModal(false);
	};

	// Confirm Delete
	const confirmDelete = async () => {
		if (deleteUser) {
			const mutation = `mutation DeleteUser($id: ID!) {\n  deleteUser(id: $id)\n}`;
			const variables = { id: deleteUser.id };
			await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: mutation, variables })
			});
			await refetchUsers();
			setDeleteUser(null);
			setShowDeleteModal(false);
		}
	};

	// Cancel Delete
	const cancelDelete = () => {
		setDeleteUser(null);
		setShowDeleteModal(false);
	};

	if (loading) return <div>Loading users...</div>;

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
						className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'>
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
						initialData={editingUser ? {
							email: editingUser.email,
							firstName: editingUser.firstName,
							middleName: editingUser.middleName || '',
							lastName: editingUser.lastName,
							permanentAddress: editingUser.permanentAddress || '',
							age: editingUser.age || 0,
							birthDate: editingUser.birthDate || '',
							emergencyContactName: editingUser.emergencyContactName || '',
							emergencyContactDetails: editingUser.emergencyContactDetails || '',
							phoneNumber: editingUser.phoneNumber || '',
							role: editingUser.role,
						} : undefined}
						onSubmit={handleSubmit}
						onDelete={mode === 'edit' ? () => handleDeleteClick(editingUser!) : undefined}
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
