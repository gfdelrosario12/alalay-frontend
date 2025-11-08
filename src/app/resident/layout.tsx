'use client';
import { useEffect } from 'react';
import { useRoleTheme } from '../ThemeProvider/ThemeProvider';

export default function ResidentLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { setRole } = useRoleTheme();

	useEffect(() => {
		setRole('resident');
	}, [setRole]);

	return <>{children}</>;
}
