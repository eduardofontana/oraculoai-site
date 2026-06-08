"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

export function LineConverter() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const convert = (target: "CRLF" | "LF" | "CR") => {
    let t = input
    switch (target) {
      case "CRLF":
        t = t.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, "\r\n")
        break
      case "LF":
        t = t.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
        break
      case "CR":
        t = t.replace(/\r\n/g, "\n").replace(/\n/g, "\r")
        break
    }
    setResult(t)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">Texto original</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult("") }}
          rows={6}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {(["CRLF", "LF", "CR"] as const).map((type) => (
          <button
            key={type}
            onClick={() => convert(type)}
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
          >
            Converter para {type}
          </button>
        ))}
      </div>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <pre className="overflow-x-auto font-mono text-sm text-primary">{result}</pre>
          </div>
          <CopyButton text={result} />
        </div>
      )}
    </div>
  )
}
