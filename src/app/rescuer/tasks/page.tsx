'use client';

import '../../rescuer-styles/people/rescuer-people.css';
import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/app/universal-components/protected-route';

const STATUS_OPTIONS = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED'];
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

function getRescuerId() {
	if (typeof window !== 'undefined') {
		const userStr = localStorage.getItem('alalay_user');
		if (userStr) {
			try {
				const user = JSON.parse(userStr);
				return user.id;
			} catch {}
		}
	}
	return null;
}

export default function RescuerTasks() {
	const [tasks, setTasks] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState('PENDING');
	const rescuerId = getRescuerId();

	const fetchTasks = async (selectedStatus: string) => {
		if (!rescuerId) return;
		const query = `query RescueTasks($status: OtherStatus, $rescuerId: ID) { rescueTasks(status: $status) { id incidentId rescuerId notes status completionDatetime } }`;
		const variables = { status: selectedStatus };
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query, variables }),
		});
		const data = await res.json();
		const allTasks = data.data?.rescueTasks || [];
		const filtered = allTasks.filter((t: any) => t.rescuerId === rescuerId);
		setTasks(filtered);
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
		fetchTasks(status);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, rescuerId]);

	if (loading) return <div>Loading your rescue tasks...</div>;

	return (
		<>
			<ProtectedRoute roles={['RESCUER']}>
				{/* Header for the Tasks Page */}
				<Header
					title='Tasks'
					subtitle='Check your assigned tasks'
					date='December 25, 2025'
					time='10:30 AM'
					image='/images/header-icon.jpg'
				/>
				<div className='rescuer-people-container'>
					<div className='rescuer-people-link'>
						<Link
							href=''
							className='refresh'>
							<p>Refresh</p>
							<Image
								src='/images/universal-icons/refresh.png'
								alt='refresh'
								width={20}
								height={20}
							/>
						</Link>
					</div>

					<div className='rescuer-people-cards'>
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
										<td className='px-4 py-2 text-center'>{t.notes || '-'}</td>
										<td className='px-4 py-2 text-center'>{t.status}</td>
										<td className='px-4 py-2 text-center'>{t.completionDatetime ? new Date(t.completionDatetime).toLocaleString() : '-'}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<AlalayNavigation role='rescuer' />
				</div>
			</ProtectedRoute>
		</>
	);
}
