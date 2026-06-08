"use client"

import { useState, useCallback } from "react"

function minifyCSS(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim()
}

function minifyJS(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}()=+\-*/,;:!<>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim()
}

export function Minificador() {
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"css" | "js">("css")
  const [copied, setCopied] = useState(false)

  const output = mode === "css" ? minifyCSS(input) : minifyJS(input)
  const originalSize = new TextEncoder().encode(input).length
  const minifiedSize = new TextEncoder().encode(output).length
  const savings = originalSize > 0 ? ((1 - minifiedSize / originalSize) * 100).toFixed(1) : "0"

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [output])

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={() => setMode("css")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === "css"
              ? "bg-accent text-white"
              : "border border-border text-secondary hover:text-primary"
          }`}
        >
          CSS
        </button>
        <button
          onClick={() => setMode("js")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            mode === "js"
              ? "bg-accent text-white"
              : "border border-border text-secondary hover:text-primary"
          }`}
        >
          JavaScript
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
            Entrada
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder={`Cole seu ${mode === "css" ? "CSS" : "JavaScript"} aqui...`}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
            Minificado
          </label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              rows={10}
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary focus:outline-none"
            />
            {output && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-secondary transition hover:text-primary"
              >
                {copied ? "Copiado!" : "Copiar"}
              </button>
            )}
          </div>
        </div>
      </div>

      {input && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Original", value: `${(originalSize / 1024).toFixed(2)} KB` },
            { label: "Minificado", value: `${(minifiedSize / 1024).toFixed(2)} KB` },
            { label: "Economia", value: `${savings}%` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-bg p-3 text-center">
              <p className="font-display text-lg font-extrabold text-accent">{stat.value}</p>
              <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
