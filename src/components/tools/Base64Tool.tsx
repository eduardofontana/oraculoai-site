"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

export function Base64Tool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  const handleConvert = () => {
    if (!input.trim()) return
    try {
      if (mode === "encode") {
        setOutput(btoa(input))
      } else {
        setOutput(atob(input))
      }
    } catch {
      setOutput("Erro: texto inválido para decodificação Base64")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={() => setMode("encode")}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
            mode === "encode"
              ? "bg-accent text-white"
              : "border border-border bg-card text-secondary hover:border-accent-border"
          }`}
        >
          Codificar
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
            mode === "decode"
              ? "bg-accent text-white"
              : "border border-border bg-card text-secondary hover:border-accent-border"
          }`}
        >
          Decodificar
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          {mode === "encode" ? "Texto para codificar" : "Base64 para decodificar"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder={mode === "encode" ? "Texto qualquer..." : "SGVsbG8gV29ybGQ="}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={handleConvert}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        {mode === "encode" ? "Codificar" : "Decodificar"}
      </button>

      {output && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="break-all font-mono text-sm text-primary">{output}</p>
          </div>
          <CopyButton text={output} />
        </div>
      )}
    </div>
  )
}
