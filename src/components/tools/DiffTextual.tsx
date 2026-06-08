"use client"

import { useState } from "react"

export function DiffTextual() {
  const [textA, setTextA] = useState("")
  const [textB, setTextB] = useState("")
  const [result, setResult] = useState<{ a: string[]; b: string[]; diffs: number[] } | null>(null)

  const compare = () => {
    const linesA = textA.split("\n")
    const linesB = textB.split("\n")
    const maxLen = Math.max(linesA.length, linesB.length)
    const diffs: number[] = []
    for (let i = 0; i < maxLen; i++) {
      if (linesA[i] !== linesB[i]) diffs.push(i)
    }
    setResult({ a: linesA, b: linesB, diffs })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Texto original</label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={8}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Texto modificado</label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={8}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={compare}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Comparar
      </button>

      {result && (
        <div className="space-y-4">
          {result.diffs.length === 0 ? (
            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
              <p className="text-sm font-bold text-green-500">Textos idênticos</p>
            </div>
          ) : (
            <div>
              <p className="mb-2 text-sm text-secondary">{result.diffs.length} diferença(s) encontrada(s)</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-bg p-4 font-mono text-sm">
                  {result.a.map((line, i) => (
                    <p key={i} className={result.diffs.includes(i) ? "bg-red-500/10 text-red-500" : "text-primary"}>
                      {line || " "}
                    </p>
                  ))}
                </div>
                <div className="rounded-lg border border-border bg-bg p-4 font-mono text-sm">
                  {result.b.map((line, i) => (
                    <p key={i} className={result.diffs.includes(i) ? "bg-green-500/10 text-green-500" : "text-primary"}>
                      {line || " "}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
