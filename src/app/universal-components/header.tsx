import Image from 'next/image';
import { StaticImageData } from 'next/image';
import '../universal-styles/header.css';

type HeaderProps = {
	title: string;
	subtitle: string;
	date: string;
	time: string;
	image: string | StaticImageData;
};

export default function Header({
	title,
	subtitle,
	date,
	time,
	image,
}: HeaderProps) {
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
