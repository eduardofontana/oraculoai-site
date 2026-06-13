import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const info: Record<string,unknown> = { step: "start" };

    // Step 1: check env
    info.hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    info.hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    info.urlPrefix = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").slice(0, 20);

    // Step 2: getSupabase
    const supabase = getSupabase();
    info.hasSupabase = !!supabase;
    info.supabaseType = supabase ? typeof supabase : "null";

    // Step 3: try to insert
    if (supabase) {
      try {
        const { data, error } = await (supabase.from("leads") as any).insert({
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

    return NextResponse.json(info, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({
      fatal: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? (err.stack ?? "").split("\n").slice(0, 6) : [],
    }, { status: 500 });
  }
}
