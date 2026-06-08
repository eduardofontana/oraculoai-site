"use client"

import { useState } from "react"
import { isValidJson, formatJson, minifyJson } from "@/lib/validators"
import { CopyButton } from "./CopyButton"

export function JsonFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const handleFormat = () => {
    setError("")
    if (!isValidJson(input)) {
      setError("JSON inválido. Verifique a sintaxe.")
      setOutput("")
      return
    }
    setOutput(formatJson(input))
  }

  const handleMinify = () => {
    setError("")
    if (!isValidJson(input)) {
      setError("JSON inválido. Verifique a sintaxe.")
      setOutput("")
      return
    }
    setOutput(minifyJson(input))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Cole seu JSON
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
          }}
          rows={8}
          placeholder='{"nome": "Exemplo"}'
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleFormat}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
        >
          Formatar
        </button>
        <button
          onClick={handleMinify}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
        >
          Minificar
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-sm font-bold text-red-500">{error}</p>
        </div>
      )}

      {output && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <pre className="overflow-x-auto font-mono text-sm text-primary">
              {output}
            </pre>
          </div>
          <CopyButton text={output} />
        </div>
      )}
    </div>
  )
}
