"use client"

import { useState, useCallback } from "react"
import { CopyButton } from "./CopyButton"

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/")
  while (base64.length % 4) base64 += "="
  return atob(base64)
}

const MAX_JWT_LENGTH = 32768

export function JwtDecoder() {
  const [input, setInput] = useState("")
  const [header, setHeader] = useState("")
  const [payload, setPayload] = useState("")
  const [error, setError] = useState("")

  const decode = useCallback(() => {
    setError("")
    setHeader("")
    setPayload("")

    const trimmed = input.trim()
    if (trimmed.length > MAX_JWT_LENGTH) {
      setError(`JWT muito longo (máx ${MAX_JWT_LENGTH} caracteres).`)
      return
    }

    const parts = trimmed.split(".")
    if (parts.length !== 3) {
      setError("JWT inválido. Deve conter 3 partes separadas por ponto.")
      return
    }
    try {
      const h = JSON.parse(base64UrlDecode(parts[0]))
      const p = JSON.parse(base64UrlDecode(parts[1]))
      setHeader(JSON.stringify(h, null, 2))
      setPayload(JSON.stringify(p, null, 2))
    } catch {
      setError("Erro ao decodificar o JWT. Verifique se o token é válido.")
    }
  }, [input])

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">JWT Token</label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
            setHeader("")
            setPayload("")
          }}
          rows={4}
          placeholder="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0..."
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={decode}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Decodificar JWT
      </button>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-sm font-bold text-red-500">{error}</p>
        </div>
      )}

      {payload && (
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Header</p>
            <div className="rounded-lg border border-border bg-bg p-4">
              <pre className="overflow-x-auto font-mono text-sm text-primary">{header}</pre>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Payload</p>
            <div className="rounded-lg border border-border bg-bg p-4">
              <pre className="overflow-x-auto font-mono text-sm text-primary">{payload}</pre>
            </div>
          </div>
          <CopyButton text={payload} label="Copiar payload" />
        </div>
      )}
    </div>
  )
}
