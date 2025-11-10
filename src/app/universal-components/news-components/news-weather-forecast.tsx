import '../../universal-styles/news-components/news-weather-forecast.css';
import Image, { StaticImageData } from 'next/image';

type forecastProps = {
	forecastImage: string | StaticImageData;
	forecastTime: string;
	forecastTemperature: string;
};

export default function NewsWeatherForecast({
	forecastImage,
	forecastTime,
	forecastTemperature,
}: forecastProps) {
	return (
		<>
			<div className='weather-forecast-card'>
				<div className='forecast-image'>
					<Image
						src={forecastImage}
						alt='${forecastImage}.png'
						width={50}
						height={50}
					/>
				</div>
				<div className='forecast-description'>
					<span>{forecastTime}</span>
					<p>{forecastTemperature}</p>
				</div>
			</div>
		</>
	);
}
