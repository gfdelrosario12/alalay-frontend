'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GRAPHQL_ENDPOINT =
	process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function Register() {
	// User info
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [age, setAge] = useState('');

	// Passwords
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// Address (Google Maps–style input, text only)
	const [address, setAddress] = useState('');

	// Other fields
	const [birthDate, setBirthDate] = useState('');
	const [emergencyContactName, setEmergencyContactName] = useState('');
	const [emergencyContactDetails, setEmergencyContactDetails] = useState('');

	const router = useRouter();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		const mutation = `mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    email\n    firstName\n    lastName\n    role\n  }\n}`;
		const variables = {
			input: {
				email,
				password,
				firstName,
				middleName,
				lastName,
				permanentAddress: address,
				age: age ? parseInt(age) : null,
				birthDate,
				emergencyContactName,
				emergencyContactDetails,
				phoneNumber,
				role: 'RESIDENT',
			},
		};

		try {
			const res = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: mutation, variables }),
			});
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await res.json();
			if (data.errors && data.errors.length > 0) {
				alert('Registration failed: ' + data.errors[0].message);
				return;
			}
			if (!data.data || !data.data.createUser) {
				alert('Registration failed: Unexpected response from server.');
				return;
			}
			alert('Registered successfully!');
			router.push('/login');
		} catch (err) {
			alert('Registration error: ' + (err as Error).message);
		}
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
								type='text'
								placeholder='Phone Number'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
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
								placeholder='Emergency Contact Name'
								value={emergencyContactName}
								onChange={(e) => setEmergencyContactName(e.target.value)}
								className='input'
								required
							/>

							<input
								type='text'
								placeholder='Emergency Contact Details'
								value={emergencyContactDetails}
								onChange={(e) => setEmergencyContactDetails(e.target.value)}
								className='input'
								required
							/>

							<input
								type='number'
								placeholder='Age'
								value={age}
								onChange={(e) => setAge(e.target.value)}
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
