'use client';

import { useState } from 'react';
import CalamityTable from '../components/calamity-table';
import CalamityFormModal, {
	CalamityFormData,
} from '../components/calamity-form-modal';

import ProtectedRoute from '@/app/universal-components/protected-route';

type Calamity = CalamityFormData & {
	id: number;
	createdAt: string;
};

export default function CalamityPage() {
	const [calamities, setCalamities] = useState<Calamity[]>([
		{
			id: 1,
			startDate: '2025-11-01',
			description: 'Severe flooding in low-lying areas',
			calamity_category: 'Flood',
			reportedEndDate: '2025-11-05',
			affectedAreas: 'Barangay 1, Barangay 2',
			createdAt: '2025-11-01T08:30:00Z',
		},
		{
			id: 2,
			startDate: '2025-10-15',
			description: 'Strong typhoon caused power outages',
			calamity_category: 'Storm',
			reportedEndDate: '2025-10-17',
			affectedAreas: 'Barangay 3, Barangay 4',
			createdAt: '2025-10-15T14:00:00Z',
		},
		{
			id: 3,
			startDate: '2025-09-20',
			description: 'Minor landslides after heavy rain',
			calamity_category: 'Landslide',
			reportedEndDate: '2025-09-21',
			affectedAreas: 'Barangay 5',
			createdAt: '2025-09-20T09:15:00Z',
		},
	]);
	const [showModal, setShowModal] = useState(false);

	// Open the "Add Calamity" modal
	const handleAddClick = () => {
		setShowModal(true);
	};

	// Add new calamity to the table with ID and createdAt
	const handleSubmit = (data: CalamityFormData) => {
		const newCalamity: Calamity = {
			...data,
			id: calamities.length > 0 ? calamities[calamities.length - 1].id + 1 : 1,
			createdAt: new Date().toISOString(),
		};
		setCalamities([...calamities, newCalamity]);
		setShowModal(false);
	};

	return (
		<ProtectedRoute roles={['ADMIN']}>
			<div className='p-4 md:p-6 lg:p-3'>
				<h1 className='text-2xl font-bold mb-6'>Calamity Management</h1>

				{/* Add Calamity button */}
				<div className='flex justify-end mb-4'>
					<button
						onClick={handleAddClick}
						className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
						Add Calamity
					</button>
				</div>

				{/* Calamity Table */}
				<CalamityTable calamities={calamities} />

				{/* Add Calamity Modal */}
				{showModal && (
					<CalamityFormModal
						onSubmit={handleSubmit}
						onCancel={() => setShowModal(false)}
					/>
				)}
			</div>
		</ProtectedRoute>
	);
}
