/** @type {import('next').NextConfig} */
// Where the Express backend lives (no trailing /api). Used to proxy /uploads/*.
// Set API_BASE_URL (or NEXT_PUBLIC_API_BASE_URL) when building for production.
const apiBaseUrl =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
const backendOrigin = (process.env.BACKEND_ORIGIN || apiBaseUrl.replace(/\/api\/?$/, '')).replace(/\/+$/, '');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Serve uploaded images from the website's own domain.
  async rewrites() {
    return [{ source: '/uploads/:path*', destination: `${backendOrigin}/uploads/:path*` }];
  },

  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/product/aac-blocks', destination: '/community', permanent: true },
      { source: '/product/aac-panels', destination: '/community', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
