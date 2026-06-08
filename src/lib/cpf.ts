export function generateCPF(pontuacao = true): string {
  const rand = (n: number) => Math.floor(Math.random() * n)
  const n = Array.from({ length: 9 }, () => rand(9))

  const d1 = n.reduce((s, v, i) => s + v * (10 - i), 0) % 11
  n.push(d1 < 2 ? 0 : 11 - d1)

  const d2 = n.reduce((s, v, i) => s + v * (11 - i), 0) % 11
  n.push(d2 < 2 ? 0 : 11 - d2)

  const cpf = n.join("")
  if (pontuacao) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`
  }
  return cpf
}

export function validateCPF(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  const n = digits.split("").map(Number)

  const d1 = n.slice(0, 9).reduce((s, v, i) => s + v * (10 - i), 0) % 11
  if (n[9] !== (d1 < 2 ? 0 : 11 - d1)) return false

  const d2 = n.slice(0, 10).reduce((s, v, i) => s + v * (11 - i), 0) % 11
  if (n[10] !== (d2 < 2 ? 0 : 11 - d2)) return false

  return true
}
