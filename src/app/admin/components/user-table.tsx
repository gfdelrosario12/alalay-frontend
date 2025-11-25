'use client';
import React from 'react';

type User = {
	id: number;
	email: string;
	firstName: string;
	middleName: string;
	lastName: string;
	permanentAddress: string;
	age: number;
	birthdate: string;
	emergencyContact: string;
	role: string;
	createdAt: string;
};

type UserTableProps = {
	users: User[];
	onEdit: (user: User) => void;
	onDelete: (user: User) => void;
};

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
	const columns = users.length > 0 ? Object.keys(users[0]) : [];

	return (
		<div className='w-full overflow-x-auto'>
			<table className='min-w-full border border-gray-300 rounded-lg'>
				<thead className='bg-gray-100'>
					<tr>
						{columns.map((col) => (
							<th
								key={col}
								className='px-4 py-2 text-left font-semibold capitalize border-b border-gray-300'>
								{col.replace(/([A-Z])/g, ' $1')}
							</th>
						))}
						<th className='px-4 py-2 text-left font-semibold border-b border-gray-300'>
							Actions
						</th>
					</tr>
				</thead>

				<tbody>
					{users.map((user, idx) => (
						<tr
							key={user.id}
							className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
							{columns.map((col) => (
								<td
									key={col}
									className='px-4 py-2 border-t border-gray-200'>
									{user[col as keyof User]}
								</td>
							))}
							<td className='px-4 py-2 border-t border-gray-200 flex gap-2'>
								<button
									onClick={() => onEdit(user)}
									className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600'>
									Edit
								</button>
								<button
									onClick={() => onDelete(user)}
									className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
