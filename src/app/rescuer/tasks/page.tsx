'use client';

import '../../rescuer-styles/people/rescuer-people.css';
import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import TaskCard from '../../rescuer-components/tasks/task-card';

interface Task {
	id: string;
	taskName: string;
	taskLocation: string;
	taskDate: string;
	taskTime: string;
	taskStatus: 'New' | 'In Progress' | 'Completed';
}

export default function RescuerTasks() {
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: '1',
			taskName: 'Check resident at Brgy. Kalipi',
			taskLocation: '123 Emilio St., Brgy. Kalipi, Quezon City',
			taskDate: 'December 25, 2025',
			taskTime: '11:00 AM',
			taskStatus: 'New',
		},
		{
			id: '2',
			taskName: 'Deliver relief supplies',
			taskLocation: '456 Rizal St., Brgy. Kalipi, Quezon City',
			taskDate: 'December 25, 2025',
			taskTime: '01:00 PM',
			taskStatus: 'New',
		},
		{
			id: '3',
			taskName: 'Assist evacuation',
			taskLocation: '789 Bonifacio Ave., Brgy. Kalipi, Quezon City',
			taskDate: 'December 24, 2025',
			taskTime: '09:30 AM',
			taskStatus: 'In Progress',
		},
	]);

	// Handle status changes and move completed tasks to bottom
	const handleStatusChange = (
		id: string,
		newStatus: 'In Progress' | 'Completed'
	) => {
		setTasks((prevTasks) => {
			const updatedTasks = prevTasks.map((task) =>
				task.id === id ? { ...task, taskStatus: newStatus } : task
			);
			// Sort: Completed tasks at bottom
			updatedTasks.sort((a, b) =>
				a.taskStatus === 'Completed' ? 1 : b.taskStatus === 'Completed' ? -1 : 0
			);
			return updatedTasks;
		});
	};

	return (
		<>
			{/* Header for the Tasks Page */}
			<Header
				title='Tasks'
				subtitle='Check your assigned tasks'
				date='December 25, 2025'
				time='10:30 AM'
				image='/images/header-icon.jpg'
			/>
			<div className='rescuer-people-container'>
				<div className='rescuer-people-link'>
					<Link
						href=''
						className='refresh'>
						<p>Refresh</p>
						<Image
							src='/images/universal-icons/refresh.png'
							alt='refresh'
							width={20}
							height={20}
						/>
					</Link>
				</div>

				<div className='rescuer-people-cards'>
					{tasks.map((task) => (
						<TaskCard
							key={task.id}
							{...task}
							onStatusChange={handleStatusChange}
						/>
					))}
				</div>

				<AlalayNavigation role='rescuer' />
			</div>
		</>
	);
}
