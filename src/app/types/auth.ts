export type Role = 'resident' | 'rescuer' | 'admin';

export interface AuthUser {
	id: number;
	name: string;
	email: string;
	password?: string;
	role: Role;
}
