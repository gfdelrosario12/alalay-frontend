'use client';

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { useState, useEffect } from 'react';

L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const createIcon = (color: string) =>
	new L.Icon({
		iconUrl:
			color === 'green'
				? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
				: color === 'yellow'
				? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png'
				: color === 'red'
				? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
				: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
		shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
		iconSize: [32, 48],
		iconAnchor: [16, 48],
		popupAnchor: [0, -48],
	});

interface Friend {
	residentName: string;
	residentStatus: 'safe' | 'monitoring' | 'unsafe';
	residentLocation: LatLngExpression;
}

export default function MapComponent() {
	const [position, setPosition] = useState<LatLngExpression | null>(null);
	const [permissionDenied, setPermissionDenied] = useState(false);
	const [loading, setLoading] = useState(true);

	const friends: Friend[] = [
		{
			residentName: 'Luke Chiang',
			residentStatus: 'safe',
			residentLocation: [14.6538, 121.0687],
		}, // near UP Diliman
		{
			residentName: 'Nicole Zefanya',
			residentStatus: 'monitoring',
			residentLocation: [14.6488, 121.0737],
		}, // near Philcoa
		{
			residentName: 'Jeff Bernat',
			residentStatus: 'unsafe',
			residentLocation: [14.6361, 121.0583],
		}, // near Cubao
	];

	useEffect(() => {
		// Add async boundary
		const fetchLocation = async () => {
			if (!navigator.geolocation) {
				setPermissionDenied(true);
				setLoading(false);
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(pos) => {
					setPosition([pos.coords.latitude, pos.coords.longitude]);
					setPermissionDenied(false);
					setLoading(false);
				},
				(err) => {
					console.warn('Geolocation failed:', err.message);
					setPermissionDenied(true);
					setLoading(false);
				}
			);
		};

		// Defer call to avoid sync state updates during render
		setTimeout(fetchLocation, 0);
	}, []);

	const retryLocation = () => {
		setLoading(true);
		setPermissionDenied(false);
		setTimeout(() => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(pos) => {
						setPosition([pos.coords.latitude, pos.coords.longitude]);
						setPermissionDenied(false);
						setLoading(false);
					},
					() => {
						setPermissionDenied(true);
						setLoading(false);
					}
				);
			}
		}, 0);
	};

	if (loading)
		return (
			<div className='h-[72vh] fixed top-[18vh] left-0 w-full text-center mt-10'>
				<p className='text-center mt-6 text-gray-700'>Requesting location...</p>
			</div>
		);

	if (permissionDenied)
		return (
			<div className='h-[72vh] fixed top-[18vh] left-0 w-full text-center mt-10'>
				<p className='text-gray-700 mb-4'>
					⚠️ Location access denied or unavailable.
				</p>
				<button
					onClick={retryLocation}
					className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
					Allow Location Access
				</button>
			</div>
		);

	const mapCenter = position || [14.5995, 120.9842]; // fallback: Manila

	return (
		<div className='h-[72vh] fixed top-[18vh] left-0 w-full z-0 mb-[-5vh]'>
			<MapContainer
				center={mapCenter}
				zoom={14}
				className='h-full w-full'>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
				/>

				<Marker position={mapCenter}>
					<Popup>
						📍 {position ? 'You are here!' : 'Default location: Manila'}
					</Popup>
				</Marker>

				{friends.map((friend, idx) => {
					const color =
						friend.residentStatus === 'safe'
							? 'green'
							: friend.residentStatus === 'monitoring'
							? 'yellow'
							: 'red';
					return (
						<Marker
							key={idx}
							position={friend.residentLocation}
							icon={createIcon(color)}>
							<Popup>
								<b>{friend.residentName}</b> —{' '}
								{friend.residentStatus.toUpperCase()}
							</Popup>
							<Tooltip
								direction='top'
								offset={[0, -40]}
								permanent>
								{friend.residentName}
							</Tooltip>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}
