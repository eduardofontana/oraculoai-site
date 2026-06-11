import { randInt } from "./rand"

/**
 * Gera um número de PIS/PASEP (11 dígitos) com dígito verificador.
 */
export function generatePIS(pontuacao = true): string {
  const rand = randInt

  // Gera os 10 primeiros dígitos (não pode começar com 0)
  const n = [1 + rand(9), ...Array.from({ length: 9 }, () => rand(9))]

  // Pesos para cálculo do dígito verificador
  const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const soma = n.reduce((s, v, i) => s + v * pesos[i], 0)
  const resto = soma % 11
  const dv = resto < 2 ? 0 : 11 - resto

  n.push(dv)

  const pis = n.join("")
  if (pontuacao) {
    return `${pis.slice(0, 3)}.${pis.slice(3, 7)}.${pis.slice(7, 10)}-${pis.slice(10)}`
  }
  return pis
}

/**
 * Valida um número de PIS/PASEP (11 dígitos).
 */
export function validatePIS(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  const n = digits.split("").map(Number)

  const pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const soma = n.slice(0, 10).reduce((s, v, i) => s + v * pesos[i], 0)
  const resto = soma % 11
  const dvEsperado = resto < 2 ? 0 : 11 - resto

  return n[10] === dvEsperado
}
