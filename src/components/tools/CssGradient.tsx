"use client"

import { useState, useMemo } from "react"
import {
  gerarCssGradient,
  gerarCssGradientFull,
  SUGESTOES_CORES,
  GRADIENTES_PRESET,
  type GradientConfig,
  type GradientStop,
} from "@/lib/cssGradient"
import { CopyButton } from "./CopyButton"

function criarConfigPadrao(): GradientConfig {
  return {
    type: "linear",
    angle: 135,
    stops: [
      { color: "#ff6b6b", position: 0 },
      { color: "#ffd93d", position: 100 },
    ],
    radialShape: "circle",
    radialPosition: "center",
  }
}

export function CssGradient() {
  const [config, setConfig] = useState<GradientConfig>(criarConfigPadrao())

  const css = useMemo(() => gerarCssGradient(config), [config])
  const cssFull = useMemo(() => gerarCssGradientFull(config), [config])

  const updateStop = (index: number, field: keyof GradientStop, value: string | number) => {
    const newStops = [...config.stops]
    newStops[index] = { ...newStops[index], [field]: value }
    setConfig({ ...config, stops: newStops })
  }

  const addStop = () => {
    if (config.stops.length >= 8) return
    const lastPos = config.stops[config.stops.length - 1]?.position ?? 100
    const pos = Math.min(lastPos + 10, 100)
    setConfig({
      ...config,
      stops: [...config.stops, { color: "#808080", position: pos }],
    })
  }

  const removeStop = (index: number) => {
    if (config.stops.length <= 2) return
    setConfig({
      ...config,
      stops: config.stops.filter((_, i) => i !== index),
    })
  }

  const aplicarPreset = (preset: (typeof GRADIENTES_PRESET)[number]) => {
    setConfig({
      ...preset.config,
      stops: preset.config.stops.map((s) => ({ ...s })),
    })
  }

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div
        className="h-48 rounded-xl border border-border transition-all duration-300"
        style={{ background: css.replace("background: ", "").replace(";", "") }}
      />

      {/* Tipo */}
      <div className="flex flex-wrap gap-2">
        {(["linear", "radial", "conic"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setConfig({ ...config, type })}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              config.type === type
                ? "bg-accent text-white"
                : "border border-border bg-card text-secondary hover:border-accent-border"
            }`}
          >
            {type === "linear" ? "Linear" : type === "radial" ? "Radial" : "Cônico"}
          </button>
        ))}
      </div>

      {/* Ângulo (para linear e conic) */}
      {(config.type === "linear" || config.type === "conic") && (
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Ângulo: {config.angle}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={config.angle}
            onChange={(e) => setConfig({ ...config, angle: Number(e.target.value) })}
            className="w-full accent-accent"
          />
        </div>
      )}

      {/* Radial shape */}
      {config.type === "radial" && (
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-secondary">Forma</label>
            <select
              value={config.radialShape}
              onChange={(e) =>
                setConfig({ ...config, radialShape: e.target.value as "circle" | "ellipse" })
              }
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            >
              <option value="circle">Círculo</option>
              <option value="ellipse">Elipse</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-secondary">Posição</label>
            <select
              value={config.radialPosition}
              onChange={(e) => setConfig({ ...config, radialPosition: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
            >
              <option value="center">Centro</option>
              <option value="top left">Topo Esquerda</option>
              <option value="top right">Topo Direita</option>
              <option value="bottom left">Base Esquerda</option>
              <option value="bottom right">Base Direita</option>
            </select>
          </div>
        </div>
      )}

      {/* Stops */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-secondary">Cores (stops)</span>
          {config.stops.length < 8 && (
            <button
              onClick={addStop}
              className="text-sm font-medium text-accent hover:text-accent-text"
            >
              + Adicionar cor
            </button>
          )}
        </div>
        {config.stops.map((stop, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(idx, "color", e.target.value)}
              className="h-9 w-9 cursor-pointer rounded border border-border bg-bg p-0.5"
            />
            <input
              type="text"
              value={stop.color}
              onChange={(e) => updateStop(idx, "color", e.target.value)}
              className="w-28 rounded-lg border border-border bg-bg px-3 py-2 text-sm font-mono text-primary focus:border-accent-border focus:outline-none"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={stop.position}
              onChange={(e) => updateStop(idx, "position", Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-10 text-right text-xs text-muted">{stop.position}%</span>
            {config.stops.length > 2 && (
              <button
                onClick={() => removeStop(idx)}
                className="text-red-500 hover:text-red-400"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Cores sugeridas */}
      <details className="rounded-lg border border-border bg-card">
        <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary">
          Cores sugeridas
        </summary>
        <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
          {SUGESTOES_CORES.map((cor) => (
            <button
              key={cor}
              onClick={() => {
                const newStops = [...config.stops]
                newStops[0] = { ...newStops[0], color: cor }
                setConfig({ ...config, stops: newStops })
              }}
              className="h-8 w-8 rounded-full border border-border transition-transform hover:scale-110"
              style={{ backgroundColor: cor }}
              title={cor}
            />
          ))}
        </div>
      </details>

      {/* Presets */}
      <details className="rounded-lg border border-border bg-card">
        <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary">
          Gradientes prontos
        </summary>
        <div className="grid gap-2 border-t border-border px-4 py-3 sm:grid-cols-2">
          {GRADIENTES_PRESET.map((preset) => (
            <button
              key={preset.name}
              onClick={() => aplicarPreset(preset)}
              className="h-16 rounded-lg border border-border transition-all hover:scale-[1.02]"
              style={{
                background: gerarCssGradient(preset.config).replace("background: ", "").replace(";", ""),
              }}
            >
              <span className="text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </details>

      {/* Código CSS */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-secondary">Código CSS</label>
        <pre className="rounded-lg border border-border bg-bg p-4 font-mono text-sm leading-relaxed text-primary">
          {cssFull}
        </pre>
        <CopyButton text={cssFull} label="Copiar CSS" />
      </div>
    </div>
  )
}
