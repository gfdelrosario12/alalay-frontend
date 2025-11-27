'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
	{ name: 'Dashboard', href: '/admin/dashboard' },
	{ name: 'User Management', href: '/admin/user-management' },
	{ name: 'Calamity', href: '/admin/calamity' },
	{ name: 'Incident', href: '/admin/incidents' },
	{ name: 'Rescues', href: '/admin/rescues' },
	{ name: 'Settings', href: '/admin/settings' },
];

export default function AdminNavigation() {
	const pathname = usePathname();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('alalay_user');
		router.push('/login');
	};

	return (
		<>
			{/* Mobile Header */}
			<div className='md:hidden flex items-center justify-between p-4 bg-white shadow-md z-20'>
				<button
					onClick={() => setIsOpen(!isOpen)}
					aria-label='Toggle menu'>
					{isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
				</button>
			</div>

			{/* Sidebar */}
			<nav
				className={`
          fixed top-0 left-0 h-screen bg-white shadow-md p-5 flex flex-col justify-between
          md:relative md:w-48 md:translate-x-0
          transform transition-transform duration-300 ease-in-out z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64
        `}>
				<div>
					<h1 className='text-2xl font-bold mb-6 text-red-600 hidden md:block'>
						Alalay Admin
					</h1>
					<ul className='space-y-2'>
						{links.map((link) => (
							<li key={link.href}>
								<Link
									href={link.href}
									className={`block px-3 py-2 rounded-lg ${
										pathname.startsWith(link.href)
											? 'bg-red-600 text-white font-semibold'
											: 'text-gray-700 hover:bg-gray-200'
									}`}
									onClick={() => setIsOpen(false)}>
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Logout Button */}
				<button
					onClick={handleLogout}
					className='mt-6 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 w-full'>
					Logout
				</button>
			</nav>

			{/* Overlay for mobile */}
			{isOpen && (
				<div
					className='fixed inset-0 bg-black opacity-50 z-10 md:hidden transition-opacity duration-300'
					onClick={() => setIsOpen(false)}
				/>
			)}
		</>
	);
}
