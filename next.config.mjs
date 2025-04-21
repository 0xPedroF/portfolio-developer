/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for better performance
  images: {
    domains: [],
    dangerouslyAllowSVG: true,
    unoptimized: false,
  },
  // Optimize bundles
  swcMinify: true,
  // Enable compression for better performance
  compress: true,
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Enable incremental static regeneration
  experimental: {
    scrollRestoration: true,
    
  },
  output: 'export',
  typescript: {
    ignoreBuildErrors: true
  },
};

export default nextConfig;