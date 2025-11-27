'use client';
import { useEffect, useState } from 'react';
import IncidentTable from '../components/incident-table';
import IncidentFormModal from '../components/incident-form-modal';
import ProtectedRoute from '@/app/universal-components/protected-route';

const GRAPHQL_ENDPOINT =
	process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export type Incident = {
	id: string;
	calamity?: { id: string };
	rescuer?: { id: string };
	latitude?: number;
	longitude?: number;
	description?: string;
	otherAffectedMembers?: string;
	otherImportantDetails?: string;
	detectedDatetime?: string;
};

export type IncidentFormData = {
	calamityId: string;
	rescuerId?: string;
	latitude?: number;
	longitude?: number;
	description?: string;
	otherAffectedMembers?: string;
	otherImportantDetails?: string;
};

export default function IncidentsPage() {
	const [incidents, setIncidents] = useState<Incident[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchIncidents = async () => {
			const query = `query { getIncidents { id calamity { id } rescuer { id } latitude longitude description otherAffectedMembers otherImportantDetails detectedDatetime } }`;
			const res = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query }),
			});
			const data = await res.json();
			setIncidents(data.data?.getIncidents || []);
			setLoading(false);
		};
		fetchIncidents();
	}, []);

	const handleAddClick = () => setShowModal(true);

	const handleSubmit = async (data: IncidentFormData) => {
		const mutation = `mutation CreateIncident($input: CreateIncidentInput!) { createIncident(input: $input) { id } }`;
		const variables = { input: data };
		await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: mutation, variables }),
		});
		// Refetch from backend for dynamic data
		const query = `query { getIncidents { id calamity { id } rescuer { id } latitude longitude description otherAffectedMembers otherImportantDetails detectedDatetime } }`;
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query }),
		});
		const result = await res.json();
		setIncidents(result.data?.getIncidents || []);
		setShowModal(false);
	};

	if (loading) return <div>Loading incidents...</div>;

	return (
		<ProtectedRoute roles={['ADMIN']}>
			<div className='p-4 md:p-6 lg:p-3'>
				<h1 className='text-2xl font-bold mb-6'>Incident Management</h1>

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
