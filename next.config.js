const withNextIntl = require('next-intl/plugin')(
  // Specify the path to your i18n configuration
  './app/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any other next config here
  output: 'export',
  // Disable image optimization since it requires server components
  images: {
    unoptimized: true,
  },
  // Set the base path if your site is not hosted at the root
  // basePath: '',
  // This ensures links work correctly in static export
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withNextIntl(nextConfig); 