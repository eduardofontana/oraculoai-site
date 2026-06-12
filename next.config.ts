import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers are managed via vercel.json (edge-level).
  // CSP is configured there to avoid Vercel overriding it with defaults.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default nextConfig
