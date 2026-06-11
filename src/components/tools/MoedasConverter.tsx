"use client"

import { useState } from "react"
import { converterMoeda, MOEDAS } from "@/lib/moedas"
import { CopyButton } from "./CopyButton"

const MOEDAS_LIST = Object.entries(MOEDAS)

export function MoedasConverter() {
  const [valor, setValor] = useState("100")
  const [origem, setOrigem] = useState("USD")
  const [destino, setDestino] = useState("BRL")
  const [resultado, setResultado] = useState<{
    valorConvertido: number
    taxa: number
    data: string
    usaFallback: boolean
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleConverter = async () => {
    const v = Number.parseFloat(valor)
    if (Number.isNaN(v) || v <= 0) {
      setError("Digite um valor válido.")
      return
    }

    setLoading(true)
    setError("")
    setResultado(null)

    try {
      const res = await converterMoeda(v, origem, destino)
      setResultado({
        valorConvertido: res.valorConvertido,
        taxa: res.taxa,
        data: res.data,
        usaFallback: res.usaFallback,
      })
    } catch {
      setError("Erro ao converter. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const swapMoedas = () => {
    setOrigem(destino)
    setDestino(origem)
    setResultado(null)
  }

  const formatMoney = (v: number) =>
    v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 6 })

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Valor
          </label>
          <input
            type="number"
            value={valor}
            onChange={(e) => {
              setValor(e.target.value)
              setResultado(null)
            }}
            step="any"
            min="0"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={swapMoedas}
            className="mb-0.5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16V4m0 0L3 8m4-4 4 4" />
              <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
            </svg>
            Inverter moedas
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            De
          </label>
          <select
            value={origem}
            onChange={(e) => {
              setOrigem(e.target.value)
              setResultado(null)
            }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          >
            {MOEDAS_LIST.map(([cod, nome]) => (
              <option key={cod} value={cod}>
                {cod} — {nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Para
          </label>
          <select
            value={destino}
            onChange={(e) => {
              setDestino(e.target.value)
              setResultado(null)
            }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          >
            {MOEDAS_LIST.map(([cod, nome]) => (
              <option key={cod} value={cod}>
                {cod} — {nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleConverter}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)] disabled:opacity-60"
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Convertendo...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
            Converter
          </>
        )}
      </button>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {error}
        </div>
      )}

      {resultado && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-6 text-center">
            <p className="text-sm text-muted">
              {Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} {origem}
            </p>
            <p className="mt-2 font-display text-3xl font-extrabold text-accent">
              {formatMoney(resultado.valorConvertido)} {destino}
            </p>
            <p className="mt-2 text-xs text-muted">
              Taxa: {formatMoney(resultado.taxa)} · {new Date(resultado.data).toLocaleString("pt-BR")}
            </p>
            {resultado.usaFallback && (
              <p className="mt-2 text-xs text-amber-500">
                ⚠ Taxa aproximada (fallback offline). Conecte-se à internet para taxas atualizadas.
              </p>
            )}
          </div>
          <CopyButton
            text={`${resultado.valorConvertido}`}
            label="Copiar valor"
          />
        </div>
      )}
    </div>
  )
}
