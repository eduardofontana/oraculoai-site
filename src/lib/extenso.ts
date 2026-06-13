const UNIDADES = [
  "", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove",
]

const DEZENAS = [
  "", "dez", "vinte", "trinta", "quarenta", "cinquenta",
  "sessenta", "setenta", "oitenta", "noventa",
]

const DEZENAS_ESPECIAIS: Record<number, string> = {
  11: "onze", 12: "doze", 13: "treze", 14: "catorze", 15: "quinze",
  16: "dezesseis", 17: "dezessete", 18: "dezoito", 19: "dezenove",
}

const CENTENAS = [
  "", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos",
  "seiscentos", "setecentos", "oitocentos", "novecentos",
]

const CENTO = "cem"

function converterCentenas(n: number): string {
  if (n === 0) return ""
  if (n === 100) return CENTO

  const c = Math.floor(n / 100)
  const d = Math.floor((n % 100) / 10)
  const u = n % 10

  let result = c > 0 ? CENTENAS[c] : ""

  const resto = n % 100
  if (resto > 0) {
    if (result) result += " e "
    if (resto < 10) {
      result += UNIDADES[resto]
    } else if (resto in DEZENAS_ESPECIAIS) {
      result += DEZENAS_ESPECIAIS[resto]
    } else {
      result += DEZENAS[d]
      if (u > 0) result += " e " + UNIDADES[u]
    }
  }

  return result
}

/**
 * Converte um número (0 a 999.999.999) para sua forma por extenso em português.
 * Ex: 123 → "cento e vinte e três"
 */
export function numeroParaExtenso(n: number): string {
  if (!Number.isInteger(n)) {
    return "Número inválido"
  }
  if (n < 0 || n > 999_999_999) {
    return "Número fora do intervalo (0 a 999.999.999)"
  }
  if (n === 0) return "zero"

  const bilhoes = Math.floor(n / 1_000_000_000)
  const milhoes = Math.floor((n % 1_000_000_000) / 1_000_000)
  const milhares = Math.floor((n % 1_000_000) / 1_000)
  const resto = n % 1_000

  const partes: string[] = []

  if (bilhoes > 0) {
    partes.push(bilhoes === 1 ? "um bilhão" : converterCentenas(bilhoes) + " bilhões")
  }
  if (milhoes > 0) {
    partes.push(milhoes === 1 ? "um milhão" : converterCentenas(milhoes) + " milhões")
  }
  if (milhares > 0) {
    partes.push(milhares === 1 ? "mil" : converterCentenas(milhares) + " mil")
  }
  if (resto > 0) {
    if (partes.length > 0 && resto < 100) {
      partes.push("e " + converterCentenas(resto))
    } else {
      partes.push(converterCentenas(resto))
    }
  }

  return partes.join(" e ").replace(/ e e /g, " e ")
}

/**
 * Converte um valor monetário (número decimal) para extenso em reais.
 * Ex: 123.45 → "cento e vinte e três reais e quarenta e cinco centavos"
 */
export function valorMonetarioParaExtenso(valor: number): string {
  if (valor < 0 || valor > 999_999_999.99) {
    return "Valor fora do intervalo"
  }

  const reais = Math.floor(valor)
  const centavos = Math.round((valor - reais) * 100)

  let result = ""

  if (reais === 0) {
    result = "zero reais"
  } else {
    result = numeroParaExtenso(reais) + (reais === 1 ? " real" : " reais")
  }

  if (centavos > 0) {
    const centStr = centavos === 1 ? "um centavo" : numeroParaExtenso(centavos) + " centavos"
    result += " e " + centStr
  }

  return result
}
