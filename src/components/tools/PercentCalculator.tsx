"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

type Modo = "porcentagem-de" | "quanto-e" | "aumento-reducao"

export function PercentCalculator() {
  const [modo, setModo] = useState<Modo>("porcentagem-de")
  const [valor1, setValor1] = useState("")
  const [valor2, setValor2] = useState("")
  const [resultado, setResultado] = useState<{
    texto: string
    detalhe?: string
  } | null>(null)

  const calcular = () => {
    const v1 = Number(valor1.replace(",", "."))
    const v2 = Number(valor2.replace(",", "."))

    if (isNaN(v1) || isNaN(v2)) {
      setResultado({ texto: "Digite valores numéricos válidos" })
      return
    }

    switch (modo) {
      case "porcentagem-de": {
        // Quanto é X% de Y?
        const res = (v1 / 100) * v2
        setResultado({
          texto: `${v1}% de ${formatNumber(v2)} = ${formatNumber(res)}`,
          detalhe: `${formatNumber(v1)} ÷ 100 × ${formatNumber(v2)} = ${formatNumber(res)}`,
        })
        break
      }
      case "quanto-e": {
        // X é quantos % de Y?
        if (v2 === 0) {
          setResultado({ texto: "O segundo valor não pode ser zero" })
          return
        }
        const res = (v1 / v2) * 100
        setResultado({
          texto: `${formatNumber(v1)} é ${formatNumber(res)}% de ${formatNumber(v2)}`,
          detalhe: `${formatNumber(v1)} ÷ ${formatNumber(v2)} × 100 = ${formatNumber(res)}%`,
        })
        break
      }
      case "aumento-reducao": {
        // Aumento/redução percentual de X para Y
        if (v1 === 0) {
          setResultado({ texto: "O valor original não pode ser zero" })
          return
        }
        const dif = ((v2 - v1) / v1) * 100
        const sinal = dif >= 0 ? "aumento" : "redução"
        setResultado({
          texto: `${formatNumber(v1)} → ${formatNumber(v2)}: ${sinal} de ${formatNumber(Math.abs(dif))}%`,
          detalhe: `((${formatNumber(v2)} − ${formatNumber(v1)}) ÷ ${formatNumber(v1)}) × 100 = ${formatNumber(Math.abs(dif))}%`,
        })
        break
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Seletor de modo */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "porcentagem-de" as Modo, label: "Quanto é X% de Y?" },
          { key: "quanto-e" as Modo, label: "X é quantos % de Y?" },
          { key: "aumento-reducao" as Modo, label: "Aumento/redução %" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setModo(key); setResultado(null) }}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
              modo === key
                ? "bg-accent text-white"
                : "border border-border bg-card text-secondary hover:border-accent-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            {modo === "porcentagem-de" ? "Porcentagem (%)" : "Valor X"}
          </label>
          <input
            type="text"
            value={valor1}
            onChange={(e) => setValor1(e.target.value)}
            placeholder="Ex: 15"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            {modo === "porcentagem-de" ? "Valor Y" : "Valor Y"}
          </label>
          <input
            type="text"
            value={valor2}
            onChange={(e) => setValor2(e.target.value)}
            placeholder="Ex: 200"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={calcular}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="12" y2="14" />
        </svg>
        Calcular
      </button>

      {resultado && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="text-lg font-bold text-primary">{resultado.texto}</p>
            {resultado.detalhe && (
              <p className="mt-2 text-sm text-muted">{resultado.detalhe}</p>
            )}
          </div>
          <CopyButton text={resultado.texto} />
        </div>
      )}
    </div>
  )
}

function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}
