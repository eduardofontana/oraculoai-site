"use client"

import { useState } from "react"
import { calcularJurosCompostos } from "@/lib/juros"
import { CopyButton } from "./CopyButton"

export function JurosCompostos() {
  const [capital, setCapital] = useState("1000")
  const [taxa, setTaxa] = useState("1")
  const [periodos, setPeriodos] = useState("12")
  const [periodicidade, setPeriodicidade] = useState<"meses" | "anos">("meses")
  const [resultado, setResultado] = useState<ReturnType<typeof calcularJurosCompostos> | null>(null)
  const [erro, setErro] = useState("")

  const handleCalcular = () => {
    const c = Number.parseFloat(capital)
    const t = Number.parseFloat(taxa)
    const p = Number.parseInt(periodos, 10)
    setErro("")

    if (Number.isNaN(c) || c <= 0) { setErro("Capital inicial deve ser maior que zero"); return }
    if (Number.isNaN(t) || t < 0) { setErro("Taxa de juros inválida"); return }
    if (Number.isNaN(p) || p <= 0) { setErro("Período deve ser maior que zero"); return }

    setResultado(calcularJurosCompostos(c, t, p, periodicidade))
  }

  const formatMoney = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Capital Inicial (R$)
          </label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            step="any"
            min="0"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Taxa de Juros (% ao mês)
          </label>
          <input
            type="number"
            value={taxa}
            onChange={(e) => setTaxa(e.target.value)}
            step="any"
            min="0"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Período
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={periodos}
              onChange={(e) => setPeriodos(e.target.value)}
              min="1"
              className="w-24 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            />
            <select
              value={periodicidade}
              onChange={(e) => setPeriodicidade(e.target.value as "meses" | "anos")}
              className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            >
              <option value="meses">Meses</option>
              <option value="anos">Anos</option>
            </select>
          </div>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleCalcular}
            className="w-full rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
          >
            Calcular
          </button>
        </div>
      </div>

      {erro && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {erro}
        </div>
      )}

      {resultado && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-bg p-4 text-center">
              <p className="text-xs text-muted">Valor Futuro</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-accent">
                {formatMoney(resultado.montante)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-4 text-center">
              <p className="text-xs text-muted">Total em Juros</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-green-500">
                {formatMoney(resultado.jurosTotal)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-4 text-center">
              <p className="text-xs text-muted">Capital Inicial</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-primary">
                {formatMoney(resultado.capitalInitial)}
              </p>
            </div>
          </div>

          <details className="rounded-lg border border-border bg-card">
            <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary">
              Ver evolução mês a mês ({resultado.evolucao.length} períodos)
            </summary>
            <div className="max-h-60 overflow-auto border-t border-border">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border text-xs text-muted">
                    <th className="px-4 py-2 font-medium">Mês</th>
                    <th className="px-4 py-2 font-medium">Valor</th>
                    <th className="px-4 py-2 font-medium">Juros Acum.</th>
                  </tr>
                </thead>
                <tbody>
                  {resultado.evolucao.map((e) => (
                    <tr key={e.mes} className="border-b border-border text-primary last:border-0">
                      <td className="px-4 py-2 text-muted">{e.mes}</td>
                      <td className="px-4 py-2 font-medium">{formatMoney(e.valor)}</td>
                      <td className="px-4 py-2 text-green-500">{formatMoney(e.juros)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      )}
    </div>
  )
}
