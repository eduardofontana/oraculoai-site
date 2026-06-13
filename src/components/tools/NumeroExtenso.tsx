"use client"

import { useState } from "react"
import { numeroParaExtenso, valorMonetarioParaExtenso } from "@/lib/extenso"
import { CopyButton } from "./CopyButton"

export function NumeroExtenso() {
  const [numero, setNumero] = useState("1234")
  const [modoMonetario, setModoMonetario] = useState(false)
  const [resultado, setResultado] = useState("")

  const handleConverter = () => {
    const limpo = numero.replace(/\./g, "").replace(",", ".")
    const valor = Number(limpo)

    if (isNaN(valor)) {
      setResultado("Digite um número válido")
      return
    }

    if (modoMonetario) {
      setResultado(valorMonetarioParaExtenso(valor))
    } else {
      // Se for decimal no modo não-monetário, alerta
      if (!Number.isInteger(valor)) {
        setResultado("Use o modo monetário para valores com centavos")
        return
      }
      setResultado(numeroParaExtenso(valor))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Número
        </label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Ex: 1234 ou 1234,56"
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
        <p className="mt-1 text-xs text-muted">
          Aceita números de 0 a 999.999.999 (inteiros) ou valores monetários
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm text-secondary">
        <input
          type="checkbox"
          checked={modoMonetario}
          onChange={(e) => setModoMonetario(e.target.checked)}
          className="h-4 w-4 rounded border-border bg-card text-accent"
        />
        Modo monetário (ex: R$ 1.234,56 → &quot;um mil duzentos e trinta e quatro reais e cinquenta e seis centavos&quot;)
      </label>

      <button
        onClick={handleConverter}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
        Converter
      </button>

      {resultado && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="text-lg font-medium leading-relaxed text-primary">{resultado}</p>
          </div>
          <CopyButton text={resultado} />
        </div>
      )}
    </div>
  )
}
