import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // cho phép tất cả host HTTPS
      },
      {
        protocol: "http",
        hostname: "**", // cho phép cả HTTP
      },
    ],
  },
};

export default nextConfig;
