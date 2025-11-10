import '../../rescuer-styles/maps/rescuer-map-confirm-status.css';

type RescuerMapConfirmStatusProps = {
	type: 'rescuing' | 'idle';
	onConfirm: () => void;
	onCancel: () => void;
};

export default function ResidentMapConfirmStatus({
	type,
	onConfirm,
	onCancel,
}: RescuerMapConfirmStatusProps) {
	const isRescuing = type === 'rescuing';

	return (
		<div className='modal'>
			<div className='modal-overlay'>
				<h2 className='modal-title'>
					{isRescuing
						? 'Are you sure you`re going on your rescue mission?'
						: 'Are you sure you`re done with the rescue mission?'}
				</h2>
				<p className='modal-description'>
					{isRescuing
						? 'You will be marked as on field'
						: 'You will be marked as off field, and keep monitoring the residents'}
				</p>

				<div className='modal-buttons'>
					<button
						onClick={onConfirm}
						className={`flex-1 py-2 rounded-lg font-medium transition ${
							isRescuing
								? 'bg-(--color-red)  text-(--color-white)'
								: 'bg-(--color-yellow) text-(--color-black)'
						}`}>
						{isRescuing ? 'Confirm On Field' : 'Confirm Idle'}
					</button>
					<button
						onClick={onCancel}
						className='modal-cancel-btn'>
						Go Back
					</button>
				</div>
			</div>
		</div>
	);
}
