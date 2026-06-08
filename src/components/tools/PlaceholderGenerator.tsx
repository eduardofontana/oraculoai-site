"use client"

import { useState } from "react"

export function PlaceholderGenerator() {
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(200)
  const [bgColor, setBgColor] = useState("#7C3AED")
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [text, setText] = useState("300x200")
  const [result, setResult] = useState("")

  const generate = () => {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = textColor
    ctx.font = `bold ${Math.min(width, height) * 0.08}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text || `${width}x${height}`, width / 2, height / 2)

    setResult(canvas.toDataURL("image/png"))
  }

  const download = () => {
    if (!result) return
    const a = document.createElement("a")
    a.href = result
    a.download = `placeholder-${width}x${height}.png`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Largura</label>
          <input type="number" min={1} value={width} onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Altura</label>
          <input type="number" min={1} value={height} onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Cor de fundo</label>
          <div className="flex gap-2">
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-12 cursor-pointer rounded border border-border bg-bg" />
            <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-bg px-3 py-2 font-mono text-sm text-primary focus:border-accent-border focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">Cor do texto</label>
          <div className="flex gap-2">
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
              className="h-10 w-12 cursor-pointer rounded border border-border bg-bg" />
            <input type="text" value={textColor} onChange={(e) => setTextColor(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-bg px-3 py-2 font-mono text-sm text-primary focus:border-accent-border focus:outline-none" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-secondary">Texto (opcional)</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}
            placeholder="300x200"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none" />
        </div>
      </div>

      <button
        onClick={generate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Gerar Placeholder
      </button>

      {result && (
        <div className="space-y-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result} alt="Placeholder" className="max-h-64 rounded-lg border border-border object-contain" />
          <button
            onClick={download}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Baixar PNG
          </button>
        </div>
      )}
    </div>
  )
}
