import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  // Gather diagnostic info BEFORE any risky operation
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const info: Record<string, unknown> = {
    step: "start",
    hasUrl: !!rawUrl,
    hasKey: !!rawKey,
    urlLength: (rawUrl ?? "").length,
    urlStart: (rawUrl ?? "").slice(0, 35),
    urlIsHttp:
      (rawUrl ?? "").startsWith("http://") ||
      (rawUrl ?? "").startsWith("https://"),
    keyLength: (rawKey ?? "").length,
    keyStart: (rawKey ?? "").slice(0, 12),
  };

  try {
    info.step = "get-supabase";
    const supabase = getSupabase();
    info.hasSupabase = !!supabase;
    info.supabaseType = typeof supabase;

    if (supabase) {
      info.step = "insert-test";
      try {
        const { data, error } = await (
          supabase.from("leads") as any
        ).insert({
          nome: "TESTE DIAG",
          email: "diag@debug.com",
          whatsapp: "5511999999999",
          mensagem: "Diagnostico automatico",
          origem: "debug",
        }).select();
        info.insertError = error?.message ?? null;
        info.insertData = data ? "ok" : "no data";
      } catch (e: unknown) {
        info.insertThrow = e instanceof Error ? e.message : String(e);
      }
    }

    info.step = "done";
    return NextResponse.json(info, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        ...info,
        step: "catch",
        fatal: err instanceof Error ? err.message : String(err),
        stack:
          err instanceof Error
            ? (err.stack ?? "").split("\n").slice(0, 6)
            : [],
      },
      { status: 500 },
    );
  }
}
