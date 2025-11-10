'use client';
import AdminNavigation from './admin-navigation';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex bg-gray-100 h-screen'>
			{/* Sidebar */}
			<AdminNavigation />

			{/* Main content */}
			<main className='flex-1 p-6 overflow-y-auto min-h-screen'>
				{children}
			</main>
		</div>
	);
}
