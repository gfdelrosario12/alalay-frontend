'use client';

export default function EditProfileForm() {
	return (
		<form className='flex flex-col gap-3'>
			<input
				type='text'
				placeholder='Full Name'
				className='border p-2 rounded'
			/>
			<input
				type='text'
				placeholder='Username'
				className='border p-2 rounded'
			/>
			<button
				type='submit'
				className='bg-blue-600 text-white p-2 rounded mt-2'>
				Save Changes
			</button>
		</form>
	);
}
