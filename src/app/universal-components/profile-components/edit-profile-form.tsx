import { useState } from 'react';
import { useAuth } from '@/app/context/auth';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export default function EditProfileForm({ onSuccess }: { onSuccess?: () => void }) {
	const { user } = useAuth();
	const [form, setForm] = useState({
		firstName: user?.firstName || '',
		middleName: user?.middleName || '',
		lastName: user?.lastName || '',
		permanentAddress: user?.permanentAddress || '',
		age: user?.age || '',
		birthDate: user?.birthDate || '',
		emergencyContactName: user?.emergencyContactName || '',
		emergencyContactDetails: user?.emergencyContactDetails || '',
		phoneNumber: user?.phoneNumber || '',
		email: user?.email || '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		if (!user || !user.id) {
			setError('User not found.');
			return;
		}
		setLoading(true);
		const mutation = `mutation UpdateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) { id }\n}`;
		const variables = {
			input: {
				id: user.id,
				email: form.email,
				password: '', // not updating password here
				firstName: form.firstName,
				middleName: form.middleName,
				lastName: form.lastName,
				permanentAddress: form.permanentAddress,
				age: form.age ? parseInt(form.age as any) : null,
				birthDate: form.birthDate,
				emergencyContactName: form.emergencyContactName,
				emergencyContactDetails: form.emergencyContactDetails,
				phoneNumber: form.phoneNumber,
				role: user.role,
			},
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
			setSuccess('Profile updated successfully!');
			setLoading(false);
			if (onSuccess) onSuccess();
		} catch (err) {
			setError((err as Error).message);
			setLoading(false);
		}
	};

	return (
		<form className='flex flex-col gap-3' onSubmit={handleSubmit}>
			<label className='flex flex-col'>
				<span>First Name</span>
				<input name='firstName' value={form.firstName} onChange={handleChange} placeholder='First Name' className='border p-2 rounded' />
			</label>
			<label className='flex flex-col'>
				<span>Middle Name</span>
				<input name='middleName' value={form.middleName} onChange={handleChange} placeholder='Middle Name' className='border p-2 rounded' />
			</label>
			<label className='flex flex-col'>
				<span>Last Name</span>
				<input name='lastName' value={form.lastName} onChange={handleChange} placeholder='Last Name' className='border p-2 rounded' />
			</label>
			<label className='flex flex-col'>
				<span>Permanent Address</span>
				<input name='permanentAddress' value={form.permanentAddress} onChange={handleChange} placeholder='Permanent Address' className='border p-2 rounded' />
			</label>
			<label className='flex flex-col'>
				<span>Age</span>
				<input name='age' value={form.age} onChange={handleChange} placeholder='Age' type='number' className='border p-2 rounded' />
			</label>
			<label className='flex flex-col'>
				<span>Birth Date</span>
				<input name='birthDate' value={form.birthDate} onChange={handleChange} placeholder='Birth Date' type='date' className='border p-2 rounded' />
			</label>
			<label className='flex flex-col'>
				<span>Emergency Contact Name</span>
				<input name='emergencyContactName' value={form.emergencyContactName} onChange={handleChange} placeholder='Emergency Contact Name' className='border p-2 rounded' />
			</label>
			<label className='flex flex-col'>
				<span>Emergency Contact Details</span>
				<input name='emergencyContactDetails' value={form.emergencyContactDetails} onChange={handleChange} placeholder='Emergency Contact Details' className='border p-2 rounded' />
			</label>
			<label className='flex flex-col'>
				<span>Phone Number</span>
				<input name='phoneNumber' value={form.phoneNumber} onChange={handleChange} placeholder='Phone Number' className='border p-2 rounded' />
			</label>
			<label className='flex flex-col'>
				<span>Email</span>
				<input name='email' value={form.email} onChange={handleChange} placeholder='Email' className='border p-2 rounded' />
			</label>
			{error && <div className='text-red-600 text-sm'>{error}</div>}
			{success && <div className='text-green-600 text-sm'>{success}</div>}
			<button type='submit' className='bg-red-600 text-white p-2 rounded mt-2 hover:bg-red-700' disabled={loading}>
				{loading ? 'Updating...' : 'Update Profile'}
			</button>
		</form>
	);
}
