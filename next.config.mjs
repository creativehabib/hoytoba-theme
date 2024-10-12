/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'cms.bibijaan.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'storage.hoytoba.com', // Add your new hostname here
                port: '',
                pathname: '/**'
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
