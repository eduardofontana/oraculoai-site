/* ------------------------------------------------------------------ */
/*  Rate limit distribuído (Supabase) com fallback in-memory           */
/* ------------------------------------------------------------------ */

export type RatelimitResult = {
  success: boolean;
  remaining: number;
};

export type RatelimitOpts = {
  /** Máximo de requisições no período */
  limit: number;
  /** Janela em milissegundos */
  windowMs: number;
};

/* ==================== In-memory fallback ==================== */

const inMemoryStores = new Map<string, { count: number; resetAt: number }>();

function inMemoryCheck(key: string, opts: RatelimitOpts): RatelimitResult {
  const now = Date.now();
  const entry = inMemoryStores.get(key);
  if (!entry || now > entry.resetAt) {
    inMemoryStores.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { success: true, remaining: opts.limit - 1 };
  }
  entry.count++;
  const remaining = Math.max(0, opts.limit - entry.count);
  return { success: entry.count <= opts.limit, remaining };
}

/* ==================== Supabase (distribuído) ==================== */

let supabaseRpc: ((identifier: string, opts: RatelimitOpts) => Promise<RatelimitResult>) | null = null;

async function tryInitSupabase(): Promise<typeof supabaseRpc> {
  try {
    const { getSupabase } = await import("./supabase");

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      console.warn("[RateLimit] Supabase not configured, using in-memory fallback");
      return null;
    }

    return async (identifier: string, opts: RatelimitOpts): Promise<RatelimitResult> => {
      const supabase = getSupabase();
      if (!supabase) {
        throw new Error("[RateLimit] Supabase client not available");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase.rpc as any)("check_rate_limit", {
        p_identifier: identifier,
        p_limit: opts.limit,
        p_window_ms: opts.windowMs,
      });

      if (error) {
        throw error;
      }

      return data as RatelimitResult;
    };
  } catch {
    return null;
  }
}

// Inicialização lazy
let supabaseInitPromise: Promise<typeof supabaseRpc> | null = null;

async function getRatelimiter(): Promise<typeof supabaseRpc> {
  if (supabaseRpc) return supabaseRpc;
  if (!supabaseInitPromise) {
    supabaseInitPromise = tryInitSupabase().then((r) => {
      supabaseRpc = r;
      return r;
    }) as Promise<typeof supabaseRpc>;
  }
  return supabaseInitPromise;
}

/* ==================== Public API ==================== */

/**
 * Verifica rate limit.
 * - Se Supabase estiver configurado → usa RPC `check_rate_limit` (distribuído)
 * - Caso contrário → fallback in-memory Map
 *
 * @param identifier - Identificador único (ex.: IP do cliente)
 * @param opts - Configuração (limit/windowMs)
 */
export async function checkRateLimit(
  identifier: string,
  opts: RatelimitOpts,
): Promise<RatelimitResult> {
  const rl = await getRatelimiter();

  if (rl) {
    return rl(identifier, opts);
  }

  // Fallback: Supabase not available or not configured
  return inMemoryCheck(identifier, opts);
}
