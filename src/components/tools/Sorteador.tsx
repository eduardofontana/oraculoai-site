"use client"

import { useState } from "react"
import { sortear, parsearItens } from "@/lib/sorteador"
import { CopyButton } from "./CopyButton"

export function Sorteador() {
  const [itensTexto, setItensTexto] = useState("")
  const [quantidade, setQuantidade] = useState(1)
  const [repetir, setRepetir] = useState(false)
  const [resultado, setResultado] = useState<ReturnType<typeof sortear> | null>(null)
  const [error, setError] = useState("")

  const handleSortear = () => {
    const itens = parsearItens(itensTexto)
    if (itens.length === 0) {
      setError("Digite pelo menos um item.")
      setResultado(null)
      return
    }
    if (quantidade < 1) {
      setError("A quantidade deve ser pelo menos 1.")
      setResultado(null)
      return
    }
    if (!repetir && quantidade > itens.length) {
      setError(
        `Só existem ${itens.length} itens. Sem repetição, o máximo é ${itens.length}.`
      )
      setResultado(null)
      return
    }

    setError("")
    setResultado(sortear(itens, quantidade, repetir))
  }

  const totalItens = parsearItens(itensTexto).length

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Itens (um por linha)
        </label>
        <textarea
          value={itensTexto}
          onChange={(e) => {
            setItensTexto(e.target.value)
            setResultado(null)
            setError("")
          }}
          rows={6}
          placeholder={`João\nMaria\nPedro\nAna\nCarlos`}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
        {totalItens > 0 && (
          <p className="mt-1 text-xs text-muted">{totalItens} itens</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Sortear
          </label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => {
              setQuantidade(Math.max(1, Number(e.target.value)))
              setResultado(null)
            }}
            min="1"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-secondary">
            <input
              type="checkbox"
              checked={repetir}
              onChange={(e) => {
                setRepetir(e.target.checked)
                setResultado(null)
              }}
              className="h-4 w-4 rounded border-border bg-card text-accent"
            />
            Permitir repetição
          </label>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSortear}
            className="w-full rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
          >
            Sortear!
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {error}
        </div>
      )}

      {resultado && resultado.itensSorteados.length > 0 && (
        <div className="space-y-4">
          <div className="rounded-lg border border-accent-border bg-accent-soft p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Resultado do Sorteio
            </p>
            <ul className="mt-3 space-y-2">
              {resultado.itensSorteados.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">
              {resultado.itensSorteados.length} de {resultado.totalOriginal} itens sorteados
              {resultado.itensRestantes.length > 0 &&
                ` · ${resultado.itensRestantes.length} restantes`}
            </span>
            <CopyButton
              text={resultado.itensSorteados.join("\n")}
              label="Copiar resultado"
            />
          </div>
        </div>
      )}
    </div>
  )
}
