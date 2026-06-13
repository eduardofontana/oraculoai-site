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
  // Segurança: CSP e security headers gerenciados via vercel.json
  // Manter sincronizado com vercel.json se houver alterações
}

export default nextConfig
