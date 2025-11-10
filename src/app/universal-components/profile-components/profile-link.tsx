import Image, { StaticImageData } from 'next/image';

import '../../universal-styles/profile-components/profile-link.css';

type profileLinkProps = {
	linkIcon: string | StaticImageData;
	linkName: string;
	onClick: () => void;
};

export default function ProfileLink({
	linkIcon,
	linkName,
	onClick,
}: profileLinkProps) {
	return (
		<>
			<div className='profile-link'>
				<button onClick={onClick}>
					<Image
						src={linkIcon}
						alt=''
						width={20}
						height={20}
					/>
					<p>{linkName}</p>
				</button>
			</div>
		</>
	);
}
