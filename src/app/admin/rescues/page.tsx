'use client';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/app/universal-components/protected-route';

const STATUS_OPTIONS = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED'];
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function RescueTasksPage() {
	const [tasks, setTasks] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState('PENDING');

	const fetchTasks = async (selectedStatus: string) => {
		console.log('Fetching rescue tasks for status:', selectedStatus);
		const start = Date.now();
		const query = `query RescueTasks($status: OtherStatus) { rescueTasks(status: $status) { id incidentId rescuerId notes status completionDatetime } }`;
		const variables = { status: selectedStatus };
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query, variables }),
		});
		const data = await res.json();
		setTasks(data.data?.rescueTasks || []);
		setLoading(false);
		console.log('Fetched rescue tasks in', Date.now() - start, 'ms:', data);
	};

	useEffect(() => {
		setLoading(true);
		fetchTasks(status);
	}, [status]);

	if (loading) return <div>Loading rescue tasks...</div>;

	return (
		<ProtectedRoute roles={['ADMIN']}>
			<div className='p-4 md:p-6 lg:p-3'>
				<h1 className='text-2xl font-bold mb-6'>Rescue Tasks Management</h1>
				<div className='mb-4'>
					<label className='mr-2 font-semibold'>Status:</label>
					<select
						value={status}
						onChange={e => setStatus(e.target.value)}
						className='border p-2 rounded'
					>
						{STATUS_OPTIONS.map(opt => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</div>
				<table className='min-w-full bg-white rounded shadow'>
					<thead>
						<tr>
							<th className='px-4 py-2 text-center'>#</th>
							<th className='px-4 py-2 text-center'>Incident ID</th>
							<th className='px-4 py-2 text-center'>Rescuer ID</th>
							<th className='px-4 py-2 text-center'>Notes</th>
							<th className='px-4 py-2 text-center'>Status</th>
							<th className='px-4 py-2 text-center'>Completion Datetime</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((t, idx) => (
							<tr key={t.id} className='hover:bg-gray-50'>
								<td className='px-4 py-2 text-center'>{idx + 1}</td>
								<td className='px-4 py-2 text-center'>{t.incidentId}</td>
								<td className='px-4 py-2 text-center'>{t.rescuerId}</td>
								<td className='px-4 py-2 text-center'>{t.notes || '-'}</td>
								<td className='px-4 py-2 text-center'>{t.status}</td>
								<td className='px-4 py-2 text-center'>{t.completionDatetime ? new Date(t.completionDatetime).toLocaleString() : '-'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</ProtectedRoute>
	);
}
