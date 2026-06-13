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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pagead2.googlesyndication.com https://va.vercel-scripts.com https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "frame-src https://pagead2.googlesyndication.com https://www.googletagmanager.com",
              "connect-src 'self' https://*.awesomeapi.com.br https://ip-api.com https://va.vercel-scripts.com https://router.huggingface.co https://api.pwnedpasswords.com https://*.google-analytics.com https://analytics.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
}

export default nextConfig
