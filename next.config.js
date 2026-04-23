/**
 * Security headers are defined in `public/_headers` (Cloudflare Pages /
 * Netlify format) because `output: 'export'` produces a static build and
 * Next.js `headers()` is not applied to the exported files. Hosts that do
 * not read `_headers` must apply the same directives through their own
 * platform configuration before going live.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
