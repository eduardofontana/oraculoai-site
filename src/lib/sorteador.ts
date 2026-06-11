import { randInt } from "./rand"

export interface ResultadoSorteio {
  itensSorteados: string[]
  itensRestantes: string[]
  totalOriginal: number
}

/**
 * Sorteia itens de uma lista.
 *
 * @param itens - Lista de itens (um por linha ou array)
 * @param quantidade - Quantidade de itens a sortear
 * @param permitirRepeticao - Se pode repetir o mesmo item
 * @returns Resultado do sorteio
 */
export function sortear(
  itens: string[],
  quantidade: number,
  permitirRepeticao = false
): ResultadoSorteio {
  if (itens.length === 0) {
    return {
      itensSorteados: [],
      itensRestantes: [],
      totalOriginal: 0,
    }
  }

  const qtd = Math.min(quantidade, permitirRepeticao ? quantidade : itens.length)
  const sorteados: string[] = []
  const restantes = [...itens]

  for (let i = 0; i < qtd; i++) {
    if (restantes.length === 0) break

    const idx = randInt(restantes.length)
    sorteados.push(restantes[idx])

    if (!permitirRepeticao) {
      restantes.splice(idx, 1)
    }
  }

  return {
    itensSorteados: sorteados,
    itensRestantes: restantes,
    totalOriginal: itens.length,
  }
}

/**
 * Parseia uma string com itens (um por linha).
 */
export function parsearItens(texto: string): string[] {
  return texto
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}
