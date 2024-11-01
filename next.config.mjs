/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, 
    images: {
      domains: ['matpetfamily.com'],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'matpetfamily.com',
          pathname: '**',
        },
      ],
    },
};



export default nextConfig;
