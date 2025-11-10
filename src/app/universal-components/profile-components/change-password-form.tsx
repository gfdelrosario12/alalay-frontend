'use client';

export default function ChangePasswordForm() {
	return (
		<form className='flex flex-col gap-3'>
			<input
				type='password'
				placeholder='Current Password'
				className='border p-2 rounded'
			/>
			<input
				type='password'
				placeholder='New Password'
				className='border p-2 rounded'
			/>
			<input
				type='password'
				placeholder='Confirm Password'
				className='border p-2 rounded'
			/>
			<button
				type='submit'
				className='bg-blue-600 text-white p-2 rounded mt-2'>
				Update Password
			</button>
		</form>
	);
}
