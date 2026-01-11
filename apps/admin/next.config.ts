import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/utils', '@repo/types', '@repo/exception'],
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
      {
        protocol: 'https',
        hostname: 'image.greating.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'static.imkdw.dev',
      },
    ],
  },
};

export default nextConfig;
