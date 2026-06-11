"use client"

import { useState } from "react"
import { formatSQL, minifySQL } from "@/lib/sqlFormatter"
import { CopyButton } from "./CopyButton"

export function SqlFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"format" | "minify">("format")

  const handleProcess = () => {
    if (!input.trim()) {
      setError("Digite uma consulta SQL.")
      setOutput("")
      return
    }

    try {
      setError("")
      const result =
        mode === "format" ? formatSQL(input) : minifySQL(input)
      setOutput(result)
    } catch (e) {
      setError(`Erro: ${(e as Error).message}`)
      setOutput("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-secondary">
          <input
            type="radio"
            name="sqlMode"
            checked={mode === "format"}
            onChange={() => setMode("format")}
            className="h-4 w-4 border-border bg-card text-accent"
          />
          Formatado
        </label>
        <label className="flex items-center gap-2 text-sm text-secondary">
          <input
            type="radio"
            name="sqlMode"
            checked={mode === "minify"}
            onChange={() => setMode("minify")}
            className="h-4 w-4 border-border bg-card text-accent"
          />
          Minificado
        </label>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          SQL de entrada
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
            setOutput("")
          }}
          rows={8}
          placeholder={`SELECT id, nome, email FROM usuarios WHERE ativo = 1 ORDER BY nome ASC;`}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={handleProcess}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="4" y1="4" x2="9" y2="9" />
        </svg>
        {mode === "format" ? "Formatar SQL" : "Minificar SQL"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {error}
        </div>
      )}

      {output && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <pre className="max-h-80 overflow-auto font-mono text-sm leading-relaxed text-primary">
              {output}
            </pre>
          </div>
          <CopyButton text={output} label="Copiar SQL" />
        </div>
      )}
    </div>
  )
}
