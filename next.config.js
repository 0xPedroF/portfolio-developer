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
  experimental: {
    // Enables app/global-not-found.tsx with its own <html>/<body>
    // (needed because root layout returns children for next-intl).
    globalNotFound: true,
  },
};

module.exports = withNextIntl(nextConfig);
