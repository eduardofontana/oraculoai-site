"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

const entityMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

const reverseMap: Record<string, string> = Object.fromEntries(
  Object.entries(entityMap).map(([k, v]) => [v, k])
)

export function HtmlEntities() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  const convert = () => {
    if (mode === "encode") {
      setOutput(input.replace(/[&<>"']/g, (c) => entityMap[c] || c))
    } else {
      setOutput(
        input.replace(/&(?:amp|lt|gt|quot|#\d{2,4});/g, (m) => reverseMap[m] || m)
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={() => setMode("encode")}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${mode === "encode" ? "bg-accent text-white" : "border border-border bg-card text-secondary hover:border-accent-border"}`}
        >
          Codificar
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${mode === "decode" ? "bg-accent text-white" : "border border-border bg-card text-secondary hover:border-accent-border"}`}
        >
          Decodificar
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          {mode === "encode" ? "Caracteres especiais (&, <, > etc.)" : "Entidades HTML (&amp;, &lt;, &gt; etc.)"}
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput("") }}
          rows={4}
          placeholder={mode === "encode" ? 'Cole seu HTML com &, <, > aqui' : '&lt;div class=&quot;exemplo&quot;&gt;'}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={convert}
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
