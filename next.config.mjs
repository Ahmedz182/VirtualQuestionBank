/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dgjwycw2u/**',  // Update the pathname to match your specific resource path
            },
        ],
    },
};

export default nextConfig;
