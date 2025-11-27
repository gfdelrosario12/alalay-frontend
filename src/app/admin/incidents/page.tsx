'use client';
import { useState } from 'react';
import IncidentTable from '../components/incident-table';
import IncidentFormModal, {
	IncidentFormData,
} from '../components/incident-form-modal';
import { Incident } from '../components/incident-form-modal';
import ProtectedRoute from '@/app/universal-components/protected-route';

export default function IncidentsPage() {
	const [incidents, setIncidents] = useState<Incident[]>([
		{
			id: 1,
			calamityId: 1,
			reporterUserId: 101,
			detectedDateTime: '2025-11-26T08:30',
			description: 'Flood water reached 2 meters in downtown area.',
			location: 'Downtown City Center',
			isRescueAssigned: true,
			otherAffectedMembers: '5 families evacuated',
			otherImportantDetails: 'Main bridge submerged, traffic halted',
		},
		{
			id: 2,
			calamityId: 2,
			reporterUserId: 102,
			detectedDateTime: '2025-11-25T15:45',
			description: 'Minor earthquake caused wall cracks in multiple homes.',
			location: 'Hilltop Suburb',
			isRescueAssigned: false,
			otherAffectedMembers: '2 families reported minor injuries',
			otherImportantDetails: 'No structural collapse, monitoring ongoing',
		},
		{
			id: 3,
			calamityId: 1,
			reporterUserId: 103,
			detectedDateTime: '2025-11-26T10:15',
			description: 'Flood affected power lines, causing outages.',
			location: 'Riverside District',
			isRescueAssigned: true,
			otherAffectedMembers: '3 households without electricity',
			otherImportantDetails: 'Emergency generator deployed',
		},
	]);
	const [showModal, setShowModal] = useState(false);

	const handleAddClick = () => setShowModal(true);

	const handleSubmit = (data: IncidentFormData) => {
		const newIncident: Incident = {
			...data,
			id: incidents.length > 0 ? incidents[incidents.length - 1].id + 1 : 1,
			detectedDateTime: data.detectedDateTime,
		};
		setIncidents([...incidents, newIncident]);
		setShowModal(false);
	};

	return (
		<ProtectedRoute roles={['ADMIN']}>
			<div className='p-4 md:p-6 lg:p-3'>
				<h1 className='text-2xl font-bold mb-6'>Incident Management</h1>

				<div className='flex justify-end mb-4'>
					<button
						onClick={handleAddClick}
						className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
						Add Incident
					</button>
				</div>

				<IncidentTable incidents={incidents} />

				{showModal && (
					<IncidentFormModal
						onSubmit={handleSubmit}
						onCancel={() => setShowModal(false)}
					/>
				)}
			</div>
		</ProtectedRoute>
	);
}
