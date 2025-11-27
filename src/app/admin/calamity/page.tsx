'use client';

import { useEffect, useState } from 'react';

const GRAPHQL_ENDPOINT = 'http://localhost:8080/graphql';

export type Calamity = {
	id: string;
	description: string;
	status: string;
	startDate: string;
	calamityCategory: string;
	affectedAreasWKT?: string;
};

type AreaInputMode = 'text' | 'coordinates' | 'radius';

export default function CalamityPage() {
	const [calamities, setCalamities] = useState<Calamity[]>([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [areaInputMode, setAreaInputMode] = useState<AreaInputMode>('radius');
	const [form, setForm] = useState({
		startDate: '',
		description: '',
		calamityCategory: '',
		affectedAreasWKT: '',
	});

	const [coordinates, setCoordinates] = useState({
		lat1: '',
		lon1: '',
		lat2: '',
		lon2: '',
		lat3: '',
		lon3: '',
		lat4: '',
		lon4: '',
	});

	const [radiusInput, setRadiusInput] = useState({
		centerLat: '',
		centerLon: '',
		radiusKm: '',
		points: '12',
	});

	const [areaText, setAreaText] = useState('');

	const fetchCalamities = async () => {
		const query = `query { getCalamities { id description status startDate calamityCategory affectedAreasWKT } }`;
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query }),
		});
		const data = await res.json();
		setCalamities(data.data?.getCalamities || []);
		setLoading(false);
	};

	useEffect(() => {
		fetchCalamities();
	}, []);

	// Convert datetime-local to ISO-8601 format that backend expects
	const convertToISO8601 = (datetimeLocal: string): string => {
		if (!datetimeLocal) return '';
		// datetime-local format: "2025-11-28T01:00"
		// Backend expects: "2025-11-28T01:00:00Z"
		const date = new Date(datetimeLocal);
		return date.toISOString();
	};

	const radiusToPolygon = (lat: number, lon: number, radiusKm: number, numPoints: number): string => {
		const points: string[] = [];
		const earthRadius = 6371;

		for (let i = 0; i <= numPoints; i++) {
			const angle = (i * 360) / numPoints;
			const rad = (angle * Math.PI) / 180;

			const latOffset = (radiusKm / earthRadius) * (180 / Math.PI);
			const lonOffset = (radiusKm / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);

			const newLat = lat + latOffset * Math.cos(rad);
			const newLon = lon + lonOffset * Math.sin(rad);

			points.push(`${newLon.toFixed(5)} ${newLat.toFixed(5)}`);
		}

		return `POLYGON((${points.join(', ')}))`;
	};

	const isValidWKT = (wkt: string) => {
		// Simple check for POLYGON WKT (for demo, not full validation)
		return /^POLYGON\(\([\d.\s,-]+\)\)$/.test(wkt.trim());
	};

	const generateWKT = (): string => {
		if (areaInputMode === 'coordinates') {
			const { lat1, lon1, lat2, lon2, lat3, lon3, lat4, lon4 } = coordinates;
			if (lat1 && lon1 && lat2 && lon2 && lat3 && lon3 && lat4 && lon4) {
				return `POLYGON((${lon1} ${lat1}, ${lon2} ${lat2}, ${lon3} ${lat3}, ${lon4} ${lat4}, ${lon1} ${lat1}))`;
			}
		} else if (areaInputMode === 'radius') {
			const { centerLat, centerLon, radiusKm } = radiusInput;
			if (centerLat && centerLon && radiusKm) {
				return radiusToPolygon(
					parseFloat(centerLat),
					parseFloat(centerLon),
					parseFloat(radiusKm),
					12
				);
			}
		} else if (areaInputMode === 'text') {
			// For text input, create a simple point at Manila coordinates
			return areaText ? `POINT(120.9842 14.5995)` : '';
		}
		return '';
	};

	// Transformer: user input (string or array) to WKT POLYGON
	function toWktPolygon(input: string | Array<{ lat: number; lng: number }>): string | null {
		let coords: string[] = [];
		if (typeof input === 'string') {
			// Accepts: "lat,lng; lat,lng; ..." or "lng lat, lng lat, ..."
			const pairs = input.split(';').map(s => s.trim()).filter(Boolean);
			for (let pair of pairs) {
				let [a, b] = pair.split(',').map(Number);
				if (isNaN(a) || isNaN(b)) return null;
				// Assume user enters lat,lng, convert to lng lat for WKT
				coords.push(`${b} ${a}`);
			}
		} else if (Array.isArray(input)) {
			for (let { lat, lng } of input) {
				coords.push(`${lng} ${lat}`);
			}
		}
		if (coords.length < 3) return null;
		// Ensure polygon is closed
		if (coords[0] !== coords[coords.length - 1]) coords.push(coords[0]);
		return `POLYGON((${coords.join(', ')}))`;
	}

	const handleCreate = async (e: React.FormEvent) => {
		e.preventDefault();
		let affectedAreasWKT = form.affectedAreasWKT;
		if (affectedAreasWKT) {
			const wkt = toWktPolygon(affectedAreasWKT);
			if (!wkt) {
				alert('Invalid coordinates. Enter as "lat,lng; lat,lng; ..." or use at least 3 points.');
				return;
			}
			affectedAreasWKT = wkt;
		} else {
			affectedAreasWKT = '';
		}
		const mutation = `mutation ($input: CreateCalamityInput!) { createCalamity(input: $input) { id startDate description calamityCategory reportedEndDate affectedAreasWKT status createdAt } }`;
		const variables = { input: { ...form, affectedAreasWKT, reportedEndDate: null, status: 'STARTED' } };
		console.log('Sending calamity create to DB:', variables);
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: mutation, variables }),
		});
		const data = await res.json();
		console.log('Create calamity response:', data);
		setShowModal(false);
		setForm({ startDate: '', description: '', calamityCategory: '', affectedAreasWKT: '' });
		await fetchCalamities();
	};

	const handleUndeclare = async (calamity: Calamity) => {
		console.log('handleUndeclare called for calamity:', calamity);
		const mutation = `mutation UpdateCalamity($input: UpdateCalamityInput!) { updateCalamity(input: $input) { id status reportedEndDate } }`;
		const input: any = {
			id: calamity.id,
			startDate: calamity.startDate,
			description: calamity.description,
			calamityCategory: calamity.calamityCategory,
			reportedEndDate: new Date().toISOString(),
			status: 'DONE',
		};
		if (calamity.affectedAreasWKT) {
			input.affectedAreasWKT = calamity.affectedAreasWKT;
		}
		const variables = { input };
		console.log('Sending calamity undeclare to DB:', variables);
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: mutation, variables }),
		});
		const data = await res.json();
		console.log('Undeclare calamity response:', data);
		await fetchCalamities();
	};

	if (loading) return <div className="flex items-center justify-center min-h-screen">Loading calamities...</div>;

	return (
		<div className='p-4 max-w-7xl mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>Calamity Management</h1>
			<p className='mb-4 text-gray-700'>Hover on the <span className='underline font-semibold'>status</span> value if calamity is STARTED to UNDECLARE.</p>
			<button
				onClick={() => setShowModal(true)}
				className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4'>
				Add Calamity
			</button>
			<div className="overflow-x-auto">
				<table className='min-w-full bg-white rounded shadow'>
					<thead>
						<tr>
							<th className='px-4 py-2 text-center'>#</th>
							<th className='px-4 py-2 text-center'>Category</th>
							<th className='px-4 py-2 text-center'>Description</th>
							<th className='px-4 py-2 text-center'>Start Date</th>
							<th className='px-4 py-2 text-center'>Status</th>
						</tr>
					</thead>
					<tbody>
						{calamities.map((c, idx) => (
							<tr key={c.id} className='group relative hover:bg-gray-50'>
								<td className='px-4 py-2 text-center'>{idx + 1}</td>
								<td className='px-4 py-2 text-center'>{c.calamityCategory}</td>
								<td className='px-4 py-2 text-center'>{c.description}</td>
								<td className='px-4 py-2 text-center'>
									{c.startDate
										? new Date(c.startDate).toLocaleDateString(undefined, {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})
										: ''}
								</td>
								<td className={`px-4 py-2 text-center group relative ${c.status === 'STARTED' ? 'underline text-red-700 font-semibold cursor-pointer' : ''}`}>
									{c.status === 'STARTED' ? (
										<div className='flex items-center justify-center'>
											<span>{c.status}</span>
											<div className='relative ml-2'>
												<button
													onClick={() => { console.log('Undeclare button clicked for calamity:', c); handleUndeclare(c); }}
													className='bg-yellow-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-yellow-700 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-auto z-10 relative'
													aria-label='Undeclare calamity'
												>
													{/* X icon */}
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
														<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
													</svg>
													{/* Tooltip */}
													<span className='absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap'>Undeclare calamity</span>
												</button>
											</div>
										</div>
									) : c.status === 'DONE' ? (
										<span className='text-gray-700 font-semibold'>DONE</span>
									) : (
										<span>{c.status}</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{showModal && (
				<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
					<div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
						<h2 className='text-xl font-semibold mb-4'>Add Calamity</h2>
						<div className='flex flex-col gap-4'>
							<label className='flex flex-col'>
								<span className="font-medium mb-1">Start Date *</span>
								<input
									type='datetime-local'
									name='startDate'
									value={form.startDate}
									onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
									className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
									required
								/>
								<span className="text-xs text-gray-500 mt-1">Local time will be converted to UTC</span>
							</label>

							<label className='flex flex-col'>
								<span className="font-medium mb-1">Description *</span>
								<input
									type='text'
									name='description'
									value={form.description}
									onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
									className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
									placeholder="e.g., Heavy flooding in downtown area"
									required
								/>
							</label>

							<label className='flex flex-col'>
								<span className="font-medium mb-1">Category *</span>
								<input
									type='text'
									name='calamityCategory'
									value={form.calamityCategory}
									onChange={(e) => setForm((f) => ({ ...f, calamityCategory: e.target.value }))}
									className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
									placeholder="e.g., Flood, Earthquake, Typhoon"
									required
								/>
							</label>

							<label className='flex flex-col'>
								<span>Affected Areas (Coordinates)</span>
								<input
									type='text'
									name='affectedAreasWKT'
									value={form.affectedAreasWKT}
									onChange={(e) => setForm((f) => ({ ...f, affectedAreasWKT: e.target.value }))}
									className='border p-2 rounded'
									placeholder='lat,lng; lat,lng; ... (at least 3, will auto-close)'
								/>
								<span className='text-xs text-gray-500 mt-1'>Enter coordinates as: lat,lng; lat,lng; ... (at least 3 points, will auto-close). Example: 14.60,120.98; 14.60,120.99; 14.61,120.99</span>
							</label>

							<div className='flex flex-col'>
								<span className="font-medium mb-2">Affected Areas</span>

								<div className='flex gap-2 mb-3'>
									<button
										type='button'
										onClick={() => setAreaInputMode('text')}
										className={`px-3 py-1 rounded text-sm ${areaInputMode === 'text' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
									>
										Area Names
									</button>
									<button
										type='button'
										onClick={() => setAreaInputMode('radius')}
										className={`px-3 py-1 rounded text-sm ${areaInputMode === 'radius' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
									>
										Radius (Circle)
									</button>
									<button
										type='button'
										onClick={() => setAreaInputMode('coordinates')}
										className={`px-3 py-1 rounded text-sm ${areaInputMode === 'coordinates' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
									>
										Coordinates
									</button>
								</div>

								{areaInputMode === 'text' && (
									<div className="bg-gray-50 p-3 rounded">
										<label className='flex flex-col'>
											<span className="text-sm mb-1">Enter affected areas (comma-separated)</span>
											<input
												type='text'
												value={areaText}
												onChange={(e) => setAreaText(e.target.value)}
												className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
												placeholder="e.g., Manila, Quezon City, Makati"
											/>
											<span className="text-xs text-gray-500 mt-1">This will be stored as reference text</span>
										</label>
									</div>
								)}

								{areaInputMode === 'radius' && (
									<div className="bg-gray-50 p-3 rounded space-y-2">
										<p className="text-sm text-gray-600 mb-2">Define a circular area by center point and radius</p>
										<div className="grid grid-cols-2 gap-2">
											<label className='flex flex-col'>
												<span className="text-sm mb-1">Center Latitude</span>
												<input
													type='number'
													step='0.000001'
													value={radiusInput.centerLat}
													onChange={(e) => setRadiusInput(r => ({ ...r, centerLat: e.target.value }))}
													className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
													placeholder="14.5995"
												/>
											</label>
											<label className='flex flex-col'>
												<span className="text-sm mb-1">Center Longitude</span>
												<input
													type='number'
													step='0.000001'
													value={radiusInput.centerLon}
													onChange={(e) => setRadiusInput(r => ({ ...r, centerLon: e.target.value }))}
													className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
													placeholder="120.9842"
												/>
											</label>
										</div>
										<label className='flex flex-col'>
											<span className="text-sm mb-1">Radius (kilometers)</span>
											<input
												type='number'
												step='0.1'
												value={radiusInput.radiusKm}
												onChange={(e) => setRadiusInput(r => ({ ...r, radiusKm: e.target.value }))}
												className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
												placeholder="5"
											/>
										</label>
										<span className="text-xs text-gray-500">Example: Manila center is approximately 14.5995, 120.9842</span>
									</div>
								)}

								{areaInputMode === 'coordinates' && (
									<div className="bg-gray-50 p-3 rounded space-y-2">
										<p className="text-sm text-gray-600 mb-2">Define a rectangular area using 4 corner points</p>
										{[1, 2, 3, 4].map(num => (
											<div key={num} className="grid grid-cols-2 gap-2">
												<label className='flex flex-col'>
													<span className="text-sm mb-1">Point {num} Latitude</span>
													<input
														type='number'
														step='0.000001'
														value={coordinates[`lat${num}` as keyof typeof coordinates]}
														onChange={(e) => setCoordinates(c => ({ ...c, [`lat${num}`]: e.target.value }))}
														className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
														placeholder="14.60"
													/>
												</label>
												<label className='flex flex-col'>
													<span className="text-sm mb-1">Point {num} Longitude</span>
													<input
														type='number'
														step='0.000001'
														value={coordinates[`lon${num}` as keyof typeof coordinates]}
														onChange={(e) => setCoordinates(c => ({ ...c, [`lon${num}`]: e.target.value }))}
														className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
														placeholder="120.98"
													/>
												</label>
											</div>
										))}
										<span className="text-xs text-gray-500">Enter coordinates clockwise starting from any corner</span>
									</div>
								)}
							</div>

							<div className='flex justify-end gap-2 mt-4'>
								<button
									type='button'
									onClick={() => {
										setShowModal(false);
										setForm({ startDate: '', description: '', calamityCategory: '', affectedAreasWKT: '' });
										setCoordinates({ lat1: '', lon1: '', lat2: '', lon2: '', lat3: '', lon3: '', lat4: '', lon4: '' });
										setRadiusInput({ centerLat: '', centerLon: '', radiusKm: '', points: '12' });
										setAreaText('');
									}}
									className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'>
									Cancel
								</button>
								<button
									type='button'
									onClick={handleCreate}
									className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'>
									Add Calamity
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}