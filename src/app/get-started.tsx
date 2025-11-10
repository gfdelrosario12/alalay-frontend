'use client';
import Link from 'next/link';

export default function GetStarted() {
	return (
		<div className='font-sans get-started-container flex flex-col w-full h-screen bg-gradient-to-b from-red-600 to-red-900'>
			<div className='h-full flex flex-col justify-between items-center text-[#fafafa] p-4'>
				<div className='h-[90%] flex flex-col justify-center items-center'>
					<h1 className='text-4xl font-bold mb-4'>Welcome to Alalay</h1>
					<p className='text-center mb-8'>
						Your safety companion. Connect with your community in a click.
					</p>
				</div>
				<Link
					href='/register'
					className='h-[10%] w-full'>
					<button className='w-full bg-[var(--color-white)] text-red-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition'>
						Get Started
					</button>
				</Link>
			</div>
		</div>
	);
}
