/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: '.',
  },
};

module.exports = nextConfig;
