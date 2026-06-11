"use client"

import { useState } from "react"
import { analisarFrequencia } from "@/lib/frequenciaPalavras"
import { CopyButton } from "./CopyButton"

export function WordFrequency() {
  const [texto, setTexto] = useState("")
  const [limite, setLimite] = useState(20)
  const [resultado, setResultado] = useState<ReturnType<typeof analisarFrequencia> | null>(null)

  const handleAnalisar = () => {
    if (!texto.trim()) return
    setResultado(analisarFrequencia(texto, limite))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Texto de entrada
        </label>
        <textarea
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value)
            setResultado(null)
          }}
          rows={8}
          placeholder="Cole seu texto aqui para analisar a frequência das palavras..."
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-secondary">Mostrar top</label>
          <input
            type="number"
            value={limite}
            onChange={(e) => setLimite(Math.max(1, Number(e.target.value)))}
            min="1"
            max="100"
            className="w-20 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary focus:border-accent-border focus:outline-none"
          />
          <span className="text-sm text-secondary">palavras</span>
        </div>
        <button
          onClick={handleAnalisar}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Analisar
        </button>
      </div>

      {resultado && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-border bg-bg p-3 text-center">
              <p className="text-xs text-muted">Total de Palavras</p>
              <p className="mt-1 font-display text-xl font-bold text-primary">
                {resultado.totalPalavras}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-3 text-center">
              <p className="text-xs text-muted">Palavras Únicas</p>
              <p className="mt-1 font-display text-xl font-bold text-accent">
                {resultado.palavrasUnicas}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-3 text-center">
              <p className="text-xs text-muted">Caracteres</p>
              <p className="mt-1 font-display text-xl font-bold text-primary">
                {resultado.totalCaracteres}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-3 text-center">
              <p className="text-xs text-muted">Caracteres (s/ espaço)</p>
              <p className="mt-1 font-display text-xl font-bold text-primary">
                {resultado.totalCaracteresSemEspaco}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card">
            <div className="max-h-80 overflow-auto">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border text-xs text-muted">
                    <th className="px-4 py-2 font-medium">#</th>
                    <th className="px-4 py-2 font-medium">Palavra</th>
                    <th className="px-4 py-2 font-medium text-right">Frequência</th>
                    <th className="px-4 py-2 font-medium text-right">%</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.topPalavras.map((item, idx) => {
                    const percent = ((item.frequencia / resultado.totalPalavras) * 100).toFixed(1)
                    return (
                      <tr
                        key={item.palavra}
                        className="border-b border-border text-primary last:border-0 hover:bg-surface-overlay"
                      >
                        <td className="px-4 py-2 text-muted">{idx + 1}</td>
                        <td className="px-4 py-2 font-medium">{item.palavra}</td>
                        <td className="px-4 py-2 text-right font-medium">{item.frequencia}</td>
                        <td className="px-4 py-2 text-right text-muted">{percent}%</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CopyButton
            text={resultado.topPalavras.map((p) => `${p.palavra}: ${p.frequencia}`).join("\n")}
            label="Copiar ranking"
          />
        </div>
      )}
    </div>
  )
}
