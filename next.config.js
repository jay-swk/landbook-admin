/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
    },
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ['@tremor/react']
    },
    assetPrefix: 'http://localhost:3000',
  };
  
  module.exports = nextConfig;
  