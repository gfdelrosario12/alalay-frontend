'use client';
import { useState } from 'react';
import ProtectedRoute from '@/app/universal-components/protected-route';

export default function SettingsPage() {
	const [username, setUsername] = useState('admin');
	const [email, setEmail] = useState('admin@email.com');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleUpdateProfile = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you can add your API call to update username/email
		alert(`Profile updated!\nUsername: ${username}\nEmail: ${email}`);
	};

	const handleChangePassword = (e: React.FormEvent) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			alert('New password and confirm password do not match.');
			return;
		}
		// Add API call to change password
		alert('Password updated successfully!');
		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
	};

	return (
		<ProtectedRoute roles={['admin']}>
			<div>
				<h1 className='text-2xl font-bold mb-6'>Settings</h1>

				<div className='bg-white p-6 rounded-xl shadow space-y-8 max-w-lg'>
					{/* Edit Username / Email */}
					<form
						onSubmit={handleUpdateProfile}
						className='space-y-4'>
						<h2 className='text-xl font-semibold'>Profile Settings</h2>
						<input
							type='text'
							placeholder='Username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className='w-full p-2 border rounded-lg'
							required
						/>
						<input
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-full p-2 border rounded-lg'
							required
						/>
						<button
							type='submit'
							className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
							Update Profile
						</button>
					</form>

					{/* Change Password */}
					<form
						onSubmit={handleChangePassword}
						className='space-y-4'>
						<h2 className='text-xl font-semibold'>Change Password</h2>
						<input
							type='password'
							placeholder='Current Password'
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							className='w-full p-2 border rounded-lg'
							required
						/>
						<input
							type='password'
							placeholder='New Password'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className='w-full p-2 border rounded-lg'
							required
						/>
						<input
							type='password'
							placeholder='Confirm New Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className='w-full p-2 border rounded-lg'
							required
						/>
						<button
							type='submit'
							className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
							Change Password
						</button>
					</form>
				</div>
			</div>
		</ProtectedRoute>
	);
}
