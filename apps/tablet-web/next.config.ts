import type { NextConfig } from 'next';
import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/i18n'],
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
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
    ],
  },
};

export default withNextIntl(nextConfig);
