"use client"

import { useState } from "react"
import { convertCssUnit, cssUnitNames, type CssUnitType } from "@/lib/cssUnits"
import { CopyButton } from "./CopyButton"

const UNITS: CssUnitType[] = ["px", "rem", "em", "%", "vw", "vh"]

export function CssUnitConverter() {
  const [value, setValue] = useState("16")
  const [fromUnit, setFromUnit] = useState<CssUnitType>("px")
  const [toUnit, setToUnit] = useState<CssUnitType>("rem")
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [baseFontSize, setBaseFontSize] = useState(16)
  const [viewportWidth, setViewportWidth] = useState(1440)
  const [viewportHeight, setViewportHeight] = useState(900)

  const handleConvert = () => {
    const numValue = Number.parseFloat(value)
    if (Number.isNaN(numValue)) {
      setError("Digite um valor numérico válido.")
      setResult(null)
      return
    }

    setError("")
    const converted = convertCssUnit(numValue, fromUnit, toUnit, {
      baseFontSize,
      viewportWidth,
      viewportHeight,
    })
    setResult(converted)
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setResult(null)
    setError("")
  }

  const resultText =
    result !== null
      ? `${result.toFixed(4)}${toUnit}`
      : ""

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            De
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setResult(null)
                setError("")
              }}
              step="any"
              className="w-28 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <select
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value as CssUnitType)
                setResult(null)
              }}
              className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u} ({cssUnitNames[u]})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={swapUnits}
            className="mb-0.5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16V4m0 0L3 8m4-4 4 4" />
              <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
            </svg>
            Inverter
          </button>
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-secondary">
              Para
            </label>
            <select
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value as CssUnitType)
                setResult(null)
              }}
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u} ({cssUnitNames[u]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <details className="rounded-lg border border-border bg-card">
        <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary">
          Configurações avançadas
        </summary>
        <div className="grid gap-4 border-t border-border px-4 py-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs text-muted">
              Tamanho base da fonte (px)
            </label>
            <input
              type="number"
              value={baseFontSize}
              onChange={(e) => {
                setBaseFontSize(Number(e.target.value))
                setResult(null)
              }}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary focus:border-accent-border focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">
              Viewport width (px)
            </label>
            <input
              type="number"
              value={viewportWidth}
              onChange={(e) => {
                setViewportWidth(Number(e.target.value))
                setResult(null)
              }}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary focus:border-accent-border focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">
              Viewport height (px)
            </label>
            <input
              type="number"
              value={viewportHeight}
              onChange={(e) => {
                setViewportHeight(Number(e.target.value))
                setResult(null)
              }}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary focus:border-accent-border focus:outline-none"
            />
          </div>
        </div>
      </details>

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

      {result !== null && !error && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="text-center font-mono text-2xl font-bold tracking-wider text-primary">
              {value}{fromUnit} = {resultText}
            </p>
          </div>
          <CopyButton text={resultText} />
        </div>
      )}
    </div>
  )
}
