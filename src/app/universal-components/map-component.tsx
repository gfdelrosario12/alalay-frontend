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

export interface Resident {
	residentName: string;
	residentStatus: 'safe' | 'monitoring' | 'unsafe';
	residentLocation: LatLngExpression;
}

export interface MapComponentProps {
	role: 'RESIDENT' | 'RESCUER';
	currentLocation?: { lat: number; lng: number } | null;
	friends?: Resident[];
}

export default function MapComponent({
	role,
	currentLocation,
	friends = [],
}: MapComponentProps) {
	const [position, setPosition] = useState<LatLngExpression | null>(null);
	const [permissionDenied, setPermissionDenied] = useState(false);
	const [loading, setLoading] = useState(true);

	// Hardcoded sample data
	const allResidents: Resident[] = [
		{
			residentName: 'Luke Chiang',
			residentStatus: 'safe',
			residentLocation: [14.6538, 121.0687],
		},
		{
			residentName: 'Nicole Zefanya',
			residentStatus: 'monitoring',
			residentLocation: [14.6488, 121.0737],
		},
		{
			residentName: 'Jeff Bernat',
			residentStatus: 'unsafe',
			residentLocation: [14.6361, 121.0583],
		},
		{
			residentName: 'Anna Smith',
			residentStatus: 'safe',
			residentLocation: [14.64, 121.05],
		},
	];

	useEffect(() => {
		if (currentLocation) {
			setPosition([currentLocation.lat, currentLocation.lng]);
			setPermissionDenied(false);
			setLoading(false);
			return;
		}
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

		setTimeout(fetchLocation, 0);
	}, [currentLocation]);

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

	const mapCenter: [number, number] = position
		? (position as [number, number])
		: [14.5995, 120.9842]; // fallback: Manila
	const markers = role === 'RESCUER' ? allResidents : friends.length > 0 ? friends : [];

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

				{markers.map((resident, idx) => {
					const color =
						resident.residentStatus === 'safe'
							? 'green'
							: resident.residentStatus === 'monitoring'
							? 'yellow'
							: 'red';
					return (
						<Marker
							key={idx}
							position={resident.residentLocation}
							icon={createIcon(color)}>
							<Popup>
								<b>{resident.residentName}</b> —{' '}
								{resident.residentStatus.toUpperCase()}
							</Popup>
							<Tooltip
								direction='top'
								offset={[0, -40]}
								permanent>
								{resident.residentName}
							</Tooltip>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}
