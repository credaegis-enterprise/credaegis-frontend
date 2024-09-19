/** @type {import('next').NextConfig} */

const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/login',
            permanent: true,
          },
        ]
      },
    async rewrites () {
        const baseUrl = process.env.NEXT_PUBLIC_devbackendurl;
        return [
            {
                source: '/api/:path*',
                destination: `${baseUrl}/:path*`,
            },
        ];
    },
    

    reactStrictMode: false,
};

export default nextConfig;
