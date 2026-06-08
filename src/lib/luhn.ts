export function validateCardNumber(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let alternate = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10)
    if (alternate) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alternate = !alternate
  }
  return sum % 10 === 0
}

export function detectCardBrand(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (/^4/.test(digits)) return "Visa"
  if (/^5[1-5]/.test(digits)) return "Mastercard"
  if (/^3[47]/.test(digits)) return "Amex"
  if (/^6(?:011|5)/.test(digits)) return "Discover"
  if (/^3(?:0[0-5]|[68])/.test(digits)) return "Diners Club"
  if (/^352[89]|^35[3-8]/.test(digits)) return "JCB"
  if (/^50|^60[0-9]|^63|^65|^67/.test(digits)) return "Elo"
  if (/^606282|^3841(?:[0|4|6|8])|^637(?:0|1|2|5|6|8|9)|^638|^639/.test(digits)) return "Hipercard"
  return "Desconhecida"
}
