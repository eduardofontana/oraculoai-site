"use client"

import { useState, useMemo } from "react"
import { obterFusos, converterFuso, obterOffset, agruparFusos } from "@/lib/fusoHorario"
import { CopyButton } from "./CopyButton"

function formatDateForInput(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const h = String(d.getHours()).padStart(2, "0")
  const min = String(d.getMinutes()).padStart(2, "0")
  return `${y}-${m}-${day}T${h}:${min}`
}

export function FusoHorarioConverter() {
  const allFusos = useMemo(() => obterFusos(), [])
  const fusosAgrupados = useMemo(() => agruparFusos(allFusos), [allFusos])
  const regioes = useMemo(() => Object.keys(fusosAgrupados).sort(), [fusosAgrupados])

  const [dataHora, setDataHora] = useState(formatDateForInput(new Date()))
  const [fusoOrigem, setFusoOrigem] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const [fusoDestino, setFusoDestino] = useState("UTC")

  const resultado = useMemo(() => {
    if (!dataHora) return null
    const data = new Date(dataHora)
    if (Number.isNaN(data.getTime())) return null
    try {
      return converterFuso(data, fusoOrigem, fusoDestino)
    } catch {
      return null
    }
  }, [dataHora, fusoOrigem, fusoDestino])

  const offsetOrigem = useMemo(() => obterOffset(fusoOrigem), [fusoOrigem])
  const offsetDestino = useMemo(() => obterOffset(fusoDestino), [fusoDestino])

  const setAgora = () => setDataHora(formatDateForInput(new Date()))

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Data e Hora
        </label>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          />
          <button
            onClick={setAgora}
            className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
          >
            Agora
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Fuso de Origem
          </label>
          <div className="flex items-center gap-2">
            <select
              value={fusoOrigem}
              onChange={(e) => setFusoOrigem(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            >
              {regioes.map((regiao) => (
                <optgroup key={regiao} label={regiao}>
                  {fusosAgrupados[regiao].map((f) => (
                    <option key={f} value={f}>
                      {f.replace("_", " ")} ({obterOffset(f)})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <span className="shrink-0 text-xs font-mono text-muted">
              {offsetOrigem}
            </span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Fuso de Destino
          </label>
          <div className="flex items-center gap-2">
            <select
              value={fusoDestino}
              onChange={(e) => setFusoDestino(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            >
              {regioes.map((regiao) => (
                <optgroup key={regiao} label={regiao}>
                  {fusosAgrupados[regiao].map((f) => (
                    <option key={f} value={f}>
                      {f.replace("_", " ")} ({obterOffset(f)})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <span className="shrink-0 text-xs font-mono text-muted">
              {offsetDestino}
            </span>
          </div>
        </div>
      </div>

      {resultado && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-bg p-4">
              <p className="text-xs text-muted">Origem ({fusoOrigem.split("/").pop()})</p>
              <p className="mt-1 font-display text-lg font-bold text-primary">
                {resultado.dataOrigem}
              </p>
            </div>
            <div className="rounded-lg border border-accent-border bg-accent-soft p-4">
              <p className="text-xs text-muted">Destino ({fusoDestino.split("/").pop()})</p>
              <p className="mt-1 font-display text-lg font-bold text-accent">
                {resultado.dataDestino}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="text-sm text-secondary">
              Diferença:{" "}
              <strong className="text-primary">
                {resultado.diferencaHoras > 0 ? "+" : ""}
                {resultado.diferencaHoras}h
              </strong>
            </p>
          </div>

          <CopyButton
            text={resultado.dataDestino}
            label="Copiar data/hora destino"
          />
        </div>
      )}
    </div>
  )
}
