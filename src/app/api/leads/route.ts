import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";
import { validateOrigin } from "@/lib/csrf";
import { checkRateLimit } from "@/lib/rate-limit";
import { notifyNewLead } from "@/lib/notify";

/* ------------------------------------------------------------------ */
/*  Schema de validação                                                */
/* ------------------------------------------------------------------ */
const leadSchema = z.object({
  nome: z.string().min(2, "Mínimo 2 caracteres.").max(120, "Máximo 120 caracteres."),
  email: z.string().email("E-mail inválido.").max(254, "Máximo 254 caracteres."),
  whatsapp: z
    .string()
    .min(8, "Mínimo 8 caracteres.")
    .max(20, "Máximo 20 caracteres.")
    .transform((v) => v.replace(/[^\d+]/g, "")),
  empresa: z.string().max(200, "Máximo 200 caracteres.").optional().or(z.literal("")),
  mensagem: z.string().min(10, "Mínimo 10 caracteres.").max(1000, "Máximo 1000 caracteres."),
});

/* ------------------------------------------------------------------ */
/*  POST /api/leads                                                    */
/* ------------------------------------------------------------------ */
export async function POST(request: NextRequest) {
  /* ---- CSRF ---- */
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Requisição rejeitada." }, { status: 403 });
  }

  /* ---- Rate limit ---- */
  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "anonymous";

  const rl = await checkRateLimit(`leads:${ip}`, { limit: 5, windowMs: 60 * 1000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Muitas requisições. Aguarde um minuto." },
      { status: 429 },
    );
  }

  /* ---- Validação Zod ---- */
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { nome, email, whatsapp, empresa, mensagem } = parsed.data;

  /* ---- Persistir no Supabase ---- */
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    const supabase = getSupabase();
    if (!supabase) {
      console.info("[Leads] Supabase não configurado. Lead não persistido.");
      return NextResponse.json({ success: true }, { status: 201 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("leads") as any).insert({
      nome,
      email,
      whatsapp,
      empresa: empresa || null,
      mensagem,
    });

    if (error) {
      console.error("[Leads] Erro ao salvar no Supabase:", error.message);
      return NextResponse.json(
        { error: "Erro ao salvar lead." },
        { status: 500 },
      );
    }
  } else {
    // Sem Supabase configurado: apenas log
    console.info("[Leads] Lead recebido (sem Supabase):", { nome, email, whatsapp, empresa, mensagem });
  }

  /* ---- Notificar (assíncrono, não bloqueia resposta) ---- */
  notifyNewLead({ nome, email, whatsapp, empresa, mensagem });

  return NextResponse.json({ success: true }, { status: 201 });
}
