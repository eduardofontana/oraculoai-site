/**
 * Obtém lista de fusos horários suportados pelo navegador.
 */
export function obterFusos(): string[] {
  try {
    return Intl.supportedValuesOf("timeZone")
  } catch {
    // Fallback para navegadores antigos
    return [
      "America/Sao_Paulo",
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Europe/Moscow",
      "Asia/Tokyo",
      "Asia/Shanghai",
      "Asia/Dubai",
      "Asia/Kolkata",
      "Australia/Sydney",
      "Pacific/Auckland",
      "UTC",
    ]
  }
}

/**
 * Converte uma data entre dois fusos horários.
 */
export function converterFuso(
  data: Date,
  fusoOrigem: string,
  fusoDestino: string
): { dataOrigem: string; dataDestino: string; diferencaHoras: number } {
  // Formata a data no fuso de origem
  const fmtOrigem = new Intl.DateTimeFormat("pt-BR", {
    timeZone: fusoOrigem,
    dateStyle: "full",
    timeStyle: "medium",
    hour12: false,
  })

  const fmtDestino = new Intl.DateTimeFormat("pt-BR", {
    timeZone: fusoDestino,
    dateStyle: "full",
    timeStyle: "medium",
    hour12: false,
  })

  // Calcula diferença em horas
  const getOffset = (tz: string) => {
    const now = new Date()
    const utc = now.getTime()
    const tzTime = new Date(
      now.toLocaleString("en-US", { timeZone: tz })
    ).getTime()
    return (tzTime - utc) / (1000 * 60 * 60)
  }

  const diffOrigem = getOffset(fusoOrigem)
  const diffDestino = getOffset(fusoDestino)
  const diferencaHoras = diffDestino - diffOrigem

  return {
    dataOrigem: fmtOrigem.format(data),
    dataDestino: fmtDestino.format(data),
    diferencaHoras: Math.round(diferencaHoras * 100) / 100,
  }
}

/**
 * Retorna o offset UTC de um fuso horário (ex: -03:00).
 */
export function obterOffset(fuso: string): string {
  try {
    const agora = new Date()
    const utc = agora.getTime()
    const tzTime = new Date(
      agora.toLocaleString("en-US", { timeZone: fuso })
    ).getTime()
    const diffMinutos = Math.round((tzTime - utc) / (1000 * 60))
    const horas = Math.floor(Math.abs(diffMinutos) / 60)
    const minutos = Math.abs(diffMinutos) % 60
    const sinal = diffMinutos >= 0 ? "+" : "-"
    return `UTC${sinal}${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`
  } catch {
    return ""
  }
}

/**
 * Agrupa fusos por região.
 */
export function agruparFusos(fusos: string[]): Record<string, string[]> {
  const grupos: Record<string, string[]> = {}

  for (const fuso of fusos) {
    const regiao = fuso.split("/")[0] ?? "Outros"
    if (!grupos[regiao]) grupos[regiao] = []
    grupos[regiao].push(fuso)
  }

  return grupos
}
