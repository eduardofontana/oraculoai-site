"use client"

import { useCallback, useEffect, useState } from "react"
import {
  gerarBarcode,
  validarFormato,
  FORMATOS_DISPONIVEIS,
  DEFAULT_OPTIONS,
  type BarcodeOptions,
} from "@/lib/barcode"

export function BarcodeGenerator() {
  const [value, setValue] = useState("1234567890")
  const [options, setOptions] = useState<BarcodeOptions>(DEFAULT_OPTIONS)
  const [svg, setSvg] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const generate = useCallback(async () => {
    const err = validarFormato(value, options.format)
    if (err) {
      setError(err)
      return
    }

    setError("")
    setLoading(true)
    try {
      const result = await gerarBarcode(value, options)
      setSvg(result)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [options, value])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (value) void generate()
    })

    return () => cancelAnimationFrame(frame)
  }, [generate, value])

  const downloadSvg = () => {
    if (!svg) return
    const blob = new Blob([svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `barcode-${options.format}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Valor
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError("")
            }}
            placeholder="1234567890"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Formato
          </label>
          <select
            value={options.format}
            onChange={(e) =>
              setOptions({ ...options, format: e.target.value as BarcodeOptions["format"] })
            }
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          >
            {FORMATOS_DISPONIVEIS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <details className="rounded-lg border border-border bg-card">
        <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary">
          Opções visuais
        </summary>
        <div className="grid gap-4 border-t border-border px-4 py-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs text-muted">
              Largura da barra: {options.width}px
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={options.width}
              onChange={(e) => setOptions({ ...options, width: Number(e.target.value) })}
              className="w-full accent-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">
              Altura: {options.height}px
            </label>
            <input
              type="range"
              min="30"
              max="200"
              value={options.height}
              onChange={(e) => setOptions({ ...options, height: Number(e.target.value) })}
              className="w-full accent-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">
              Fonte: {options.fontSize}px
            </label>
            <input
              type="range"
              min="8"
              max="36"
              value={options.fontSize}
              onChange={(e) => setOptions({ ...options, fontSize: Number(e.target.value) })}
              className="w-full accent-accent"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-muted">
              <input
                type="checkbox"
                checked={options.displayValue}
                onChange={(e) => setOptions({ ...options, displayValue: e.target.checked })}
                className="h-4 w-4 rounded border-border bg-card text-accent"
              />
              Mostrar valor
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-muted">
              Cor da barra
              <input
                type="color"
                value={options.lineColor}
                onChange={(e) => setOptions({ ...options, lineColor: e.target.value })}
                className="h-7 w-7 cursor-pointer rounded border border-border bg-bg p-0.5"
              />
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-muted">
              Fundo
              <input
                type="color"
                value={options.background}
                onChange={(e) => setOptions({ ...options, background: e.target.value })}
                className="h-7 w-7 cursor-pointer rounded border border-border bg-bg p-0.5"
              />
            </label>
          </div>
        </div>
      </details>

      <button
        onClick={generate}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)] disabled:opacity-60"
      >
        {loading ? "Gerando..." : "Gerar Código de Barras"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {error}
        </div>
      )}

      {svg && !error && (
        <div className="space-y-4">
          <div
            className="flex justify-center rounded-lg border border-border bg-white p-6"
            dangerouslySetInnerHTML={{ __html: svg }}
          />

          <div className="flex gap-3">
            <button
              onClick={downloadSvg}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download SVG
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
