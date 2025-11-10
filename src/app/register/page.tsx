'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<'resident' | 'rescuer'>('resident');
	const [houseNumber, setHouseNumber] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [postalCode, setPostalCode] = useState('');

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({
			name,
			email,
			password,
			role,
			houseNumber,
			street,
			city,
			province,
			postalCode,
		});
		alert(`Registered as ${role.toUpperCase()} (front-end only).`);
	};

	return (
		<div className='font-sans flex flex-col items-center justify-center min-h-screen bg-[#fafafa] p-4'>
			<div className='p-8 w-full max-w-md'>
				<h1 className='text-2xl font-bold mb-6 text-center'>
					Create an Account
				</h1>
				<form
					onSubmit={handleRegister}
					className='flex flex-col gap-4'>
					<input
						type='text'
						placeholder='Full Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						required
					/>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						required
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						required
					/>

					{/* Address section */}
					<div className='grid grid-cols-2 gap-4'>
						<input
							type='text'
							placeholder='House Number'
							value={houseNumber}
							onChange={(e) => setHouseNumber(e.target.value)}
							className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
						<input
							type='text'
							placeholder='Street'
							value={street}
							onChange={(e) => setStreet(e.target.value)}
							className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
						<input
							type='text'
							placeholder='City'
							value={city}
							onChange={(e) => setCity(e.target.value)}
							className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
						<input
							type='text'
							placeholder='Province'
							value={province}
							onChange={(e) => setProvince(e.target.value)}
							className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
						<input
							type='text'
							placeholder='Postal Code'
							value={postalCode}
							onChange={(e) => setPostalCode(e.target.value)}
							className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2'
							required
						/>
					</div>

					<button
						type='submit'
						className='bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition'>
						Register
					</button>
				</form>

				<p className='mt-4 text-center text-gray-600'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='text-red-600 font-semibold hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
