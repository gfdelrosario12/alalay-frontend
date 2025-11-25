'use client';

export default function DashboardPage() {
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
					<h2 className='text-lg font-medium'>Admins Total</h2>
					<p className='text-3xl font-bold mt-2 text-red-600'>12</p>
				</div>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
				<div className='bg-white p-5 rounded-xl shadow'>
					<h2 className='text-lg font-medium'>Calamity Monitored</h2>
					<p className='text-3xl font-bold mt-2 text-red-600'>11</p>
				</div>
				<div className='bg-white p-5 rounded-xl shadow'>
					<h2 className='text-lg font-medium'>Incident Report</h2>
					<p className='text-3xl font-bold mt-2 text-red-600'>23</p>
				</div>
				<div className='bg-white p-5 rounded-xl shadow'>
					<h2 className='text-lg font-medium'>Rescue Report</h2>
					<p className='text-3xl font-bold mt-2 text-red-600'>23</p>
				</div>
			</div>
		</div>
	);
}
