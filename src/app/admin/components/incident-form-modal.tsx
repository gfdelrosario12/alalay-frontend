'use client';
import { useState } from 'react';

export type Incident = {
	id: number;
	calamityId: number;
	reporterUserId: number;
	detectedDateTime: string;
	description: string;
	location: string;
	isRescueAssigned: boolean;
	otherAffectedMembers: string;
	otherImportantDetails: string;
};

export type IncidentFormData = Omit<Incident, 'id'>;

type IncidentFormModalProps = {
	onSubmit: (data: IncidentFormData) => void;
	onCancel: () => void;
};

export default function IncidentFormModal({
	onSubmit,
	onCancel,
}: IncidentFormModalProps) {
	const [formData, setFormData] = useState<IncidentFormData>({
		calamityId: 0,
		reporterUserId: 0,
		detectedDateTime: '',
		description: '',
		location: '',
		isRescueAssigned: false,
		otherAffectedMembers: '',
		otherImportantDetails: '',
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
			setFormData({ ...formData, [name]: e.target.checked });
		} else if (name.includes('Id')) {
			setFormData({ ...formData, [name]: Number(value) }); // convert ID fields to number
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto'>
				<h2 className='text-xl font-semibold mb-4'>Add Incident</h2>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-3'>
					<label className='font-medium'>Calamity ID</label>
					<input
						type='number'
						name='calamityId'
						value={formData.calamityId}
						onChange={handleChange}
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Reporter User ID</label>
					<input
						type='number'
						name='reporterUserId'
						value={formData.reporterUserId}
						onChange={handleChange}
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Detected Date & Time</label>
					<input
						type='datetime-local'
						name='detectedDateTime'
						value={formData.detectedDateTime}
						onChange={handleChange}
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Description</label>
					<textarea
						name='description'
						value={formData.description}
						onChange={handleChange}
						placeholder='Incident description'
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Location</label>
					<input
						type='text'
						name='location'
						value={formData.location}
						onChange={handleChange}
						placeholder='Location'
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium flex items-center gap-2'>
						<input
							type='checkbox'
							name='isRescueAssigned'
							checked={formData.isRescueAssigned}
							onChange={handleChange}
						/>
						Is Rescue Assigned
					</label>

					<label className='font-medium'>Other Affected Members</label>
					<input
						type='text'
						name='otherAffectedMembers'
						value={formData.otherAffectedMembers}
						onChange={handleChange}
						placeholder='List other affected members'
						className='border p-2 rounded'
					/>

					<label className='font-medium'>Other Important Details</label>
					<textarea
						name='otherImportantDetails'
						value={formData.otherImportantDetails}
						onChange={handleChange}
						placeholder='Additional important details'
						className='border p-2 rounded'
					/>

					<div className='flex justify-end mt-4 gap-2'>
						<button
							type='button'
							onClick={onCancel}
							className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'>
							Cancel
						</button>
						<button
							type='submit'
							className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
