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
  "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

const SYSTEM_PROMPT = `Você é o Oráculo, um assistente técnico especializado em segurança cibernética, inteligência artificial e arquitetura de sistemas.

REGRAS:
- Explique conceitos técnicos com clareza e profundidade
- Mantenha foco defensivo e educativo em segurança
- Sugira boas práticas, hardening, threat modeling, DevSecOps
- Responda em português claro e direto
- Se o usuário pedir algo perigoso ou ilegal, redirecione para uma alternativa segura
- Seja técnico mas didático — use exemplos quando útil
- Evite: espiritualidade, misticismo, adivinhação, linguagem esotérica
- Evite: instruções ofensivas, exploração não autorizada, malware

TÓPICOS DOMINANTES:
cibersegurança defensiva, inteligência artificial, agentes de IA, arquitetura de software, Linux, cloud computing, DevOps, bug bounty defensivo, hardening, DevSecOps, automação, ferramentas open source, revisão de código segura`;

function buildPrompt(conversationHistory: string, userMessage: string): string {
  const historySection = conversationHistory
    ? `\nHistórico da conversa:\n${conversationHistory}\n`
    : "";

  return `<s>[INST] ${SYSTEM_PROMPT}${historySection}\nUsuário: ${userMessage} [/INST]`;
}

export async function POST(request: NextRequest) {
  try {
    /* ---- 1. Validar método e body ---- */
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

    const conversationHistory = body.history ?? "";
    const prompt = buildPrompt(conversationHistory, rawMessage);

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
          temperature: 0.3,
          top_p: 0.9,
          repetition_penalty: 1.1,
          return_full_text: false,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text().catch(() => "Erro desconhecido");
      console.error(
        `[Oráculo] HF API error ${hfResponse.status}: ${errorText}`,
      );
      // 503 = model loading (gratuito pode demorar para iniciar)
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
        { error: "Falha na comunicação com o serviço de IA." },
        { status: 502 },
      );
    }

    const data = (await hfResponse.json()) as
      | { generated_text: string }
      | { error: string }
      | Array<{ generated_text: string }>;

    let reply = "";

    if (Array.isArray(data)) {
      reply = data[0]?.generated_text ?? "";
    } else if ("generated_text" in data) {
      reply = data.generated_text;
    } else {
      reply = "";
    }

    if (!reply) {
      return NextResponse.json(
        { error: "O serviço de IA retornou uma resposta vazia." },
        { status: 502 },
      );
    }

    /* ---- 4. Sanitizar resposta ---- */
    reply = reply.trim();
    // Remover possíveis tags residuais do prompt
    reply = reply.replace(/<\/?s>|<\/?INST>|\[INST\]|\[\/INST\]/gi, "").trim();

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json(
        { error: "A requisição excedeu o tempo limite. Tente novamente." },
        { status: 504 },
      );
    }
    console.error("[Oráculo] Erro interno:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
