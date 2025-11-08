import Image from 'next/image';
import { StaticImageData } from 'next/image';
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
	const id = role === 'rescuer' ? rescuerId : residentId;
	const label = role === 'rescuer' ? 'RID:' : 'UID:';

	return (
		<>
			<div className={`profile-header ${role}`}>
				<div className='header-title'>
					<h2>ALALAY</h2>
					<p>{role}</p>
				</div>
				<div className='profile-picture'>
					<Image
						src={image}
						alt='Profile Picture'
						width={100}
						height={100}
					/>
				</div>
				<div className='user-information'>
					<h5>{username}</h5>
					<p>{city}</p>
				</div>
				<div className='user-id'>
					{' '}
					<span>{label}</span>
					<p>{id}</p>
				</div>
			</div>
		</>
	);
}
