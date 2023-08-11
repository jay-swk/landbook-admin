/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  images: {
    // loader: 'imgix',
    // path: 'http://localhost:3000',
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh'],
    // unoptimized: true,
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react']
  },
  // assetPrefix: 'http://localhost:3000',
  trailingSlash: true,
  exportTrailingSlash: true,
  output: 'export',
};

module.exports = nextConfig;