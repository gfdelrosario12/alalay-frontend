import NewsLocation from '@/app/universal-components/news-components/news-location';
import Header from '../../universal-components/header';
import AlalayNavigation from '../../universal-components/alalay-navigation';
import '../../resident-styles/news/resident-news.css';
import NewsWeatherForecast from '@/app/universal-components/news-components/news-weather-forecast';
import NewsMonitoringCard from '@/app/universal-components/news-components/news-monitoring';
import ProtectedRoute from '@/app/universal-components/protected-route';

export default function RescuerNews() {
	return (
		<>
			<ProtectedRoute roles={['RESIDENT']}>
				{/* Header for the News */}
				<Header
					title='Current Happenings'
					subtitle="See what's going on in your community"
					date='December 25, 2025'
					time='10:30 AM'
					image='/images/header-icon.jpg'
				/>
				<div className='resident-news-container'>
					{/* Display the current location of the user */}
					<div className='top-part'>
						<div className='news-location'>
							<NewsLocation residentLocation='Quezon City, Philippines' />
						</div>
						<div className='hourly-forecast'>
							<div className='header'>
								<p>Hourly Forecast</p>
							</div>
							<div className='forecast-container'>
								<NewsWeatherForecast
									forecastImage='/images/universal-icons/forecast-icons/sunny.png'
									forecastTime='Now'
									forecastTemperature='30℃'
								/>
								<NewsWeatherForecast
									forecastImage='/images/universal-icons/forecast-icons/sunny.png'
									forecastTime='Now'
									forecastTemperature='30℃'
								/>
								<NewsWeatherForecast
									forecastImage='/images/universal-icons/forecast-icons/sunny.png'
									forecastTime='Now'
									forecastTemperature='30℃'
								/>
								<NewsWeatherForecast
									forecastImage='/images/universal-icons/forecast-icons/sunny.png'
									forecastTime='Now'
									forecastTemperature='30℃'
								/>
								<NewsWeatherForecast
									forecastImage='/images/universal-icons/forecast-icons/sunny.png'
									forecastTime='Now'
									forecastTemperature='30℃'
								/>
							</div>
						</div>
					</div>
					<div className='news-monitoring'>
						<div className='header'>
							<p>News Monitoring</p>
						</div>
						<div className='monitoring-container'>
							<NewsMonitoringCard
								title='Typhoon Niki'
								timestamp='Updated 2:45 PM, October 28, 2025'
								description='A strong tropical cyclone is moving towards the northern islands with heavy rain expected.'
								details='Typhoon Niki continues to intensify as it moves northwest at 15 km/h. Local authorities advise residents in coastal areas to prepare for possible evacuations and monitor further updates.'
								iconSrc='/images/universal-icons/monitoring-icons/monitoring.png'
							/>

							<NewsMonitoringCard
								title='Earthquake Alert'
								timestamp='Updated 10:30 AM, October 27, 2025'
								description='A magnitude 6.2 earthquake was recorded off the coast earlier today.'
								details='No tsunami warning was issued, but aftershocks are expected in the coming hours. Residents are reminded to stay alert and secure heavy furniture in their homes.'
								iconSrc='/images/universal-icons/monitoring-icons/critical.png'
							/>
						</div>
					</div>
				</div>
				{/* Navigation Bar */}
				<AlalayNavigation role='RESIDENT' />
			</ProtectedRoute>
		</>
	);
}
