'use client';
import React from 'react';
import { RescueTask } from './rescues-form-modal';

type RescueTaskTableProps = {
	tasks: RescueTask[];
};

export default function RescueTaskTable({ tasks }: RescueTaskTableProps) {
	const columns = tasks.length > 0 ? Object.keys(tasks[0]) : [];

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
					</tr>
				</thead>
				<tbody>
					{tasks.map((task, idx) => (
						<tr
							key={task.id}
							className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
							{columns.map((col) => (
								<td
									key={col}
									className='px-4 py-2 border-t border-gray-200'>
									{task[col as keyof RescueTask]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
