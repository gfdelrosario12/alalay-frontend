'use client';
import { useState } from 'react';
import RescueTaskTable from '../components/rescues-table';
import RescueTaskFormModal, {
	RescueTaskFormData,
} from '../components/rescues-form-modal';
import { RescueTask } from '../components/rescues-form-modal';
import ProtectedRoute from '@/app/universal-components/protected-route';

export default function RescueTasksPage() {
	const [tasks, setTasks] = useState<RescueTask[]>([
		{
			id: 1,
			incidentId: 1,
			assignedRescuerId: 201,
			assignedDateTime: '2025-11-26T09:00',
			status: 'In Progress',
			completionDateTime: '',
			notes: 'Evacuating 5 families from flood zone.',
		},
		{
			id: 2,
			incidentId: 2,
			assignedRescuerId: 202,
			assignedDateTime: '2025-11-25T16:00',
			status: 'Pending',
			completionDateTime: '',
			notes: 'Inspecting earthquake-damaged homes.',
		},
		{
			id: 3,
			incidentId: 3,
			assignedRescuerId: 203,
			assignedDateTime: '2025-11-26T11:00',
			status: 'Completed',
			completionDateTime: '2025-11-26T13:30',
			notes: 'Restored electricity to 3 households using emergency generator.',
		},
	]);
	const [showModal, setShowModal] = useState(false);

	const handleAddClick = () => setShowModal(true);

	const handleSubmit = (data: RescueTaskFormData) => {
		const newTask: RescueTask = {
			...data,
			id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
		};
		setTasks([...tasks, newTask]);
		setShowModal(false);
	};

	return (
		<ProtectedRoute roles={['ADMIN']}>
			<div className='p-4 md:p-6 lg:p-3'>
				<h1 className='text-2xl font-bold mb-6'>Rescue Tasks Management</h1>

				<div className='flex justify-end mb-4'>
					<button
						onClick={handleAddClick}
						className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
						Add Rescue Task
					</button>
				</div>

				<RescueTaskTable tasks={tasks} />

				{showModal && (
					<RescueTaskFormModal
						onSubmit={handleSubmit}
						onCancel={() => setShowModal(false)}
					/>
				)}
			</div>
		</ProtectedRoute>
	);
}
