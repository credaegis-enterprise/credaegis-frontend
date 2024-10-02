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
    
    images: {
    
      remotePatterns: [
        {
          hostname: 'localhost',
        }
      ],
  },
    

    reactStrictMode: false,
};

export default nextConfig;
