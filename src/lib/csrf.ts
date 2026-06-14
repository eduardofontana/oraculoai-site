/**
 * CSRF protection via Origin / Referer header validation.
 *
 * Em requisições same-origin (frontend → API no mesmo domínio),
 * o navegador NÃO envia o header `Origin`. Já requisições cross-origin
 * (ex.: script malicioso de outro domínio) enviam `Origin`.
 *
 * Regra:
 * - Se `Origin` estiver presente, precisa estar na whitelist.
 * - Se `Origin` estiver ausente, é same-origin → permitir.
 * - Se `Origin` estiver ausente mas `Referer` estiver presente,
 *   validar o `Referer` contra a whitelist (fallback).
 */

const ALLOWED_ORIGINS = [
  "https://oraculoai.cloud",
  "https://www.oraculoai.cloud",
  /^https:\/\/[\w-]+\.vercel\.app$/,
];

function isOriginAllowed(origin: string): boolean {
  return ALLOWED_ORIGINS.some((allowed) => {
    if (typeof allowed === "string") return origin === allowed;
    return allowed.test(origin);
  });
}

/**
 * Extrai o origin de um header Referer.
 * Ex.: "https://oraculoai.cloud/contato" → "https://oraculoai.cloud"
 */
function extractOriginFromReferer(referer: string): string | null {
  try {
    const u = new URL(referer);
    return u.origin;
  } catch {
    return null;
  }
}

/**
 * Valida a requisição contra CSRF.
 * Retorna `true` se for segura, `false` se suspeita.
 */
export function validateOrigin(request: { headers: Headers }): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Origin presente → validar
  if (origin) {
    return isOriginAllowed(origin);
  }

  // Origin ausente → fallback para Referer
  if (!referer) {
    return false; // sem Origin e sem Referer → rejeitar (defense-in-depth)
  }

  const refOrigin = extractOriginFromReferer(referer);
  if (!refOrigin) return false;

  return isOriginAllowed(refOrigin);
}
