'use client';
import { useState } from 'react';

export type RescueTask = {
	id: number;
	incidentId: number;
	assignedRescuerId: number;
	assignedDateTime: string;
	status: string;
	completionDateTime: string;
	notes: string;
};

export type RescueTaskFormData = Omit<RescueTask, 'id'>;

type RescueTaskFormModalProps = {
	onSubmit: (data: RescueTaskFormData) => void;
	onCancel: () => void;
};

export default function RescueTaskFormModal({
	onSubmit,
	onCancel,
}: RescueTaskFormModalProps) {
	const [formData, setFormData] = useState<RescueTaskFormData>({
		incidentId: 0,
		assignedRescuerId: 0,
		assignedDateTime: '',
		status: 'Pending',
		completionDateTime: '',
		notes: '',
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		if (name.includes('Id')) {
			setFormData({ ...formData, [name]: Number(value) });
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
				<h2 className='text-xl font-semibold mb-4'>Add Rescue Task</h2>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-3'>
					<label className='font-medium'>Incident ID</label>
					<input
						type='number'
						name='incidentId'
						value={formData.incidentId}
						onChange={handleChange}
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Assigned Rescuer ID</label>
					<input
						type='number'
						name='assignedRescuerId'
						value={formData.assignedRescuerId}
						onChange={handleChange}
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Assigned Date & Time</label>
					<input
						type='datetime-local'
						name='assignedDateTime'
						value={formData.assignedDateTime}
						onChange={handleChange}
						className='border p-2 rounded'
						required
					/>

					<label className='font-medium'>Status</label>
					<select
						name='status'
						value={formData.status}
						onChange={handleChange}
						className='border p-2 rounded'
						required>
						<option value='Pending'>Pending</option>
						<option value='In Progress'>In Progress</option>
						<option value='Completed'>Completed</option>
					</select>

					<label className='font-medium'>Completion Date & Time</label>
					<input
						type='datetime-local'
						name='completionDateTime'
						value={formData.completionDateTime}
						onChange={handleChange}
						className='border p-2 rounded'
					/>

					<label className='font-medium'>Notes</label>
					<textarea
						name='notes'
						value={formData.notes}
						onChange={handleChange}
						placeholder='Additional notes'
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
