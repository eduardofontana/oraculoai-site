"use client"

import { useState } from "react"
import { validateCPF } from "@/lib/cpf"

export function CpfValidator() {
  const [value, setValue] = useState("")
  const [result, setResult] = useState<boolean | null>(null)

  const handleValidate = () => {
    setResult(validateCPF(value))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Digite o CPF
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setResult(null)
          }}
          placeholder="000.000.000-00"
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
        Validar CPF
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
            {result ? "CPF válido" : "CPF inválido"}
          </p>
        </div>
      )}
    </div>
  )
}
