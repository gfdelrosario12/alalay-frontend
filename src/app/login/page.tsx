'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { dummyUsers } from '../data/dummy-users';
import { useAuth } from '../context/auth';
import { useRoleTheme } from '../ThemeProvider/ThemeProvider';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const { login } = useAuth();
	const { setRole } = useRoleTheme();

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		const user = dummyUsers.find(
			(u) => u.email === email && u.password === password
		);

		if (!user) {
			setError('Invalid email or password.');
			return;
		}

		// Save user globally
		login({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		});

		// Set theme based on role
		setRole(user.role);

		// Redirect based on role
		switch (user.role) {
			case 'resident':
				router.push('/resident/maps');
				break;
			case 'rescuer':
				router.push('/rescuer/maps');
				break;
			case 'admin':
				router.push('/admin/dashboard');
				break;
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-[#fafafa] p-4'>
			<div className='p-8 w-full max-w-md'>
				<h1 className='text-2xl font-bold mb-6 text-center'>Login to Alalay</h1>

				<form
					onSubmit={handleLogin}
					className='flex flex-col gap-4'>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500'
						required
					/>

					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500'
						required
					/>

					{error && <p className='text-red-600 text-center'>{error}</p>}

					<button
						type='submit'
						className='bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition'>
						Login
					</button>
				</form>

				<p className='mt-4 text-center text-gray-600'>
					Don’t have an account?{' '}
					<Link
						href='/register'
						className='text-red-600 font-semibold hover:underline'>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
