'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthUser } from '../types/auth';

type AuthContextType = {
	user: AuthUser | null;
	login: (user: AuthUser) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthUser | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem('alalay_user');
		if (stored) {
			Promise.resolve().then(() => {
				setUser(JSON.parse(stored));
			});
		}
	}, []);

	const login = (userData: AuthUser) => {
		localStorage.setItem('alalay_user', JSON.stringify(userData));
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem('alalay_user');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};
