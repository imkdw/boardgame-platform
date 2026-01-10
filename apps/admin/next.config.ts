import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  turbopack:
    process.env.NODE_ENV === 'development'
      ? {
          root: path.join(__dirname, '../..'),
        }
      : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'cdnfile.koreaboardgames.com',
      },
    ],
  },
};

export default nextConfig;
