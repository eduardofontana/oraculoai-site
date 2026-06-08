"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

const units = ["B", "KB", "MB", "GB", "TB"]

function convertBytes(value: number, from: string, to: string): number {
  const fromIdx = units.indexOf(from)
  const toIdx = units.indexOf(to)
  const diff = toIdx - fromIdx
  return value / Math.pow(1024, diff)
}

export function ByteCalculator() {
  const [value, setValue] = useState("1")
  const [fromUnit, setFromUnit] = useState("GB")
  const [toUnit, setToUnit] = useState("MB")
  const [result, setResult] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Valor</label>
          <input type="number" step="any" value={value}
            onChange={(e) => { setResult(null); setValue(e.target.value) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">De</label>
          <select value={fromUnit} onChange={(e) => { setResult(null); setFromUnit(e.target.value) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Para</label>
          <select value={toUnit} onChange={(e) => { setResult(null); setToUnit(e.target.value) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={() => setResult(convertBytes(parseFloat(value) || 0, fromUnit, toUnit))}
            className="w-full rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]">
            Converter
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-lg border border-border bg-bg p-4">
            <p className="text-center font-mono text-xl font-bold text-primary">
              {parseFloat(value)} {fromUnit} = {result.toLocaleString("pt-BR", { maximumFractionDigits: 4 })} {toUnit}
            </p>
          </div>
          <CopyButton text={`${parseFloat(value)} ${fromUnit} = ${result.toLocaleString("pt-BR", { maximumFractionDigits: 4 })} ${toUnit}`} />
        </div>
      )}
    </div>
  )
}
