import '../../resident-styles/resident-map.css';
import ResidentHeader from '../../resident-components/resident-header';
import ResidentNavigation from '../../resident-components/resident-navigation';

export default function ResidentNews() {
	return (
		<>
			<div className='resident-news-container'>
				{/* Header for the News */}
				<ResidentHeader
					title='Current Happenings'	
					subtitle="See what's going on in your community"
					date='December 25, 2025'
					time='10:30 AM'
					image='/images/header-icon.jpg'
				/>
				{/* Placeholder for now */}
				<div className='map'>This is the news</div>
				{/* Navigation Bar */}
				<ResidentNavigation />
			</div>
		</>
	);
}
