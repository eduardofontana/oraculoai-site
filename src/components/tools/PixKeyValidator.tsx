"use client"

import { useState } from "react"
import { validateCPF } from "@/lib/cpf"
import { validateCNPJ } from "@/lib/cnpj"

type PixKeyType = "CPF" | "CNPJ" | "E-mail" | "Telefone" | "Aleatória"

function detectPixKeyType(key: string): { type: PixKeyType; valid: boolean } {
  const cleaned = key.replace(/\D/g, "")
  if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(key)) return { type: "E-mail", valid: true }
  if (/^\+?\d{10,15}$/.test(key.replace(/[\s()-]/g, ""))) return { type: "Telefone", valid: true }
  if (cleaned.length === 11 && validateCPF(key)) return { type: "CPF", valid: true }
  if (cleaned.length === 14 && validateCNPJ(key)) return { type: "CNPJ", valid: true }
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key)) return { type: "Aleatória", valid: true }
  return { type: "Aleatória", valid: false }
}

export function PixKeyValidator() {
  const [value, setValue] = useState("")
  const [result, setResult] = useState<{ type: PixKeyType; valid: boolean } | null>(null)

  const handleValidate = () => {
    setResult(detectPixKeyType(value))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Chave Pix
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setResult(null)
          }}
          placeholder="CPF, CNPJ, e-mail, telefone ou chave aleatória"
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={handleValidate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Validar Chave Pix
      </button>

      {result && (
        <div className={`rounded-lg border p-4 ${result.valid ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}>
          <p className={`text-sm font-bold ${result.valid ? "text-green-500" : "text-red-500"}`}>
            {result.valid ? "Chave Pix válida" : "Chave Pix inválida"}
          </p>
          <p className="mt-1 text-sm text-secondary">Tipo: {result.type}</p>
        </div>
      )}
    </div>
  )
}
