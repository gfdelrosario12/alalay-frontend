'use client';
import React from 'react';
import { Incident } from './incident-form-modal';

type IncidentTableProps = {
	incidents: Incident[];
};

export default function IncidentTable({ incidents }: IncidentTableProps) {
	const columns = incidents.length > 0 ? Object.keys(incidents[0]) : [];

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
					{incidents.map((incident, idx) => (
						<tr
							key={incident.id}
							className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
							{columns.map((col) => {
								let value = incident[col as keyof Incident];
								// Format boolean nicely
								if (col === 'isRescueAssigned') value = value ? 'Yes' : 'No';
								return (
									<td
										key={col}
										className='px-4 py-2 border-t border-gray-200'>
										{value}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
