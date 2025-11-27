'use client';

import ProtectedRoute from '@/app/universal-components/protected-route';
import { getUser } from '@/app/context/auth';
import { useEffect, useState } from 'react';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function DashboardPage() {
	const user = getUser();
	const [counts, setCounts] = useState({ residents: 0, rescuers: 0, admins: 0, calamities: 0, incidents: 0, rescues: 0 });

	useEffect(() => {
		const fetchData = async () => {
			const usersQuery = `query { users { id role } }`;
			const calamitiesQuery = `query { calamities { id } }`;
			const rescueTasksQuery = `query { rescueTasks(status: COMPLETED) { id } }`;
			const [usersRes, calamitiesRes, incidentsRes, rescuesRes] = await Promise.all([
				fetch(GRAPHQL_ENDPOINT, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ query: usersQuery })
				}),
				fetch(GRAPHQL_ENDPOINT, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ query: calamitiesQuery })
				}),
				fetch('/api/incidents'),
				fetch(GRAPHQL_ENDPOINT, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ query: rescueTasksQuery })
				})
			]);
			const usersData = await usersRes.json();
			const calamitiesData = await calamitiesRes.json();
			const incidentsData = await incidentsRes.json();
			const rescuesData = await rescuesRes.json();
			const users = usersData.data?.users || [];
			const calamities = calamitiesData.data?.calamities || [];
			const incidents = Array.isArray(incidentsData) ? incidentsData : [];
			const rescues = rescuesData.data?.rescueTasks || [];
			setCounts({
				residents: users.filter((u: any) => u.role === 'RESIDENT').length,
				rescuers: users.filter((u: any) => u.role === 'RESCUER').length,
				admins: users.filter((u: any) => u.role === 'ADMIN').length,
				calamities: calamities.length,
				incidents: incidents.length,
				rescues: rescues.length,
			});
		};
		fetchData();
	}, []);

	return (
		<ProtectedRoute roles={['ADMIN']}>
			<div className='p-4 md:p-6 lg:p-10'>
				<h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

				{/* Cards */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
					<div className='bg-white p-5 rounded-xl shadow'>
						<h2 className='text-lg font-medium'>Residents Total</h2>
						<p className='text-3xl font-bold mt-2 text-red-600'>{counts.residents}</p>
					</div>
					<div className='bg-white p-5 rounded-xl shadow'>
						<h2 className='text-lg font-medium'>Rescuers Total</h2>
						<p className='text-3xl font-bold mt-2 text-red-600'>{counts.rescuers}</p>
					</div>
					<div className='bg-white p-5 rounded-xl shadow'>
						<h2 className='text-lg font-medium'>Admins Total</h2>
						<p className='text-3xl font-bold mt-2 text-red-600'>{counts.admins}</p>
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
					<div className='bg-white p-5 rounded-xl shadow'>
						<h2 className='text-lg font-medium'>Calamity Monitored</h2>
						<p className='text-3xl font-bold mt-2 text-red-600'>{counts.calamities}</p>
					</div>
					<div className='bg-white p-5 rounded-xl shadow'>
						<h2 className='text-lg font-medium'>Incident Report</h2>
						<p className='text-3xl font-bold mt-2 text-red-600'>{counts.incidents}</p>
					</div>
					<div className='bg-white p-5 rounded-xl shadow'>
						<h2 className='text-lg font-medium'>Rescue Report</h2>
						<p className='text-3xl font-bold mt-2 text-red-600'>{counts.rescues}</p>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}
