'use client';
import { useState } from 'react';
import Image from 'next/image';
import '../../universal-styles/news-components/news-monitoring.css';

type NewsCardProps = {
	title: string;
	timestamp: string;
	description: string;
	details: string;
	iconSrc: string;
};

export default function NewsMonitoringCard({
	title,
	timestamp,
	description,
	details,
	iconSrc,
}: NewsCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleAdditionalInfo = () => setIsExpanded(!isExpanded);

	return (
		<div className='monitoring-card'>
			<div className='monitoring-header'>
				<div className='header-text'>
					<h5>{title}</h5>
					<p className='timestamp'>{timestamp}</p>
				</div>
				<div className='header-status'>
					<Image
						src={iconSrc}
						alt={`${title}-status`}
						width={30}
						height={30}
					/>
				</div>
			</div>

			<div className='monitoring-description'>
				<p>{description}</p>
				<button
					onClick={toggleAdditionalInfo}
					className='view-more-btn text-blue-600 font-medium mt-1 hover:underline transition'>
					{isExpanded ? 'Hide additional information' : 'View more information'}
				</button>
			</div>

			<div
				className={`monitoring-add-information overflow-hidden transition-all duration-300 ${
					isExpanded ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
				}`}>
				<p>{details}</p>
			</div>
		</div>
	);
}
