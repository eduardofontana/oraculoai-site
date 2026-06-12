import { NextRequest, NextResponse } from "next/server";
import https from "node:https";

/* ------------------------------------------------------------------ */
/*  Agente HTTPS com keep-alive para evitar conexões lentas           */
/* ------------------------------------------------------------------ */
const httpsAgent = new https.Agent({ keepAlive: true });

/* ------------------------------------------------------------------ */
/*  Rate-limit simples em memória (por IP)                            */
/* ------------------------------------------------------------------ */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_MESSAGES) return false;
  entry.count++;
  return true;
}

/* ------------------------------------------------------------------ */
/*  Hugging Face                                                      */
/* ------------------------------------------------------------------ */
const HF_API_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

const SYSTEM_PROMPT = `Você é o Oráculo, um assistente técnico amigável e inteligente. Você domina segurança cibernética, IA, arquitetura, Linux, cloud, DevOps, automação. Seja natural, didático e direto. Responda em português claro. Se não souber algo, seja honesto.`;

function buildPrompt(userMessage: string): string {
  return `<s>[INST] ${SYSTEM_PROMPT}\n\nUsuário: ${userMessage} [/INST]</s>`;
}

/* ------------------------------------------------------------------ */
/*  Fetch com retry e timeout                                         */
/* ------------------------------------------------------------------ */
async function fetchWithRetry(
  url: string,
  options: RequestInit & { agent?: https.Agent },
  maxRetries = 2,
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000); // max 8s

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      } as RequestInit);

      clearTimeout(timeout);
      return response;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`[Oráculo] Tentativa ${attempt}/${maxRetries} falhou:`, lastError.message);

      if (attempt < maxRetries) {
        // Espera 1s antes de retentar
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }

  throw lastError ?? new Error("Fetch failed after retries");
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                      */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  try {
    /* ---- 1. Validar body ---- */
    const body = await request.json().catch(() => null);
    if (!body || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Mensagem inválida. Envie um campo 'message' string." },
        { status: 400 },
      );
    }

    const rawMessage = body.message.trim();
    if (rawMessage.length === 0) {
      return NextResponse.json(
        { error: "Mensagem não pode estar vazia." },
        { status: 400 },
      );
    }
    if (rawMessage.length > 500) {
      return NextResponse.json(
        { error: "Mensagem muito longa (máximo 500 caracteres)." },
        { status: 400 },
      );
    }

    /* ---- 2. Rate limit ---- */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "anonymous";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: `Limite de ${MAX_MESSAGES} mensagens excedido. Recarregue a página.` },
        { status: 429 },
      );
    }

    /* ---- 3. Chamar Hugging Face ---- */
    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) {
      console.error("[Oráculo] HF_TOKEN não configurado");
      return NextResponse.json(
        { error: "Serviço de IA indisponível no momento." },
        { status: 500 },
      );
    }

    const prompt = buildPrompt(rawMessage);

    console.log("[Oráculo] Enviando requisição para HF...");

    const hfResponse = await fetchWithRetry(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.4,
          top_p: 0.9,
        },
      }),
    });

    console.log("[Oráculo] Resposta HF status:", hfResponse.status);

    /* ---- 4. Tratar resposta ---- */
    if (!hfResponse.ok) {
      const errorText = await hfResponse.text().catch(() => "Erro desconhecido");
      console.error(`[Oráculo] HF erro ${hfResponse.status}:`, errorText?.slice(0, 1000));

      if (hfResponse.status === 503) {
        return NextResponse.json(
          { reply: "O modelo de IA está carregando. Aguarde alguns segundos e tente novamente." },
          { status: 200 },
        );
      }

      return NextResponse.json(
        { error: `Serviço de IA retornou erro (${hfResponse.status}).` },
        { status: 502 },
      );
    }

    /* ---- 5. Parsear resposta ---- */
    const raw = await hfResponse.text();
    console.log("[Oráculo] Resposta (início):", raw?.slice(0, 300));

    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      const preview = raw?.slice(0, 300) ?? "vazio";
      console.error("[Oráculo] Resposta não é JSON:", preview);
      return NextResponse.json(
        { error: `Resposta inválida da IA (status ${hfResponse.status}): ${preview}` },
        { status: 502 },
      );
    }

    let reply = "";

    if (Array.isArray(data) && data.length > 0) {
      reply = (data[0] as Record<string, unknown>)?.generated_text as string ?? "";
    } else if (data && typeof data === "object") {
      const obj = data as Record<string, unknown>;
      if (obj.generated_text) {
        reply = obj.generated_text as string;
      } else if (obj.error) {
        console.error("[Oráculo] HF erro:", obj.error);
        return NextResponse.json(
          { error: "O serviço de IA retornou um erro." },
          { status: 502 },
        );
      }
    }

    if (!reply) {
      console.error("[Oráculo] Resposta vazia:", JSON.stringify(data).slice(0, 500));
      return NextResponse.json(
        { error: "Resposta vazia do serviço de IA." },
        { status: 502 },
      );
    }

    /* ---- 6. Limpar ---- */
    reply = reply.trim();
    reply = reply
      .replace(/^Oráculo:\s*/i, "")
      .trim();

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("[Oráculo] Erro:", err.message);
      if (err.cause) console.error("[Oráculo] Causa:", err.cause);
      if ("code" in err) console.error("[Oráculo] Código:", (err as NodeJS.ErrnoException).code);
    }

    const errMsg = err instanceof Error
      ? `${err.name}: ${err.message}${err.cause ? ` | cause: ${err.cause}` : ""}${(err as NodeJS.ErrnoException).code ? ` | code: ${(err as NodeJS.ErrnoException).code}` : ""}`
      : String(err);

    return NextResponse.json(
      { error: `Erro interno: ${errMsg}` },
      { status: 500 },
    );
  }
}
