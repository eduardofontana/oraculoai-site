"use client"

import { useState } from "react"
import { validatePIS } from "@/lib/pis"

export function PisValidator() {
  const [value, setValue] = useState("")
  const [result, setResult] = useState<boolean | null>(null)

  const handleValidate = () => {
    setResult(validatePIS(value))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Digite o PIS/PASEP
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setResult(null)
          }}
          placeholder="123.4567.890-1"
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={handleValidate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        Validar PIS/PASEP
      </button>

      {result !== null && (
        <div
          className={`rounded-lg border p-4 ${
            result
              ? "border-green-500/30 bg-green-500/5 text-green-500"
              : "border-red-500/30 bg-red-500/5 text-red-500"
          }`}
        >
          <p className="text-sm font-bold">
            {result ? "PIS/PASEP válido" : "PIS/PASEP inválido"}
          </p>
        </div>
      )}
    </div>
  )
}
