import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Rate-limit simples em memória (por IP)                            */
/*  Reseta quando a Vercel faz cold-start (não há persistência)       */
/* ------------------------------------------------------------------ */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hora

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
  "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";

const SYSTEM_PROMPT = `Você é o Oráculo, um assistente técnico amigável e inteligente.

Você domina segurança cibernética, inteligência artificial, arquitetura de sistemas, desenvolvimento web, Linux, cloud, DevOps, automação e ferramentas open source — esse é seu ponto forte. Mas você também sabe conversar sobre outros assuntos de forma natural, sem ser robótico.

REGRAS:
- Seja natural e converse de forma solta, não pare um manual
- Em tecnologia: seja técnico, didático e direto, com exemplos quando útil
- Em segurança: mantenha sempre foco DEFENSIVO e educativo
- Se o usuário pedir algo perigoso/ilegal, redirecione para alternativa segura
- Se perguntar algo que você não sabe (ex: clima agora, cotação), seja honesto: "não tenho acesso a dados em tempo real"
- Evite: espiritualidade, misticismo, adivinhação, instruções ofensivas, exploração não autorizada, malware
- Responda em português claro`;

function buildPrompt(userMessage: string): string {
  return `<|system|>\n${SYSTEM_PROMPT}\n<|user|>\n${userMessage}\n<|assistant|>\n`;
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
        {
          error: `Limite de ${MAX_MESSAGES} mensagens por sessão excedido. Recarregue a página para continuar.`,
        },
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

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
          return_full_text: false,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    /* ---- 4. Tratar resposta da HF ---- */
    if (!hfResponse.ok) {
      const errorText = await hfResponse.text().catch(() => "Erro desconhecido");
      console.error(
        `[Oráculo] HF API error ${hfResponse.status}: ${errorText}`,
      );

      // 503 = model loading (comum no plano gratuito)
      if (hfResponse.status === 503) {
        return NextResponse.json(
          {
            reply:
              "O modelo de IA está sendo carregado. Aguarde alguns segundos e tente novamente.",
          },
          { status: 200 },
        );
      }

      return NextResponse.json(
        { error: `Falha na comunicação com o serviço de IA (${hfResponse.status}).` },
        { status: 502 },
      );
    }

    /* ---- 5. Parsear resposta ---- */
    const raw = await hfResponse.text();
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("[Oráculo] Resposta inválida da HF (não é JSON):", raw.slice(0, 500));
      return NextResponse.json(
        { error: "Resposta inválida do serviço de IA." },
        { status: 502 },
      );
    }

    let reply = "";

    if (Array.isArray(data)) {
      reply = (data[0] as Record<string, unknown>)?.generated_text as string ?? "";
    } else if (data && typeof data === "object" && "generated_text" in (data as Record<string, unknown>)) {
      reply = (data as Record<string, unknown>).generated_text as string;
    } else if (data && typeof data === "object" && "error" in (data as Record<string, unknown>)) {
      console.error("[Oráculo] Erro retornado pela HF:", (data as Record<string, unknown>).error);
      return NextResponse.json(
        { error: "O serviço de IA retornou um erro." },
        { status: 502 },
      );
    }

    if (!reply) {
      return NextResponse.json(
        { error: "O serviço de IA retornou uma resposta vazia." },
        { status: 502 },
      );
    }

    /* ---- 6. Limpar resposta ---- */
    reply = reply.trim();
    // Remove tags residuais do prompt
    reply = reply
      .replace(/<\|system\|>|<\|user\|>|<\|assistant\|>|<\/?s>|<\/?INST>|\[INST\]|\[\/INST\]/gi, "")
      .trim();

    // Se a resposta começar com o prompt do usuário, remove
    const userPrefix = rawMessage.slice(0, 60);
    if (reply.startsWith(userPrefix)) {
      reply = reply.slice(userPrefix.length).trim();
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json(
        { error: "A requisição excedeu o tempo limite. Tente novamente." },
        { status: 504 },
      );
    }
    const errMsg = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[Oráculo] Erro interno:", errMsg);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
