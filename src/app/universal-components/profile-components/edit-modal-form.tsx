'use client';

type EditModalFormProps = {
	isOpen: boolean;
	title: string;
	onClose: () => void;
	children: React.ReactNode;
};

export default function EditModalForm({
	isOpen,
	title,
	onClose,
	children,
}: EditModalFormProps) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-lg font-semibold'>{title}</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700 text-xl leading-none'>
						×
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}
