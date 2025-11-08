import '../../resident-styles/maps/resident-map-confirm-status.css';

type ResidentMapConfirmStatusProps = {
	type: 'safe' | 'help';
	onConfirm: () => void;
	onCancel: () => void;
};

export default function ResidentMapConfirmStatus({
	type,
	onConfirm,
	onCancel,
}: ResidentMapConfirmStatusProps) {
	const isSafe = type === 'safe';

	return (
		<div className='modal'>
			<div className='modal-overlay'>
				<h2 className='modal-title'>
					{isSafe ? 'Are you sure you`re safe?' : 'Are you sure you need help?'}
				</h2>
				<p className='modal-description'>
					{isSafe
						? 'If you mark yourself as safe, authorities and your loved ones will be notified of your status.'
						: 'If you mark yourself as needing help, rescue authorities will be alerted to your location.'}
				</p>

				<div className='modal-buttons'>
					<button
						onClick={onConfirm}
						className={`flex-1 py-2 rounded-lg text-(--color-white) font-medium transition ${
							isSafe
								? 'bg-(--color-green) hover:bg-green-600'
								: 'bg-(--color-red) hover:bg-red-600'
						}`}>
						{isSafe ? 'Yes, I’m safe' : 'Yes, I need help'}
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
