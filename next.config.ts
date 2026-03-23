import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'images.ctfassets.net',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
