import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
  },
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com/**')],
  },
};

export default nextConfig;
