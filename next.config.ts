import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.eliana.com.bd',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'api.erambd.xyz',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
