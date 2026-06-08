"use client"

import { useState } from "react"
import { convertUnit, getUnits, unitCategories } from "@/lib/units"
import { CopyButton } from "./CopyButton"

export function UnitConverter() {
  const [category, setCategory] = useState("length")
  const [value, setValue] = useState("1")
  const [fromUnit, setFromUnit] = useState("m")
  const [toUnit, setToUnit] = useState("km")
  const [result, setResult] = useState<number | null>(null)

  const handleConvert = () => {
    const v = parseFloat(value)
    if (isNaN(v)) return
    setResult(convertUnit(category as "length" | "weight" | "temperature" | "data", v, fromUnit, toUnit))
  }

  const units = getUnits(category as "length" | "weight" | "temperature" | "data")

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {unitCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => { setCategory(cat.key); setFromUnit(getUnits(cat.key)[0]); setToUnit(getUnits(cat.key)[1] || getUnits(cat.key)[0]); setResult(null) }}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${category === cat.key ? "bg-accent text-white" : "border border-border bg-card text-secondary hover:border-accent-border"}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Valor</label>
          <input
            type="number"
            step="any"
            value={value}
            onChange={(e) => { setValue(e.target.value); setResult(null) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">De</label>
          <select
            value={fromUnit}
            onChange={(e) => { setFromUnit(e.target.value); setResult(null) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          >
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Para</label>
          <select
            value={toUnit}
            onChange={(e) => { setToUnit(e.target.value); setResult(null) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          >
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleConvert}
            className="w-full rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
          >
            Converter
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-lg border border-border bg-bg p-4">
            <p className="text-center font-mono text-xl font-bold text-primary">
              {parseFloat(value)} {fromUnit} = {result.toFixed(6)} {toUnit}
            </p>
          </div>
          <CopyButton text={`${parseFloat(value)} ${fromUnit} = ${result.toFixed(6)} ${toUnit}`} />
        </div>
      )}
    </div>
  )
}
