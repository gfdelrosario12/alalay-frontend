import { AuthUser } from '../types/auth';

export const dummyUsers: AuthUser[] = [
	{
		id: 1,
		name: 'Juan Dela Cruz',
		email: 'resident@example.com',
		password: 'resident123',
		role: 'resident',
	},
	{
		id: 2,
		name: 'Maria Santos',
		email: 'rescuer@example.com',
		password: 'rescuer123',
		role: 'rescuer',
	},
	{
		id: 3,
		name: 'Admin User',
		email: 'admin@example.com',
		password: 'admin123',
		role: 'admin',
	},
];
