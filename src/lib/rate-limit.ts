/* ------------------------------------------------------------------ */
/*  Rate limit distribuído (Upstash) com fallback in-memory            */
/* ------------------------------------------------------------------ */

export type RatelimitResult = {
  success: boolean;
  remaining: number;
};

type RatelimitOpts = {
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

/* ==================== Upstash (distribuído) ==================== */

let upstashRatelimiter: {
  limit: (identifier: string) => Promise<RatelimitResult>;
} | null = null;

async function tryInitUpstash(): Promise<typeof upstashRatelimiter> {
  try {
    const { Redis } = await import("@upstash/redis");
    const { Ratelimit } = await import("@upstash/ratelimit");

    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) return null;

    const redis = new Redis({ url, token });
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "10 s"),
      analytics: false,
      prefix: "oraculo",
    });

    return {
      limit: async (identifier: string): Promise<RatelimitResult> => {
        const result = await ratelimit.limit(identifier);
        return {
          success: result.success,
          remaining: result.remaining,
        };
      },
    };
  } catch {
    return null;
  }
}

// Inicialização lazy: só tenta conectar no primeiro uso
let upstashInitPromise: Promise<typeof upstashRatelimiter> | null = null;

async function getRatelimiter(): Promise<typeof upstashRatelimiter> {
  if (upstashRatelimiter) return upstashRatelimiter;
  if (!upstashInitPromise) {
    upstashInitPromise = tryInitUpstash().then((r) => {
      upstashRatelimiter = r;
      return r;
    }) as Promise<typeof upstashRatelimiter>;
  }
  return upstashInitPromise;
}

/* ==================== Public API ==================== */

/**
 * Verifica rate limit. Usa Upstash Redis se configurado (gratuito até 10k req/dia),
 * caso contrário usa Map in-memory (não distribuído entre instâncias serverless).
 *
 * @param identifier - Identificador único (ex.: IP do cliente)
 * @param opts - Configuração do limite
 * @returns `{ success, remaining }`
 */
export async function checkRateLimit(
  identifier: string,
  opts: RatelimitOpts,
): Promise<RatelimitResult> {
  const rl = await getRatelimiter();

  if (rl) {
    // Upstash: usa sliding window (limit/10s independente do opts para simplificar)
    return rl.limit(identifier);
  }

  // Fallback in-memory
  return inMemoryCheck(identifier, opts);
}
