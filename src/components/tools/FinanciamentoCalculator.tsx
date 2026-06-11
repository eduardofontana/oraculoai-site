"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

interface Mes {
  mes: number
  saldoDevedor: number
  amortizacao: number
  juros: number
  parcela: number
}

function format(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatNumber(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function FinanciamentoCalculator() {
  const [valorTotal, setValorTotal] = useState("300000")
  const [entrada, setEntrada] = useState("60000")
  const [taxaAnual, setTaxaAnual] = useState("9.99")
  const [prazoMeses, setPrazoMeses] = useState("360")
  const [tabelaSAC, setTabelaSAC] = useState<Mes[] | null>(null)
  const [tabelaPRICE, setTabelaPRICE] = useState<Mes[] | null>(null)
  const [calculado, setCalculado] = useState(false)

  const calcular = () => {
    const vTotal = Number(valorTotal.replace(",", "."))
    const vEntrada = Number(entrada.replace(",", "."))
    const taxaA = Number(taxaAnual.replace(",", ".")) / 100
    const n = Number(prazoMeses)

    if (isNaN(vTotal) || isNaN(vEntrada) || isNaN(taxaA) || isNaN(n) || n <= 0) {
      return
    }

    const financiado = vTotal - vEntrada
    const taxaM = Math.pow(1 + taxaA, 1 / 12) - 1 // taxa mensal equivalente

    // --- SAC ---
    const amortSac = financiado / n
    const sac: Mes[] = []
    for (let i = 1; i <= n; i++) {
      const saldoAnt = i === 1 ? financiado : sac[i - 2]!.saldoDevedor
      const jurosMes = saldoAnt * taxaM
      const parcela = amortSac + jurosMes
      const saldoNovo = saldoAnt - amortSac
      sac.push({
        mes: i,
        saldoDevedor: Math.max(0, saldoNovo),
        amortizacao: amortSac,
        juros: jurosMes,
        parcela,
      })
    }

    // --- PRICE ---
    const price: Mes[] = []
    const parcelaPrice = financiado * (taxaM * Math.pow(1 + taxaM, n)) / (Math.pow(1 + taxaM, n) - 1)
    let saldo = financiado
    for (let i = 1; i <= n; i++) {
      const jurosMes = saldo * taxaM
      const amortPrice = parcelaPrice - jurosMes
      saldo -= amortPrice
      price.push({
        mes: i,
        saldoDevedor: Math.max(0, saldo),
        amortizacao: amortPrice,
        juros: jurosMes,
        parcela: parcelaPrice,
      })
    }

    setTabelaSAC(sac)
    setTabelaPRICE(price)
    setCalculado(true)
  }

  const totJurosSAC = tabelaSAC ? tabelaSAC.reduce((s, m) => s + m.juros, 0) : 0
  const totJurosPRICE = tabelaPRICE ? tabelaPRICE.reduce((s, m) => s + m.juros, 0) : 0
  const financiado = (Number(valorTotal.replace(",", ".")) - Number(entrada.replace(",", "."))) || 0
  const totPagoSAC = financiado + totJurosSAC
  const totPagoPRICE = financiado + totJurosPRICE

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Valor total do imóvel</label>
          <input
            type="text"
            value={valorTotal}
            onChange={(e) => { setValorTotal(e.target.value); setCalculado(false) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Entrada</label>
          <input
            type="text"
            value={entrada}
            onChange={(e) => { setEntrada(e.target.value); setCalculado(false) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Taxa de juros anual (%)</label>
          <input
            type="text"
            value={taxaAnual}
            onChange={(e) => { setTaxaAnual(e.target.value); setCalculado(false) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Prazo (meses)</label>
          <input
            type="text"
            value={prazoMeses}
            onChange={(e) => { setPrazoMeses(e.target.value); setCalculado(false) }}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary focus:border-accent-border focus:outline-none"
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
        Calcular Financiamento
      </button>

      {calculado && tabelaSAC && tabelaPRICE && (
        <div className="space-y-8">
          {/* Resumo comparativo */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-bg p-4">
              <p className="text-xs font-medium text-secondary">Valor financiado</p>
              <p className="mt-1 text-xl font-bold text-primary">{format(financiado)}</p>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="text-xs font-medium text-emerald-500">Total SAC</p>
              <p className="mt-1 text-xl font-bold text-emerald-500">{format(totPagoSAC)}</p>
              <p className="text-xs text-muted">Juros: {format(totJurosSAC)}</p>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="text-xs font-medium text-amber-500">Total PRICE</p>
              <p className="mt-1 text-xl font-bold text-amber-500">{format(totPagoPRICE)}</p>
              <p className="text-xs text-muted">Juros: {format(totJurosPRICE)}</p>
            </div>
          </div>

          {/* Tabela comparativa */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-overlay">
                  <th className="px-4 py-3 font-semibold text-primary">Mês</th>
                  <th className="px-4 py-3 font-semibold text-emerald-500">Parcela SAC</th>
                  <th className="px-4 py-3 font-semibold text-emerald-500">Amort. SAC</th>
                  <th className="px-4 py-3 font-semibold text-emerald-500">Juros SAC</th>
                  <th className="px-4 py-3 font-semibold text-emerald-500">Saldo SAC</th>
                  <th className="px-4 py-3 font-semibold text-amber-500">Parcela PRICE</th>
                  <th className="px-4 py-3 font-semibold text-amber-500">Amort. PRICE</th>
                  <th className="px-4 py-3 font-semibold text-amber-500">Juros PRICE</th>
                  <th className="px-4 py-3 font-semibold text-amber-500">Saldo PRICE</th>
                </tr>
              </thead>
              <tbody>
                {tabelaSAC.map((sacMes, i) => {
                  const priceMes = tabelaPRICE[i]!
                  return (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-overlay/50">
                      <td className="px-4 py-2 font-medium text-primary">{sacMes.mes}</td>
                      <td className="px-4 py-2 font-mono text-xs text-primary">{format(sacMes.parcela)}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted">{format(sacMes.amortizacao)}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted">{format(sacMes.juros)}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted">{format(sacMes.saldoDevedor)}</td>
                      <td className="px-4 py-2 font-mono text-xs text-primary">{format(priceMes.parcela)}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted">{format(priceMes.amortizacao)}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted">{format(priceMes.juros)}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted">{format(priceMes.saldoDevedor)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
