import { randInt } from "./rand"

export function generateCNPJ(pontuacao = true): string {
  const rand = randInt

  const n = [
    1 + rand(9),
    rand(9),
    ...Array.from({ length: 6 }, () => rand(9)),
    0, 0, 0, 1,
  ]

  const calcDV = (base: number[]) => {
    const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const sum = base.reduce((s, v, i) => s + v * w1[i], 0)
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }

  const d1 = calcDV(n.slice(0, 12))
  n.push(d1)

  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const sum2 = n.reduce((s, v, i) => s + v * w2[i], 0)
  const r2 = sum2 % 11
  const d2 = r2 < 2 ? 0 : 11 - r2
  n.push(d2)

  const cnpj = n.join("")
  if (pontuacao) {
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`
  }
  return cnpj
}

export function validateCNPJ(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 14) return false
  if (/^(\d)\1{13}$/.test(digits)) return false

  const n = digits.split("").map(Number)

  const calcDV = (base: number[], pesos: number[]) => {
    const sum = base.reduce((s, v, i) => s + v * pesos[i], 0)
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  if (n[12] !== calcDV(n.slice(0, 12), w1)) return false

  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  if (n[13] !== calcDV(n.slice(0, 13), w2)) return false

  return true
}
