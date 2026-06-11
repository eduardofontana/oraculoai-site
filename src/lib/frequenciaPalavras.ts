export interface FrequenciaPalavra {
  palavra: string
  frequencia: number
}

export interface ResultadoFrequencia {
  totalPalavras: number
  totalCaracteres: number
  totalCaracteresSemEspaco: number
  palavrasUnicas: number
  frequencias: FrequenciaPalavra[]
  topPalavras: FrequenciaPalavra[]
}

/**
 * Analisa a frequência de palavras em um texto.
 */
export function analisarFrequencia(
  texto: string,
  limite = 30
): ResultadoFrequencia {
  if (!texto.trim()) {
    return {
      totalPalavras: 0,
      totalCaracteres: 0,
      totalCaracteresSemEspaco: 0,
      palavrasUnicas: 0,
      frequencias: [],
      topPalavras: [],
    }
  }

  // Remove pontuação e converte para minúsculas
  const palavras = texto
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)

  // Conta frequência
  const mapa = new Map<string, number>()
  for (const palavra of palavras) {
    mapa.set(palavra, (mapa.get(palavra) ?? 0) + 1)
  }

  // Ordena por frequência (decrescente) e depois alfabeticamente
  const frequencias = Array.from(mapa.entries())
    .map(([palavra, frequencia]) => ({ palavra, frequencia }))
    .sort((a, b) => {
      if (b.frequencia !== a.frequencia) return b.frequencia - a.frequencia
      return a.palavra.localeCompare(b.palavra)
    })

  return {
    totalPalavras: palavras.length,
    totalCaracteres: texto.length,
    totalCaracteresSemEspaco: texto.replace(/\s/g, "").length,
    palavrasUnicas: mapa.size,
    frequencias,
    topPalavras: frequencias.slice(0, limite),
  }
}
