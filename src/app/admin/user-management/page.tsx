'use client';
import { useState } from 'react';
import ResidentsTable from '../residents/page';
import RescuersTable from '../rescuers/page';
import AdminsTable from '../admins/page';

const tabs = ['residents', 'rescuers', 'admins'] as const;

export default function UsersPage() {
	const [activeTab, setActiveTab] =
		useState<(typeof tabs)[number]>('residents');

	return (
		<div className='p-4 md:p-6 lg:p-10'>
			<h1 className='text-2xl font-bold mb-6'>User Management</h1>

			{/* Tabs */}
			<div className='flex flex-col sm:flex-row gap-3 mb-6'>
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`px-4 py-2 rounded-lg font-medium w-full sm:w-auto ${
							activeTab === tab
								? 'bg-red-600 text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</button>
				))}
			</div>

			{/* Render Role Components */}
			{activeTab === 'residents' && <ResidentsTable />}
			{activeTab === 'rescuers' && <RescuersTable />}
			{activeTab === 'admins' && <AdminsTable />}
		</div>
	);
}
