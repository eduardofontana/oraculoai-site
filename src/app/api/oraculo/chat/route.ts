import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Rate-limit                                                        */
/* ------------------------------------------------------------------ */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_MSGS = 20;
const WINDOW_MS = 60 * 60 * 1000;

function checkLimit(ip: string): boolean {
  const now = Date.now();
  const e = rateLimitMap.get(ip);
  if (!e || now > e.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (e.count >= MAX_MSGS) return false;
  e.count++;
  return true;
}

/* ------------------------------------------------------------------ */
/*  Hugging Face Serverless Inference API                             */
/* ------------------------------------------------------------------ */
const HF_URL =
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

const SYSTEM_PROMPT = `Você é o Oráculo, um assistente técnico amigável e inteligente. Você domina segurança cibernética, IA, arquitetura, Linux, cloud, DevOps, automação. Seja natural, didático e direto. Responda em português claro. Se não souber algo, seja honesto.`;

function buildPrompt(msg: string): string {
  return `<s>[INST] ${SYSTEM_PROMPT}\n\nUsuário: ${msg} [/INST]</s>`;
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                      */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  try {
    /* ---- 1. Validação ---- */
    const body = await request.json().catch(() => null);
    if (!body || typeof body.message !== "string") {
      return NextResponse.json({ error: "Mensagem inválida." }, { status: 400 });
    }

    const rawMessage = body.message.trim();
    if (!rawMessage || rawMessage.length > 500) {
      return NextResponse.json(
        { error: "Mensagem inválida (1-500 caracteres)." },
        { status: 400 },
      );
    }

    /* ---- 2. Rate limit ---- */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    if (!checkLimit(ip)) {
      return NextResponse.json(
        { error: `Limite de ${MAX_MSGS} mensagens excedido.` },
        { status: 429 },
      );
    }

    /* ---- 3. Token ---- */
    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) {
      return NextResponse.json(
        { error: "Serviço de IA indisponível (token não configurado)." },
        { status: 500 },
      );
    }

    /* ---- 4. Chamar HF via fetch ---- */
    const prompt = buildPrompt(rawMessage);
    const payload = {
      inputs: prompt,
      parameters: { max_new_tokens: 384, temperature: 0.4, top_p: 0.9 },
    };

    console.log("[Oráculo] Chamando HF via fetch...");
    const hfRes = await fetch(HF_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });

    console.log("[Oráculo] Status:", hfRes.status);

    /* ---- 5. Tratar HTTP errors ---- */
    if (!hfRes.ok) {
      const text = await hfRes.text().catch(() => "");
      const preview = text.slice(0, 300);

      if (hfRes.status === 503) {
        return NextResponse.json(
          { reply: "Modelo carregando. Tente novamente em alguns segundos." },
          { status: 200 },
        );
      }

      if (preview.startsWith("<!DOCTYPE") || preview.startsWith("<html")) {
        return NextResponse.json(
          {
            error: `IA retornou HTML (status ${hfRes.status}). Verifique o scope do token HF: precisa ser "Make calls to Serverless Inference API".`,
          },
          { status: 502 },
        );
      }

      return NextResponse.json(
        { error: `IA retornou erro (${hfRes.status}): ${preview}` },
        { status: 502 },
      );
    }

    /* ---- 6. Parsear JSON ---- */
    let data: unknown;
    try {
      data = await hfRes.json();
    } catch {
      const raw = await hfRes.text().catch(() => "");
      return NextResponse.json(
        { error: `Resposta inválida: ${raw.slice(0, 200)}` },
        { status: 502 },
      );
    }

    let reply = "";
    if (Array.isArray(data) && data.length > 0) {
      reply = (data[0] as Record<string, unknown>)?.generated_text as string ?? "";
    } else if (data && typeof data === "object") {
      const obj = data as Record<string, unknown>;
      if (obj.generated_text) reply = obj.generated_text as string;
      else if (obj.error)
        return NextResponse.json({ error: `IA: ${obj.error}` }, { status: 502 });
    }

    if (!reply) {
      return NextResponse.json({ error: "Resposta vazia da IA." }, { status: 502 });
    }

    reply = reply.replace(/<s>|<\/s>|\[INST\]|\[\/INST\]/gi, "").trim();
    return NextResponse.json({ reply }, { status: 200 });
  } catch (err: unknown) {
    const errObj = err instanceof Error ? err : new Error(String(err));
    const code = (errObj as NodeJS.ErrnoException).code ?? "";
    console.error("[Oráculo]", errObj.message, code);

    return NextResponse.json(
      { error: `${errObj.message}${code ? ` [${code}]` : ""}` },
      { status: 500 },
    );
  }
}
