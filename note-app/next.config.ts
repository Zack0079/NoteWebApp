import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // This tells browsers to always go to /login
      },
    ]
  },
};

export default nextConfig;
