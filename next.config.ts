import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
	reactStrictMode: true, // Next.js config stays here
	// swcMinify is optional; minification is enabled by default
};

const pwaConfig = withPWA({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development',
});

export default pwaConfig(nextConfig);
