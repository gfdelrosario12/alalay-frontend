'use client';

import { cloneElement, isValidElement, ReactElement } from 'react';

type ChildProps = {
	onSuccess?: () => void;
};

type EditModalFormProps = {
	isOpen: boolean;
	title: string;
	onClose: () => void;
	children: ReactElement<ChildProps>;
	onSuccess?: () => void;
};

export default function EditModalForm({
	isOpen,
	title,
	onClose,
	children,
	onSuccess,
}: EditModalFormProps) {
	if (!isOpen) return null;

	const handleSuccess = () => {
		if (onSuccess) {
			onSuccess();
		}
		onClose();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='bg-white rounded-2xl shadow-lg p-4 w-[90%] max-w-md max-h-[60vh] flex flex-col'>
				<div className='flex justify-between items-center mb-3'>
					<h2 className='text-lg font-semibold'>{title}</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700 text-xl leading-none'>
						×
					</button>
				</div>
				<div style={{ overflowY: 'auto', flex: 1 }}>
					{isValidElement(children)
						? cloneElement(children, { onSuccess: handleSuccess })
						: children}
				</div>
			</div>
		</div>
	);
}