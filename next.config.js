const withNextIntl = require('next-intl/plugin')(
  './app/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
};

module.exports = withNextIntl(nextConfig);
