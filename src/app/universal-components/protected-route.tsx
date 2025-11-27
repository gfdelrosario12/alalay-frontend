'use client';

import { useAuth } from '../context/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
	children,
	roles,
}: {
	children: React.ReactNode;
	roles: ('RESIDENT' | 'RESCUER' | 'ADMIN')[];
}) {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading) {
			if (!user) router.replace('/login');
			else if (!roles.map(r => r.toLowerCase()).includes((user.role || '').toLowerCase())) router.replace('/login');
		}
	}, [user, router, roles, loading]);

	if (loading) return null; // or a loading spinner
	if (!user) return null;

	return <>{children}</>;
}
