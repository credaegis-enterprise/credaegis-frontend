/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites () {
        const baseUrl = process.env.NEXT_PUBLIC_backendurl;
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
