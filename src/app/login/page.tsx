'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ email, password });
		alert('Login functionality not implemented. This is front-end only.');
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-[#fafafa] p-4'>
			<div className=' p-8 w-full max-w-md'>
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
					<button
						type='submit'
						className='bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition'>
						Login
					</button>
				</form>
				<p className='mt-4 text-center text-gray-600'>
					Don`t have an account?{' '}
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
