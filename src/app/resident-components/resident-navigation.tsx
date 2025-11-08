'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../resident-styles/resident-navigation.css';

export default function ResidentNavigation() {
	const pathname = usePathname();

	// Helper function to check if the link is active
	const isActive = (path: string) => pathname === path;

	return (
		<div className='resident-nav-container'>
			<ul>
				<li>
					<Link href='/resident/news'>
						<Image
							src={
								isActive('/resident/news')
									? '/images/nav-bar-icons/news-yellow.png'
									: '/images/nav-bar-icons/news-white.png'
							}
							alt='news.png'
							width={24}
							height={24}
						/>
						<span className={isActive('/resident/news') ? 'active' : ''}>
							News
						</span>
					</Link>
				</li>

				<li>
					<Link href='/resident/people'>
						<Image
							src={
								isActive('/resident/people')
									? '/images/nav-bar-icons/people-yellow.png'
									: '/images/nav-bar-icons/people-white.png'
							}
							alt='people.png'
							width={24}
							height={24}
						/>
						<span className={isActive('/resident/people') ? 'active' : ''}>
							People
						</span>
					</Link>
				</li>

				<li>
					<Link href='/resident/maps'>
						<Image
							className={`maps-img ${
								isActive('/resident/maps') ? 'active' : ''
							}`}
							src='/images/nav-bar-icons/address-red.png'
							alt='maps.png'
							width={36}
							height={36}
						/>
						<span className={isActive('/resident/maps') ? 'active' : ''}>
							Maps
						</span>
					</Link>
				</li>

				<li>
					<Link href='/resident/logs'>
						<Image
							src={
								isActive('/resident/logs')
									? '/images/nav-bar-icons/logs-yellow.png'
									: '/images/nav-bar-icons/logs-white.png'
							}
							alt='logs.png'
							width={24}
							height={24}
						/>
						<span className={isActive('/resident/logs') ? 'active' : ''}>
							Logs
						</span>
					</Link>
				</li>

				<li>
					<Link href='/resident/profile'>
						<Image
							src={
								isActive('/resident/profile')
									? '/images/nav-bar-icons/profile-yellow.png'
									: '/images/nav-bar-icons/profile-white.png'
							}
							alt='profile.png'
							width={24}
							height={24}
						/>
						<span className={isActive('/resident/profile') ? 'active' : ''}>
							Profile
						</span>
					</Link>
				</li>
			</ul>
		</div>
	);
}
