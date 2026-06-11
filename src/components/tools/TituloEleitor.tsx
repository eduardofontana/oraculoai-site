"use client"

import { useState } from "react"
import { gerarTituloEleitor, validarTituloEleitor, UFS } from "@/lib/titulo-eleitor"
import { CopyButton } from "./CopyButton"

export function TituloEleitor() {
  const [aba, setAba] = useState<"gerar" | "validar">("gerar")
  const [uf, setUf] = useState("SP")
  const [formatado, setFormatado] = useState(true)
  const [titulo, setTitulo] = useState("")
  const [inputVal, setInputVal] = useState("")
  const [validacao, setValidacao] = useState<ReturnType<typeof validarTituloEleitor> | null>(null)

  const handleGerar = () => {
    setTitulo(gerarTituloEleitor(uf, formatado))
  }

  const handleValidar = () => {
    setValidacao(validarTituloEleitor(inputVal))
  }

  return (
    <div className="space-y-6">
      {/* Abas */}
      <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
        <button
          onClick={() => setAba("gerar")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
            aba === "gerar" ? "bg-accent text-white" : "text-secondary hover:text-primary"
          }`}
        >
          Gerar
        </button>
        <button
          onClick={() => setAba("validar")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
            aba === "validar" ? "bg-accent text-white" : "text-secondary hover:text-primary"
          }`}
        >
          Validar
        </button>
      </div>

      {aba === "gerar" ? (
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-secondary">UF</label>
            <select
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            >
              {UFS.map((u) => (
                <option key={u} value={u}>
                  {u === "ZZ" ? "Exterior" : u}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-secondary">
            <input
              type="checkbox"
              checked={formatado}
              onChange={(e) => setFormatado(e.target.checked)}
              className="h-4 w-4 rounded border-border bg-card text-accent"
            />
            Com formatação (SSSSSSSS D UFCV)
          </label>
          <button
            onClick={handleGerar}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            Gerar Título de Eleitor
          </button>
          {titulo && (
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-bg p-4">
                <p className="font-mono text-xl font-bold tracking-wider text-primary">{titulo}</p>
              </div>
              <CopyButton text={titulo} />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-secondary">
              Número do Título de Eleitor
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ex: 12345678 0101 ou 123456780101"
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
            />
          </div>
          <button
            onClick={handleValidar}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Validar
          </button>
          {validacao && (
            <div
              className={`rounded-lg border p-4 ${
                validacao.valido
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-red-500/30 bg-red-500/5"
              }`}
            >
              <div className="flex items-start gap-3">
                {validacao.valido ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                )}
                <div>
                  <p
                    className={`font-semibold ${
                      validacao.valido ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {validacao.valido ? "Válido" : "Inválido"}
                  </p>
                  <p className="mt-1 text-sm text-secondary">{validacao.mensagem}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
