import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        // pathname: '/hotel_*', // optional: restrict to certain paths
      },
    ],
  },
};

export default nextConfig;
