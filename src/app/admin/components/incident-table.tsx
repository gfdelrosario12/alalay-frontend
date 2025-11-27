'use client';
import React from 'react';
// Use Incident type from incidents/page.tsx
import type { Incident } from '../incidents/page';

type IncidentTableProps = {
	incidents: Incident[];
};

export default function IncidentTable({ incidents }: IncidentTableProps) {
	return (
		<div className='w-full overflow-x-auto'>
			<table className='min-w-full border border-gray-300 rounded-lg'>
				<thead className='bg-gray-100'>
					<tr>
						<th className='px-4 py-2 text-center'>#</th>
						<th className='px-4 py-2 text-center'>Calamity ID</th>
						<th className='px-4 py-2 text-center'>Rescuer ID</th>
						<th className='px-4 py-2 text-center'>Latitude</th>
						<th className='px-4 py-2 text-center'>Longitude</th>
						<th className='px-4 py-2 text-center'>Description</th>
						<th className='px-4 py-2 text-center'>Other Affected</th>
						<th className='px-4 py-2 text-center'>Other Details</th>
						<th className='px-4 py-2 text-center'>Detected Datetime</th>
					</tr>
				</thead>
				<tbody>
					{incidents.map((i, idx) => (
						<tr key={i.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
							<td className='px-4 py-2 text-center'>{idx + 1}</td>
							<td className='px-4 py-2 text-center'>{i.calamity ? i.calamity.id : '-'}</td>
							<td className='px-4 py-2 text-center'>{i.rescuer ? i.rescuer.id : '-'}</td>
							<td className='px-4 py-2 text-center'>{i.latitude ?? '-'}</td>
							<td className='px-4 py-2 text-center'>{i.longitude ?? '-'}</td>
							<td className='px-4 py-2 text-center'>{i.description || '-'}</td>
							<td className='px-4 py-2 text-center'>{i.otherAffectedMembers || '-'}</td>
							<td className='px-4 py-2 text-center'>{i.otherImportantDetails || '-'}</td>
							<td className='px-4 py-2 text-center'>{i.detectedDatetime ? new Date(i.detectedDatetime).toLocaleString() : '-'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
