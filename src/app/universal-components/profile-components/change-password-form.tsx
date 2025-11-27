'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/auth';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function ChangePasswordForm({ onSuccess }: { onSuccess?: () => void }) {
	const { user } = useAuth();
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		if (!user || !user.id) {
			setError('User not found.');
			return;
		}
		if (!currentPassword || !newPassword || !confirmPassword) {
			setError('All fields are required.');
			return;
		}
		if (newPassword !== confirmPassword) {
			setError('New passwords do not match.');
			return;
		}
		setLoading(true);
		const mutation = `mutation ChangePassword($userId: ID!, $oldPassword: String!, $newPassword: String!) {\n  changePassword(userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword)\n}`;
		const variables = {
			userId: user.id,
			oldPassword: currentPassword,
			newPassword: newPassword,
		};
		try {
			const res = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: mutation, variables })
			});
			const data = await res.json();
			if (data.errors && data.errors.length > 0) {
				setError(data.errors[0].message);
				setLoading(false);
				return;
			}
			if (data.data && data.data.changePassword) {
				setSuccess('Password updated successfully!');
				setLoading(false);
				if (onSuccess) onSuccess();
			} else {
				setError('Failed to update password.');
				setLoading(false);
			}
		} catch (err) {
			setError((err as Error).message);
			setLoading(false);
		}
	};

	return (
		<form className='flex flex-col gap-3' onSubmit={handleSubmit}>
			<label className='flex flex-col'>
				<span>Current Password</span>
				<input
					type='password'
					placeholder='Current Password'
					className='border p-2 rounded'
					value={currentPassword}
					onChange={e => setCurrentPassword(e.target.value)}
				/>
			</label>
			<label className='flex flex-col'>
				<span>New Password</span>
				<input
					type='password'
					placeholder='New Password'
					className='border p-2 rounded'
					value={newPassword}
					onChange={e => setNewPassword(e.target.value)}
				/>
			</label>
			<label className='flex flex-col'>
				<span>Confirm Password</span>
				<input
					type='password'
					placeholder='Confirm Password'
					className='border p-2 rounded'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
			</label>
			{error && <div className='text-red-600 text-sm'>{error}</div>}
			{success && <div className='text-green-600 text-sm'>{success}</div>}
			<button
				type='submit'
				className='bg-red-600 text-white p-2 rounded mt-2 hover:bg-red-700'
				disabled={loading}
			>
				{loading ? 'Updating...' : 'Update Password'}
			</button>
		</form>
	);
}
