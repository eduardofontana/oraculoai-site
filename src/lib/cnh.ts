export function generateCNH(): string {
  const rand = (n: number) => Math.floor(Math.random() * n)
  const n = Array.from({ length: 9 }, () => rand(9))

  let d1 = 0
  for (let i = 0; i < 9; i++) d1 += n[i] * (9 - i)
  d1 = d1 % 11
  if (d1 > 9) d1 = 0
  n.push(d1)

  let d2 = 0
  for (let i = 0; i < 9; i++) d2 += n[i] * (1 + i)
  d2 = d2 % 11
  if (d2 > 9) d2 = 0
  n.push(d2)

  return n.join("")
}
