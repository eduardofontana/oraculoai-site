export async function generateHash(
  algorithm: "MD5" | "SHA-1" | "SHA-256",
  text: string
): Promise<string> {
  if (algorithm === "MD5") {
    const { MD5 } = await import("crypto-js")
    return MD5(text).toString()
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}
