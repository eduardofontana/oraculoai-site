import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const info: Record<string, unknown> = {
    step: "start",
    hasUrl: !!rawUrl,
    hasKey: !!rawKey,
    urlLength: (rawUrl ?? "").length,
    urlFull: rawUrl ?? "(undefined)",
    urlIsHttp:
      (rawUrl ?? "").startsWith("http://") ||
      (rawUrl ?? "").startsWith("https://"),
    keyPrefix: (rawKey ?? "").slice(0, 15),
  };

  try {
    info.step = "get-supabase";
    const supabase = getSupabase();
    info.hasSupabase = !!supabase;
    info.supabaseType = typeof supabase;

    if (supabase) {
      // Test 1: simple count query (should work even with RLS if table exists)
      info.step = "test-count";
      try {
        const { count, error: countError } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true });
        info.countResult = count ?? null;
        info.countError = countError?.message ?? null;
        info.countCode = countError?.code ?? null;
      } catch (e: unknown) {
        info.countThrow = e instanceof Error ? e.message : String(e);
      }

      // Test 2: insert WITHOUT select
      info.step = "test-insert";
      try {
        const { data, error } = await (supabase.from("leads") as any).insert({
          nome: "TESTE DEBUG",
          email: "debug@test.com",
          whatsapp: "5511999999999",
          mensagem: "Teste de insercao",
          origem: "debug",
        });
        info.insertError = error?.message ?? null;
        info.insertCode = error?.code ?? null;
        info.insertData = JSON.stringify(data);
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
      },
      { status: 500 },
    );
  }
}
