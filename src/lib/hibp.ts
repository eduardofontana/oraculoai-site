export interface PwnedPasswordResult {
  pwned: boolean
  count: number
  hashPrefix: string
  hashSuffix: string
}

/**
 * Computa o hash SHA-1 de uma string (formato hexadecimal, uppercase).
 */
async function sha1(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text.normalize("NFC"))
  const hashBuffer = await crypto.subtle.digest("SHA-1", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()
  return hashHex
}

/**
 * Verifica se uma senha foi exposta em vazamentos de dados usando
 * o modelo k-anonymity do Have I Been Pwned.
 *
 * A senha NUNCA sai do navegador — apenas os primeiros 5 caracteres
 * do hash SHA-1 são enviados para a API.
 *
 * @param password - A senha a ser verificada
 * @returns Resultado com indicação se foi encontrada e quantas vezes
 * @throws Erro de rede ou parsing
 */
export async function checkPwnedPassword(
  password: string,
): Promise<PwnedPasswordResult> {
  if (!password) {
    throw new Error("A senha não pode estar vazia.")
  }

  const hash = await sha1(password)
  const prefix = hash.slice(0, 5)
  const suffix = hash.slice(5)

  // Usa o proxy interno para manter CSP restrita e repassar o header Add-Padding.
  const response = await fetch(`/api/hibp/range?prefix=${prefix}`, {
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(
      errorBody.error ||
        `Falha ao consultar a API de vazamentos (${response.status}). Tente novamente mais tarde.`,
    )
  }

  const text = await response.text()
  const lines = text.split("\n")

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const [hashSuffix, countStr] = trimmed.split(":")
    if (hashSuffix?.toUpperCase() === suffix) {
      const count = Number.parseInt(countStr, 10)
      return {
        pwned: count > 0,
        count: Number.isFinite(count) ? count : 0,
        hashPrefix: prefix,
        hashSuffix,
      }
    }
  }

  return { pwned: false, count: 0, hashPrefix: prefix, hashSuffix: suffix }
}
