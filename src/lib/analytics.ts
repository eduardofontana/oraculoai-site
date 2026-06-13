const STORAGE_KEY = "oraculo-tool-usage"
const MAX_ENTRIES = 100
const EXPIRY_MS = 30 * 24 * 60 * 60 * 1000

interface UsageData {
  counts: Record<string, number>
  lastUsed: Record<string, number>
}

function loadUsage(): UsageData {
  if (typeof window === "undefined") return { counts: {}, lastUsed: {} }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { counts: {}, lastUsed: {} }
    const data = JSON.parse(raw) as UsageData
    const now = Date.now()
    for (const slug of Object.keys(data.lastUsed)) {
      if (now - data.lastUsed[slug] > EXPIRY_MS) {
        delete data.counts[slug]
        delete data.lastUsed[slug]
      }
    }
    return data
  } catch {
    return { counts: {}, lastUsed: {} }
  }
}

function saveUsage(data: UsageData): void {
  try {
    const entries = Object.keys(data.counts)
    if (entries.length > MAX_ENTRIES) {
      const sorted = entries.sort((a, b) => (data.lastUsed[b] ?? 0) - (data.lastUsed[a] ?? 0))
      for (const slug of sorted.slice(MAX_ENTRIES)) {
        delete data.counts[slug]
        delete data.lastUsed[slug]
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage cheio ou desabilitado — ignora
  }
}

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


