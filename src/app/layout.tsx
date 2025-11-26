import './globals.css';
import ClientLayout from './client-layout';
import { ThemeProvider } from './ThemeProvider/ThemeProvider';
import { AuthProvider } from './context/auth'; // make sure path is correct

export const metadata = {
	title: 'Alalay',
	description: 'A calamity response AI application',
	manifest: '/manifest.json',
	icons: {
		icon: '/images/app-icon/alalay-icon-192x192.png',
		apple: '/images/app-icon/alalay-icon-192x192.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='manifest'
					href='/manifest.json'
				/>
				<meta
					name='theme-color'
					content='#2563eb'
				/>
				<link
					rel='apple-touch-icon'
					href='/icons/icon-192x192.png'
				/>
			</head>
			<body>
				<AuthProvider>
					<ThemeProvider>
						<ClientLayout>{children}</ClientLayout>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
