'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
	// User info
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');

	// Passwords
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// Address (Google Maps–style input, text only)
	const [address, setAddress] = useState('');

	// Other fields
	const [birthDate, setBirthDate] = useState('');
	const [emergencyContact, setEmergencyContact] = useState('');

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		console.log({
			email,
			firstName,
			middleName,
			lastName,
			password,
			birthDate,
			emergencyContact,
			address, // full text address
		});

		alert('Registered! (Front-end only)');
	};

	return (
		<div className='font-sans flex flex-col items-center justify-center min-h-screen bg-[#fafafa] p-4'>
			<div className='p-8 w-full max-w-md bg-white shadow rounded-xl'>
				<h1 className='text-2xl font-bold mb-6 text-center'>
					Create an Account
				</h1>

				<form
					onSubmit={handleRegister}
					className='flex flex-col gap-6'>
					{/* --- GROUP 1: PERSONAL INFORMATION --- */}
					<div>
						<h2 className='font-semibold mb-2'>Personal Information</h2>
						<div className='grid grid-cols-1 gap-3'>
							<input
								type='email'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='input'
								required
							/>

							<input
								type='text'
								placeholder='First Name'
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className='input'
								required
							/>

							<input
								type='text'
								placeholder='Middle Name'
								value={middleName}
								onChange={(e) => setMiddleName(e.target.value)}
								className='input'
							/>

							<input
								type='text'
								placeholder='Last Name'
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className='input'
								required
							/>

							<input
								type='date'
								value={birthDate}
								onChange={(e) => setBirthDate(e.target.value)}
								className='input'
								required
							/>

							<input
								type='text'
								placeholder='Emergency Contact'
								value={emergencyContact}
								onChange={(e) => setEmergencyContact(e.target.value)}
								className='input'
								required
							/>
						</div>
					</div>

					{/* --- GROUP 2: PASSWORDS --- */}
					<div>
						<h2 className='font-semibold mb-2'>Password</h2>
						<div className='grid grid-cols-1 gap-3'>
							<input
								type='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='input'
								required
							/>
							<input
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className='input'
								required
							/>
						</div>
					</div>

					{/* --- GROUP 3: GOOGLE MAPS–STYLE ADDRESS BAR --- */}
					<div>
						<h2 className='font-semibold mb-2'>Address</h2>

						<div className='relative'>
							<input
								type='text'
								placeholder='Input address'
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								className='input pl-10'
								required
							/>
						</div>
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
