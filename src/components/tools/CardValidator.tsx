"use client"

import { useState } from "react"
import { validateCardNumber, detectCardBrand } from "@/lib/luhn"

export function CardValidator() {
  const [value, setValue] = useState("")
  const [result, setResult] = useState<boolean | null>(null)
  const [brand, setBrand] = useState("")

  const handleValidate = () => {
    setResult(validateCardNumber(value))
    setBrand(detectCardBrand(value))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Número do cartão
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setResult(null)
          }}
          placeholder="0000 0000 0000 0000"
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={handleValidate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Validar Cartão
      </button>

      {result !== null && (
        <div className={`rounded-lg border p-4 ${result ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
          <p className={`text-sm font-bold ${result ? "text-green-500" : "text-red-500"}`}>
            {result ? "Cartão válido" : "Cartão inválido"}
          </p>
          {result && brand && (
            <p className="mt-1 text-sm text-secondary">Bandeira: {brand}</p>
          )}
        </div>
      )}
    </div>
  )
}
