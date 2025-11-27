'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../universal-styles/alalay-navigation.css';

type AlalayNavigationProps = {
	role: 'RESIDENT' | 'RESCUER';
};

export default function AlalayNavigation({ role }: AlalayNavigationProps) {
	const pathname = usePathname();

	// Helper function to check if the link is active
	const isActive = (path: string) => pathname === path;

	// Dynamic routes depending on the role
	const basePath = `/${role}`;

	const navItems = [
		{
			label: 'News',
			path: `${basePath}/news`,
			icon: 'news',
		},
		// Only show People for residents
		...(role === 'RESIDENT'
			? [
					{
						label: 'People',
						path: `${basePath}/people`,
						icon: 'people',
					},
			  ]
			: []),
		// Only show Tasks for rescuers
		...(role === 'RESCUER'
			? [
					{
						label: 'Tasks',
						path: `${basePath}/tasks`,
						icon: 'tasks',
					},
			  ]
			: []),
		{
			label: 'Maps',
			path: `${basePath}/maps`,
			icon: 'address',
			isLarge: true,
		},
		{
			label: 'Logs',
			path: `${basePath}/logs`,
			icon: 'logs',
		},
		{
			label: 'Profile',
			path: `${basePath}/profile`,
			icon: 'profile',
		},
	];

	return (
		<div className='resident-nav-container'>
			<ul>
				{navItems.map((item) => {
					const active = isActive(item.path);
					let iconSrc = '';

					// Handle icon color logic
					if (item.icon === 'address') {
						// Maps icon: red by default, yellow when active
						iconSrc = active
							? `/images/nav-bar-icons/${item.icon}-yellow.png`
							: `/images/nav-bar-icons/${item.icon}-red.png`;
					} else {
						// All other icons: white by default, yellow when active
						iconSrc = active
							? `/images/nav-bar-icons/${item.icon}-yellow.png`
							: `/images/nav-bar-icons/${item.icon}-white.png`;
					}

					return (
						<li key={item.label}>
							<Link href={item.path}>
								<Image
									className={item.isLarge ? 'maps-img' : ''}
									src={iconSrc}
									alt={`${item.icon}.png`}
									width={item.isLarge ? 36 : 24}
									height={item.isLarge ? 36 : 24}
								/>
								<span className={active ? 'active' : ''}>{item.label}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
