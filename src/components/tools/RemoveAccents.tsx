"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

export function RemoveAccents() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const normalize = () => {
    setResult(
      input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">Texto com acentos</label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setResult("")
          }}
          rows={5}
          placeholder="Coração, música, àgua..."
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={normalize}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Remover Acentos
      </button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="font-mono text-sm text-primary">{result}</p>
          </div>
          <CopyButton text={result} />
        </div>
      )}
    </div>
  )
}
