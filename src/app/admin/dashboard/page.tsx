'use client';
import { useState } from 'react';

export default function DashboardPage() {
	const [todayLogged, setTodayLogged] = useState([
		{ name: 'John Doe', role: 'Resident', time: '9:15 AM' },
		{ name: 'Jane Cruz', role: 'Rescuer', time: '10:42 AM' },
	]);

	return (
		<div className='p-4 md:p-6 lg:p-10'>
			<h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

			{/* Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
				<div className='bg-white p-5 rounded-xl shadow'>
					<h2 className='text-lg font-medium'>Residents Total</h2>
					<p className='text-3xl font-bold mt-2 text-red-600'>120</p>
				</div>
				<div className='bg-white p-5 rounded-xl shadow'>
					<h2 className='text-lg font-medium'>Rescuers Total</h2>
					<p className='text-3xl font-bold mt-2 text-red-600'>35</p>
				</div>
				<div className='bg-white p-5 rounded-xl shadow'>
					<h2 className='text-lg font-medium'>Logged in Today</h2>
					<p className='text-3xl font-bold mt-2 text-red-600'>
						{todayLogged.length}
					</p>
				</div>
			</div>

			{/* Logged in Today Table */}
			<div className='bg-white p-6 rounded-xl shadow overflow-x-auto'>
				<h2 className='text-xl font-semibold mb-4'>People Logged In Today</h2>
				<table className='w-full min-w-[400px] border-collapse'>
					<thead>
						<tr className='bg-gray-100 text-left'>
							<th className='p-2'>Name</th>
							<th className='p-2'>Role</th>
							<th className='p-2'>Time</th>
						</tr>
					</thead>
					<tbody>
						{todayLogged.map((person, index) => (
							<tr
								key={index}
								className='border-b'>
								<td className='p-2'>{person.name}</td>
								<td className='p-2'>{person.role}</td>
								<td className='p-2'>{person.time}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
