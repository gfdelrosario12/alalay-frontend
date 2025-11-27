'use client';

import { useAuth } from '../context/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getToken } from '@/utils/auth';

export default function ProtectedRoute({
	children,
	roles,
}: {
	children: React.ReactNode;
	roles: ('RESIDENT' | 'RESCUER' | 'ADMIN')[];
}) {
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Wait for user to be loaded from localStorage
		setLoading(false);
	}, []);

	useEffect(() => {
		if (!loading) {
			const token = getToken();
			if (!user || !token) router.replace('/login');
			else if (!roles.map(r => r.toLowerCase()).includes((user.role || '').toLowerCase())) router.replace('/login');
		}
	}, [user, router, roles, loading]);

	if (loading) return null; // or a loading spinner
	if (!user || !getToken()) return null;

	return <>{children}</>;
}
