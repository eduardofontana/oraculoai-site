import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID();

  const response = NextResponse.next();

  /* ---- CSP nonce-based para API routes ---- */
  response.headers.set("x-nonce", nonce);
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'none'",
      `script-src 'nonce-${nonce}' 'strict-dynamic'`,
      "style-src 'unsafe-inline'",
      "frame-ancestors 'none'",
      "base-uri 'none'",
      "form-action 'none'",
    ].join("; "),
  );

  /* ---- CORS (defense-in-depth) ---- */
  const origin = request.headers.get("origin");
  if (origin) {
    const allowed =
      origin === "https://oraculoai.cloud" ||
      origin === "https://www.oraculoai.cloud" ||
      /^https:\/\/[\w-]+\.vercel\.app$/.test(origin);
    if (allowed) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Vary", "Origin");
    }
  }
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Max-Age", "86400");

  /* ---- Preflight ---- */
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: response.headers });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
