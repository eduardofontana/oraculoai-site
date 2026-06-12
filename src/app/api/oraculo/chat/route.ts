import { NextRequest, NextResponse } from "next/server";

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
/*  HUGGING FACE INFERENCE API                                        */
/* ------------------------------------------------------------------ */
const HF_API_URL =
  "https://api-inference.huggingface.co/models/google/gemma-2-2b-it";

const SYSTEM_PROMPT = `Você é o Oráculo, um assistente técnico amigável e inteligente.

Você domina segurança cibernética, inteligência artificial, arquitetura de sistemas, desenvolvimento web, Linux, cloud, DevOps, automação e ferramentas open source. Mas também sabe conversar sobre outros assuntos de forma natural.

REGRAS:
- Seja natural, não pare um manual de instruções
- Em tecnologia: seja técnico e didático com exemplos quando útil
- Em segurança: mantenha sempre foco DEFENSIVO e educativo
- Se o usuário pedir algo perigoso/ilegal, redirecione para alternativa segura
- Se não souber algo (ex: clima agora, cotação), seja honesto
- Responda em português claro`;

function buildPrompt(userMessage: string): string {
  return `<start_of_turn>user\n${SYSTEM_PROMPT}\n\nPergunta do usuário: ${userMessage}<end_of_turn>\n<start_of_turn>model\n`;
}

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
      console.error("[Oráculo] HF_TOKEN não configurado no ambiente");
      return NextResponse.json(
        { error: "Serviço de IA indisponível no momento." },
        { status: 500 },
      );
    }

    const prompt = buildPrompt(rawMessage);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    console.log("[Oráculo] Enviando requisição para HF...");

    const hfResponse = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 512,
          temperature: 0.4,
          top_p: 0.9,
          repetition_penalty: 1.05,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    console.log("[Oráculo] Resposta HF status:", hfResponse.status);

    /* ---- 4. Tratar resposta da HF ---- */
    if (!hfResponse.ok) {
      const errorText = await hfResponse.text().catch(() => "Erro desconhecido");
      console.error(`[Oráculo] HF erro ${hfResponse.status}:`, errorText?.slice(0, 1000));

      if (hfResponse.status === 503) {
        return NextResponse.json(
          { reply: "O modelo de IA está carregando. Aguarde 10s e tente novamente." },
          { status: 200 },
        );
      }

      return NextResponse.json(
        { error: `Erro do serviço de IA (${hfResponse.status}).` },
        { status: 502 },
      );
    }

    /* ---- 5. Parsear resposta ---- */
    const raw = await hfResponse.text();
    console.log("[Oráculo] Resposta bruta (início):", raw?.slice(0, 300));

    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("[Oráculo] Resposta não é JSON:", raw?.slice(0, 500));
      return NextResponse.json(
        { error: "Resposta inválida do serviço de IA." },
        { status: 502 },
      );
    }

    let reply = "";

    if (Array.isArray(data) && data.length > 0) {
      const first = data[0] as Record<string, unknown>;
      reply = (first?.generated_text as string) ?? "";
    } else if (data && typeof data === "object") {
      const obj = data as Record<string, unknown>;
      if (obj.generated_text) {
        reply = obj.generated_text as string;
      } else if (obj.error) {
        console.error("[Oráculo] HF retornou erro:", obj.error);
        return NextResponse.json(
          { error: "O serviço de IA retornou um erro." },
          { status: 502 },
        );
      }
    }

    if (!reply) {
      console.error("[Oráculo] Resposta vazia ou formato inesperado:", JSON.stringify(data).slice(0, 500));
      return NextResponse.json(
        { error: "Resposta vazia do serviço de IA." },
        { status: 502 },
      );
    }

    /* ---- 6. Limpar ---- */
    reply = reply.trim();
    // Remove tokens de template do modelo
    reply = reply
      .replace(/<start_of_turn>|<end_of_turn>|<\|system\|>|<\|user\|>|<\|assistant\|>|<\/?s>|\[INST\]|\[\/INST\]/gi, "")
      .trim();

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.error("[Oráculo] Timeout da requisição");
      return NextResponse.json(
        { error: "Requisição excedeu o tempo limite. Tente novamente." },
        { status: 504 },
      );
    }
    const errMsg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    console.error("[Oráculo] Exceção não capturada:", errMsg);
    if (err instanceof Error && err.stack) {
      console.error("[Oráculo] Stack:", err.stack);
    }
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
