"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

export function CaseConverter() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [mode, setMode] = useState<string>("")

  const convert = (type: string) => {
    setMode(type)
    switch (type) {
      case "upper":
        setResult(input.toUpperCase())
        break
      case "lower":
        setResult(input.toLowerCase())
        break
      case "capitalize":
        setResult(
          input
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase())
        )
        break
      case "title":
        setResult(
          input
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase())
        )
        break
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Texto original
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setResult("")
          }}
          rows={5}
          placeholder="Digite seu texto aqui..."
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {[
          { key: "upper", label: "MAIÚSCULAS" },
          { key: "lower", label: "minúsculas" },
          { key: "capitalize", label: "Capitalizado" },
          { key: "title", label: "Formato Título" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => convert(key)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
              mode === key
                ? "bg-accent text-white"
                : "border border-border bg-card text-secondary hover:border-accent-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

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
