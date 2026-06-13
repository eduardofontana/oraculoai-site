import { NextRequest, NextResponse } from "next/server"
import { validateOrigin } from "@/lib/csrf"
import { checkRateLimit } from "@/lib/rate-limit"

const HIBP_RANGE_URL = "https://api.pwnedpasswords.com/range/"
const HASH_PREFIX_PATTERN = /^[0-9A-F]{5}$/

export async function GET(request: NextRequest) {
  /* ---- 0. CSRF check ---- */
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Requisição rejeitada." }, { status: 403 })
  }

  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous"

  const rl = await checkRateLimit(`hibp:${ip}`, {
    limit: 60,
    windowMs: 60 * 1000,
  })
  if (!rl.success) {
    return NextResponse.json(
      { error: "Limite de requisições excedido. Aguarde um minuto." },
      { status: 429 },
    )
  }

  const prefix = request.nextUrl.searchParams.get("prefix")?.toUpperCase() ?? ""

  if (!HASH_PREFIX_PATTERN.test(prefix)) {
    return NextResponse.json(
      { error: "Prefixo SHA-1 inválido. Use exatamente 5 caracteres hexadecimais." },
      { status: 400 },
    )
  }

  try {
    const response = await fetch(`${HIBP_RANGE_URL}${prefix}`, {
      headers: {
        "Add-Padding": "true",
        "User-Agent": "oraculoai-site",
      },
      signal: AbortSignal.timeout(10000),
    })

    const body = await response.text()

    if (!response.ok) {
      return NextResponse.json(
        { error: "Falha ao consultar serviço de senhas vazadas." },
        { status: response.status },
      )
    }

    return new NextResponse(body, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Não foi possível consultar o Have I Been Pwned agora." },
      { status: 502 },
    )
  }
}
