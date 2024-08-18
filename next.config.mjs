/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites () {
        const baseUrl = 'http://localhost:3001';
        return [
            {
                source: '/api/:path*',
                destination: `${baseUrl}/api/:path*`,
            },
        ];
    },
    reactStrictMode: false,
};

export default nextConfig;
