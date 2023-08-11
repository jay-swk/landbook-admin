/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh'],
    loader: "custom",
    loaderFile: './loader.js',
    // unoptimized: true,
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react']
  },
  // assetPrefix: 'http://localhost:3000',
  trailingSlash: true,
  exportTrailingSlash: true,
  // output: 'export',
};

module.exports = nextConfig;