'use client';

export default function ChangeEmailForm() {
	return (
		<form className='flex flex-col gap-3'>
			<input
				type='email'
				placeholder='New Email Address'
				className='border p-2 rounded'
			/>
			<input
				type='password'
				placeholder='Current Password'
				className='border p-2 rounded'
			/>
			<button
				type='submit'
				className='bg-blue-600 text-white p-2 rounded mt-2'>
				Update Email
			</button>
		</form>
	);
}
