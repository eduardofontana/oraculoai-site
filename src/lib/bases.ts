export function convertBase(
  value: string,
  fromBase: number,
  toBase: number
): string {
  if (value === "" || value === "-") return ""

  const negative = value.startsWith("-")
  const absValue = negative ? value.slice(1) : value

  const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, fromBase)
  const upperValue = absValue.toUpperCase()

  for (const char of upperValue) {
    if (!validChars.includes(char)) {
      throw new Error(`Caractere inválido "${char}" para base ${fromBase}`)
    }
  }

  // Converte para decimal primeiro
  let decimal = BigInt(0)
  for (const char of upperValue) {
    const digit = validChars.indexOf(char)
    decimal = decimal * BigInt(fromBase) + BigInt(digit)
  }

  // Converte decimal para a base de destino
  if (decimal === BigInt(0)) return "0"

  const targetChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, toBase)
  let result = ""
  let temp = decimal

  while (temp > BigInt(0)) {
    const remainder = Number(temp % BigInt(toBase))
    result = targetChars[remainder] + result
    temp = temp / BigInt(toBase)
  }

  return negative ? "-" + result : result
}

export function baseName(base: number): string {
  const names: Record<number, string> = {
    2: "Binário",
    8: "Octal",
    10: "Decimal",
    16: "Hexadecimal",
  }
  return names[base] ?? `Base ${base}`
}
