'use client';

import { useAuth } from '../context/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
	children,
	roles,
}: {
	children: React.ReactNode;
	roles: ('resident' | 'rescuer' | 'admin')[];
}) {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) router.replace('/login');
		else if (!roles.includes(user.role)) router.replace('/login');
	}, [user, router, roles]);

	if (!user) return null; // can add loading screen

	return <>{children}</>;
}
