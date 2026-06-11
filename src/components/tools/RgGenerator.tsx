"use client"

import { useState } from "react"
import { generateRG } from "@/lib/rg"
import { CopyButton } from "./CopyButton"

export function RgGenerator() {
  const [rg, setRg] = useState("")
  const [pontuacao, setPontuacao] = useState(true)

  const handleGenerate = () => {
    setRg(generateRG(pontuacao))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-secondary">
          <input
            type="checkbox"
            checked={pontuacao}
            onChange={(e) => setPontuacao(e.target.checked)}
            className="h-4 w-4 rounded border-border bg-card text-accent"
          />
          Com pontuação (SP-XX.XXX.XXX-X)
        </label>
      </div>

      <button
        onClick={handleGenerate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2v6h-6" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M3 12a9 9 0 0 0 15 6.7L21 16" />
        </svg>
        Gerar RG
      </button>

      {rg && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="font-mono text-xl font-bold tracking-wider text-primary">
              {rg}
            </p>
          </div>
          <CopyButton text={rg} />
        </div>
      )}
    </div>
  )
}
