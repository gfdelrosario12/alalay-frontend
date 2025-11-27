'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		const mutation = `mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    token\n    user {\n      id email firstName middleName lastName permanentAddress age birthDate emergencyContactName emergencyContactDetails phoneNumber currentLatitude currentLongitude role createdAt\n    }\n  }\n}`;
		const variables = { input: { email, password } };
		try {
			const res = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: mutation, variables }),
			});
			if (!res.ok) throw new Error('Network error');
			const data = await res.json();
			if (data.errors && data.errors.length > 0) {
				setError(data.errors[0].message);
				return;
			}
			const payload = data.data?.login;
			if (!payload || !payload.token || !payload.user) {
				setError('Invalid login response');
				return;
			}
			// Save token and full user info
			localStorage.setItem('token', payload.token);
			localStorage.setItem('alalay_user', JSON.stringify(payload.user));
			console.log('Stored token:', localStorage.getItem('token'));
			console.log('Stored user:', localStorage.getItem('alalay_user'));
			// Role-based redirection
			switch (payload.user.role) {
				case 'ADMIN':
					router.push('/admin/dashboard');
					break;
				case 'RESCUER':
					router.push('/res	cuer/maps');
					break;
				case 'RESIDENT':
				default:
					router.push('/resident/maps');
			}
		} catch (err) {
			setError((err as Error).message);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-[#fafafa] p-4'>
			<div className='p-8 w-full max-w-md bg-white shadow rounded-xl'>
				<h1 className='text-2xl font-bold mb-6 text-center'>Login to Alalay</h1>

				<form
					onSubmit={handleLogin}
					className='flex flex-col gap-6'>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='input'
						required
					/>

					<div className='relative'>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='input pr-10'
							required
						/>
						<button
							type='button'
							className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'
							onClick={() => setShowPassword((v) => !v)}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{showPassword ? (
								// Eye-off icon
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 16.273 7.24 19.5 12 19.5c1.772 0 3.442-.37 4.938-1.027m3.082-2.223A10.477 10.477 0 0022.066 12c-1.292-4.273-5.306-7.5-10.066-7.5-1.295 0-2.54.206-3.692.586m8.258 8.258A3 3 0 1112 9m0 0a3 3 0 013 3m-3-3v.008m0 0L3 3m18 18-1.5-1.5" />
								</svg>
							) : (
								// Eye icon
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0-4.273 4.014-7.5 9.75-7.5s9.75 3.227 9.75 7.5-4.014 7.5-9.75 7.5S2.25 16.273 2.25 12zm9.75 3a3 3 0 100-6 3 3 0 000 6z" />
								</svg>
							)}
						</button>
					</div>

					{error && <div className='text-red-600 text-sm'>{error}</div>}

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
