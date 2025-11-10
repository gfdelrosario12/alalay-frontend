'use client';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import '../../app/universal-styles/profile-header.css';

type ProfileHeaderProps = {
	role: string;
	username: string;
	city: string;
	residentId: string;
	rescuerId: string;
	image: string | StaticImageData;
};

export default function ProfileHeader({
	role,
	username,
	city,
	residentId,
	rescuerId,
	image,
}: ProfileHeaderProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [preview, setPreview] = useState<string | StaticImageData>(image);

	const id = role === 'rescuer' ? rescuerId : residentId;
	const label = role === 'rescuer' ? 'RID:' : 'UID:';

	// Handle file preview
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		}
	};

	return (
		<>
			{/* Profile Header */}
			<div className={`profile-header ${role}`}>
				<div className='header-title'>
					<h2>ALALAY</h2>
					<p>{role}</p>
				</div>

				{/* Profile Picture */}
				<div
					className='profile-picture cursor-pointer relative group'
					onClick={() => setIsModalOpen(true)}>
					<Image
						src={preview}
						alt='Profile Picture'
						width={110}
						height={110}
						className='rounded-full border-4 border-white object-cover shadow-md'
					/>
					<div className='absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
						<p className='text-white text-sm font-medium'>Change</p>
					</div>
				</div>

				{/* User Info */}
				<div className='user-information'>
					<h5>{username}</h5>
					<p>{city}</p>
				</div>

				{/* ID */}
				<div className='user-id'>
					<span>{label}</span>
					<p>{id}</p>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
					<div className='bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-lg'>
						<h3 className='text-lg font-semibold mb-3 text-center'>
							Change Profile Picture
						</h3>

						<div className='flex flex-col items-center space-y-4'>
							<Image
								src={preview}
								alt='Preview'
								width={120}
								height={120}
								className='rounded-full border-4 border-gray-300 object-cover shadow-sm'
							/>
							<input
								type='file'
								accept='image/*'
								onChange={handleFileChange}
								className='text-sm'
							/>
						</div>

						<div className='flex justify-end space-x-3 mt-5'>
							<button
								onClick={() => setIsModalOpen(false)}
								className='px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition'>
								Cancel
							</button>
							<button
								onClick={() => setIsModalOpen(false)}
								className='px-4 py-2 rounded-lg bg-[var(--color-main)] text-white hover:opacity-90 transition'>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
