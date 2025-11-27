"use client";

import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import LogsCard from '../../resident-components/logs/logs-card';
import ProtectedRoute from '@/app/universal-components/protected-route';
import '../../resident-styles/logs/resident-logs.css';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function RescuerLogs() {
	const [logs, setLogs] = useState<any[]>([]);

	useEffect(() => {
		const fetchLogs = async () => {
			const query = `query {\n  getResponseLogs {\n    id\n    message\n    createdAt\n    user { id firstName lastName }\n    calamity { id description }\n    // add more fields as needed\n  }\n}`;
			const res = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query })
			});
			const data = await res.json();
			if (data.data && data.data.getResponseLogs) {
				setLogs(data.data.getResponseLogs);
			}
		};
		fetchLogs();
	}, []);

	return (
		<>
			<ProtectedRoute roles={['RESIDENT']}>
				{' '}
				{/* Header for the Logs */}
				<Header
					title='Personal Logs'
					subtitle="Here's your logs overview"
					date='December 25, 2025'
					time='10:30 AM'
					image='/images/header-icon.jpg'
				/>
				<div className='resident-logs-container'>
					<div className='resident-logs-header'>
						<p>All Status Logs</p>
						<Link
							href=''
							className='filter'>
							<p>Filter</p>
							<Image
								src='/images/universal-icons/filter.png'
								alt='filter.png'
								width={20}
								height={20}
							/>
						</Link>
					</div>
					{/* Placeholder for now */}
					<div className='logs'>
						{/* Render logs dynamically */}
						{logs.map(log => (
							<div key={log.id} className='log-card'>
								<p><b>User:</b> {log.user ? `${log.user.firstName} ${log.user.lastName}` : 'Unknown'}</p>
								<p><b>Calamity:</b> {log.calamity ? log.calamity.description : 'N/A'}</p>
								<p><b>Message:</b> {log.message}</p>
								<p><b>Date:</b> {log.createdAt}</p>
							</div>
						))}
					</div>
				</div>
				{/* Navigation Bar */}
				<AlalayNavigation role='resident' />
			</ProtectedRoute>
		</>
	);
}
