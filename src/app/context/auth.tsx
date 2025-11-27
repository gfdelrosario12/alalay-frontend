'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthUser } from '@/utils/auth';

type AuthContextType = {
	user: AuthUser | null;
	login: (user: AuthUser) => void;
	logout: () => void;
	getToken: () => string | null;
	getUser: () => AuthUser | null;
	isAuthenticated: () => boolean;
	hasRole: (role: string) => boolean;
	loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const stored = localStorage.getItem('alalay_user');
		if (stored) {
			Promise.resolve().then(() => {
				setUser(JSON.parse(stored));
				setLoading(false);
				console.log('[AuthProvider] User loaded from localStorage:', JSON.parse(stored));
			});
		} else {
			setLoading(false);
			console.log('[AuthProvider] No user found in localStorage.');
		}
	}, []);

	const getToken = () => {
		if (typeof window === 'undefined') return null;
		return localStorage.getItem('token');
	};

	const getUser = () => {
		if (typeof window === 'undefined') return null;
		const stored = localStorage.getItem('alalay_user');
		return stored ? (JSON.parse(stored) as AuthUser) : null;
	};

	const isAuthenticated = () => {
		return !!getToken();
	};

	const hasRole = (role: string) => {
		const u = getUser();
		return !!u && u.role === role;
	};

	const login = (userData: AuthUser) => {
		localStorage.setItem('alalay_user', JSON.stringify(userData));
		setUser(userData);
		console.log('[AuthProvider] User logged in:', userData);
	};

	const logout = () => {
		localStorage.removeItem('alalay_user');
		setUser(null);
		console.log('[AuthProvider] User logged out.');
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, getToken, getUser, isAuthenticated, hasRole, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};
