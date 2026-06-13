"use client"

import { useState } from "react"
import { convertBase, baseName } from "@/lib/bases"
import { CopyButton } from "./CopyButton"

const BASES = [2, 8, 10, 16] as const

export function BaseConverter() {
  const [input, setInput] = useState("")
  const [fromBase, setFromBase] = useState(10)
  const [toBase, setToBase] = useState(2)
  const [results, setResults] = useState<{ base: number; value: string }[]>([])
  const [error, setError] = useState("")

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Informe um número para converter.")
      setResults([])
      return
    }

    try {
      setError("")
      const converted = BASES.map((base) => ({
        base,
        value: convertBase(input, fromBase, base),
      }))
      setResults(converted)
    } catch (e) {
      setError((e as Error).message)
      setResults([])
    }
  }

  const swapBases = () => {
    setFromBase(toBase)
    setToBase(fromBase)
    setResults([])
    setError("")
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Da base
          </label>
          <select
            value={fromBase}
            onChange={(e) => {
              setFromBase(Number(e.target.value))
              setResults([])
              setError("")
            }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          >
            {BASES.map((b) => (
              <option key={b} value={b}>
                {baseName(b)} ({b})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={swapBases}
            className="mb-0.5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16V4m0 0L3 8m4-4 4 4" />
              <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
            </svg>
            Inverter
          </button>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Número de entrada
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setResults([])
            setError("")
          }}
          placeholder="255"
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={handleConvert}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="4" y1="4" x2="9" y2="9" />
        </svg>
        Converter
      </button>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {error}
        </div>
      )}

      {results.length > 0 && !error && (
        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.base} className="flex items-center gap-4">
              <span className="w-32 shrink-0 text-sm font-medium text-secondary">
                {baseName(r.base)}
              </span>
              <div className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary">
                {r.value}
              </div>
              <CopyButton text={r.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
