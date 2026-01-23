import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    // Allow high quality for hero images
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
