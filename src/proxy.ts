import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Proxy (anteriormente Middleware): Nonce-based CSP para API routes  */
/*                                                                     */
/*  - API routes (/api/*) recebem CSP restrito (default-src 'none')   */
/*    + nonce, eliminando 'unsafe-inline' nessas rotas                 */
/*  - Páginas estáticas continuam com o CSP do vercel.json             */
/*    (com 'unsafe-inline' — necessário pois não há SSR)              */
/* ------------------------------------------------------------------ */

export function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID();

  const response = NextResponse.next();

  // Disponibiliza o nonce para uso futuro em SSR
  response.headers.set("x-nonce", nonce);

  // CSP estrito para API routes (elimina 'unsafe-inline' dessas rotas)
  // OBS: vercel.json mantém 'unsafe-inline' para páginas estáticas (SSG)
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

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
