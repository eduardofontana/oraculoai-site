import { randInt } from "./rand"

/**
 * Gera um número de RG fictício no formato popular SS-XX.XXX.XXX-X
 * Onde SS geralmente representa a sigla do estado (SP, MG, RJ, etc).
 */
export function generateRG(pontuacao = true): string {
  const rand = randInt

  const digitos = Array.from({ length: 8 }, () => rand(9))

  // Dígito verificador simples (soma dos dígitos módulo 10)
  const soma = digitos.reduce((s, v) => s + v, 0)
  const dv = soma % 10

  digitos.push(dv)

  const estados = ["SP", "MG", "RJ", "RS", "PR", "BA", "DF", "GO", "PE", "CE"]
  const estado = estados[rand(estados.length)]

  const rg = digitos.join("")
  if (pontuacao) {
    return `${estado}-${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${rg.slice(8)}`
  }
  return `${estado}${rg}`
}

/**
 * Valida um RG no formato SS-XX.XXX.XXX-X ou SSXXXXXXXXX
 * Verifica o formato e o dígito verificador.
 */
export function validateRG(value: string): boolean {
  const cleaned = value.replace(/[^\dA-Za-z]/g, "")

  // Deve ter pelo menos 2 letras + 9 dígitos = 11 caracteres
  if (cleaned.length < 11) return false

  // Extrai parte alfabética (estado) e parte numérica
  const letras = cleaned.match(/[A-Za-z]/g)
  const digitosStr = cleaned.replace(/[A-Za-z]/g, "")

  if (!letras || letras.length < 2 || digitosStr.length !== 9) return false

  // Verifica dígito verificador
  const digitos = digitosStr.split("").slice(0, 8).map(Number)
  const dvInformado = Number.parseInt(digitosStr[8], 10)
  const soma = digitos.reduce((s, v) => s + v, 0)
  const dvEsperado = soma % 10

  return dvInformado === dvEsperado
}
