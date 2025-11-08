'use client';

import { useEffect } from 'react';
import { useRoleTheme } from '../ThemeProvider/ThemeProvider';

export default function RescuerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { setRole } = useRoleTheme();

	useEffect(() => {
		setRole('rescuer');
	}, [setRole]);

	return <>{children}</>;
}
