import Image from 'next/image';
import { StaticImageData } from 'next/image';
import '../resident-styles/resident-header.css';

type ResidentHeaderProps = {
	title: string;
	subtitle: string;
	date: string;
	time: string;
	image: string | StaticImageData;
};

export default function ResidentHeader({
	title,
	subtitle,
	date,
	time,
	image,
}: ResidentHeaderProps) {
	return (
		<>
			<div className='header-container'>
				<div className='header-text'>
					<div className='upper'>
						<h2>{title}</h2>
						<p>{subtitle}</p>
					</div>
					<div className='date'>
						<span>{date}</span>
						<span>{time}</span>
					</div>
				</div>
				<div className='header-icon'>
					<Image
						src={image}
						alt={title}
						width={60}
						height={60}
					/>
				</div>
			</div>
		</>
	);
}
