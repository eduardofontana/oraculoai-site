"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

export function TextInverter() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [mode, setMode] = useState<"chars" | "words">("chars")

  const invert = () => {
    if (mode === "chars") {
      setResult(input.split("").reverse().join(""))
    } else {
      setResult(input.split(/\s+/).reverse().join(" "))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={() => setMode("chars")}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${mode === "chars" ? "bg-accent text-white" : "border border-border bg-card text-secondary hover:border-accent-border"}`}
        >
          Inverter caracteres
        </button>
        <button
          onClick={() => setMode("words")}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${mode === "words" ? "bg-accent text-white" : "border border-border bg-card text-secondary hover:border-accent-border"}`}
        >
          Inverter palavras
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">Texto original</label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setResult("")
          }}
          rows={4}
          placeholder="Digite o texto..."
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={invert}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Inverter
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
