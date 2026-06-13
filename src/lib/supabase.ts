import { createClient } from "@supabase/supabase-js";

let _supabase: ReturnType<typeof createClient> | null = null;

/**
 * Retorna o cliente Supabase.
 * Retorna `null` se as env vars não estiverem configuradas.
 * Lazy: só cria o cliente quando chamado pela primeira vez.
 */
export function getSupabase() {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn(
      "[Supabase] NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY não configurados.",
    );
    return null;
  }

  _supabase = createClient(url, anonKey, {
    auth: { persistSession: false },
  });

  return _supabase;
}
