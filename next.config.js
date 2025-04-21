const withNextIntl = require('next-intl/plugin')(
  // Specify the path to your i18n configuration
  './app/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any other next config here
};

module.exports = withNextIntl(nextConfig); 