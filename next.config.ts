import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['github.com'],
  },
  experimental: {
    dynamicIO: true
  }
};

export default nextConfig;
