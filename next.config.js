/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh'],
    // unoptimized: true,
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react']
  },
  trailingSlash: true,
  exportTrailingSlash: true,
  output: 'output',
};

module.exports = nextConfig;
