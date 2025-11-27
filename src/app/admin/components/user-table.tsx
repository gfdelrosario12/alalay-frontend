'use client';
import React from 'react';
import type { User } from '../user-management/page';

type UserTableProps = {
	users: User[];
	onEdit: (user: User) => void;
	onDelete: (user: User) => void;
};

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
	const columns = [
		'#',
		'email',
		'firstName',
		'middleName',
		'lastName',
		'permanentAddress',
		'age',
		'birthDate',
		'emergencyContactName',
		'emergencyContactDetails',
		'phoneNumber',
		'role',
	];

	return (
		<div className='w-full overflow-x-auto'>
			<table className='min-w-full border border-gray-300 rounded-lg'>
				<thead className='bg-gray-100'>
					<tr>
						{columns.map((col) => (
							<th
								key={col}
								className={`px-2 py-2 font-semibold capitalize border-b border-gray-300 whitespace-normal break-words ${col === 'email' ? 'text-left' : 'text-center'}`}
							>
								{col === '#' ? '#' : col.replace(/([A-Z])/g, ' $1')}
							</th>
						))}
						<th className='px-2 py-2 text-center font-semibold border-b border-gray-300 whitespace-normal break-words'>
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
									className={`px-2 py-2 border-t border-gray-200 whitespace-normal break-words ${col === 'email' ? 'text-left' : 'text-center'}`}
								>
									{col === '#' ? idx + 1 :
									 col === 'birthDate' && user.birthDate ?
									   new Date(user.birthDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) :
									 user[col as keyof typeof user]}
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
