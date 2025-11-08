// app/page.tsx
'use client';
import ResidentMap from './resident/maps/page';
import { useRoleTheme } from './ThemeProvider/ThemeProvider';
import { useEffect } from 'react';

export default function Home() {
	const { setRole } = useRoleTheme();

	useEffect(() => {
		setRole('resident');
	}, [setRole]);

	return <ResidentMap />;
}
