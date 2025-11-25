'use client';

import { useState } from 'react';

export type CalamityFormData = {
	startDate: string;
	description: string;
	calamity_category: string;
	reportedEndDate: string;
	affectedAreas: string;
};

type CalamityFormModalProps = {
	onSubmit: (data: CalamityFormData) => void;
	onCancel: () => void;
};

export default function CalamityFormModal({
	onSubmit,
	onCancel,
}: CalamityFormModalProps) {
	const [formData, setFormData] = useState<CalamityFormData>({
		startDate: '',
		description: '',
		calamity_category: '',
		reportedEndDate: '',
		affectedAreas: '',
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto'>
				<h2 className='text-xl font-semibold mb-4'>Add Calamity</h2>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-3'>
					<label className='font-medium'>Start Date</label>
					<input
						type='date'
						name='startDate'
						value={formData.startDate}
						onChange={handleChange}
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Description</label>
					<textarea
						name='description'
						value={formData.description}
						onChange={handleChange}
						placeholder='Describe the calamity'
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Calamity Category</label>
					<select
						name='calamity_category'
						value={formData.calamity_category}
						onChange={handleChange}
						className='border p-2 rounded'
						required>
						<option value=''>Select Category</option>
						<option value='Flood'>Flood</option>
						<option value='Earthquake'>Earthquake</option>
						<option value='Storm'>Storm</option>
						<option value='Fire'>Fire</option>
						<option value='Landslide'>Landslide</option>
					</select>

					<label className='font-medium'>Reported End Date</label>
					<input
						type='date'
						name='reportedEndDate'
						value={formData.reportedEndDate}
						onChange={handleChange}
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Affected Areas</label>
					<input
						type='text'
						name='affectedAreas'
						value={formData.affectedAreas}
						onChange={handleChange}
						placeholder='List affected areas'
						className='border p-2 rounded'
						required
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
