const STORAGE_KEY = "oraculo-tool-usage"

interface UsageData {
  counts: Record<string, number>
  lastUsed: Record<string, number>
}

function loadUsage(): UsageData {
  if (typeof window === "undefined") return { counts: {}, lastUsed: {} }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { counts: {}, lastUsed: {} }
    return JSON.parse(raw) as UsageData
  } catch {
    return { counts: {}, lastUsed: {} }
  }
}

function saveUsage(data: UsageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage cheio ou desabilitado — ignora
  }
}

/**
 * Incrementa o contador de uso de uma ferramenta.
 * Chamado diretamente (não é hook React).
 */
export function trackToolUsage(slug: string): void {
  const data = loadUsage()
  data.counts[slug] = (data.counts[slug] ?? 0) + 1
  data.lastUsed[slug] = Date.now()
  saveUsage(data)
}

/**
 * Retorna o número de usos de uma ferramenta.
 */
export function getToolUsage(slug: string): number {
  const data = loadUsage()
  return data.counts[slug] ?? 0
}

/**
 * Retorna os slugs das N ferramentas mais usadas.
 */
export function getTopTools(limit = 6): string[] {
  const data = loadUsage()
  return Object.entries(data.counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([slug]) => slug)
}


