/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'cms.bibijaan.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
