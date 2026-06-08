"use client"

import { useState } from "react"

export function WebpConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [dataUrl, setDataUrl] = useState("")
  const [result, setResult] = useState("")
  const [quality, setQuality] = useState(0.8)

  const handleFile = (f: File | null) => {
    if (!f) return
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setDataUrl(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const convert = () => {
    if (!dataUrl) return
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      setResult(canvas.toDataURL("image/webp", quality))
    }
    img.src = dataUrl
  }

  const download = () => {
    if (!result) return
    const a = document.createElement("a")
    a.href = result
    a.download = (file?.name.replace(/\.[^.]+$/, "") || "imagem") + ".webp"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">Selecione PNG ou JPG</label>
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
        />
      </div>

      {dataUrl && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-secondary">
              Qualidade: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          <button
            onClick={convert}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
          >
            Converter para WebP
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result} alt="WebP" className="max-h-48 rounded-lg border border-border object-contain" />
          <button
            onClick={download}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Baixar WebP
          </button>
        </div>
      )}
    </div>
  )
}
