import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.awesomeapi.com.br",
      },
      {
        protocol: "https",
        hostname: "ip-api.com",
      },
    ],
  },
}

export default nextConfig
