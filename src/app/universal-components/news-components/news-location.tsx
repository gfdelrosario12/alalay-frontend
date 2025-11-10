import '../../universal-styles/news-components/news-location.css';
import Image from 'next/image';

type locationProps = {
	residentLocation: string;
};

export default function NewsLocation({ residentLocation }: locationProps) {
	return (
		<>
			<div className='location-container'>
				<Image
					src='/images/universal-icons/news-icons/location.png'
					alt='location.png'
					width={25}
					height={20}
				/>
				<div className='location-text'>
					<p>{residentLocation}</p>
				</div>
			</div>
		</>
	);
}
