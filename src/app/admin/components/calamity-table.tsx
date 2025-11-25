'use client';
import React from 'react';

type Calamity = {
	id: number;
	startDate: string;
	description: string;
	calamity_category: string;
	reportedEndDate: string;
	affectedAreas: string;
	createdAt: string;
};

type CalamityTableProps = {
	calamities: Calamity[];
};

export default function CalamityTable({ calamities }: CalamityTableProps) {
	const columns = calamities.length > 0 ? Object.keys(calamities[0]) : [];

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
					{calamities.map((calamity, idx) => (
						<tr
							key={calamity.id}
							className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
							{columns.map((col) => (
								<td
									key={col}
									className='px-4 py-2 border-t border-gray-200'>
									{calamity[col as keyof Calamity]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
