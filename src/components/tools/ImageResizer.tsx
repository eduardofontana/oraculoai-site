"use client"

import { useState } from "react"

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null)
  const [dataUrl, setDataUrl] = useState("")
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [newWidth, setNewWidth] = useState(0)
  const [newHeight, setNewHeight] = useState(0)
  const [result, setResult] = useState("")
  const [keepRatio, setKeepRatio] = useState(true)

  const handleFile = (f: File | null) => {
    if (!f) return
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = e.target?.result as string
      setDataUrl(url)
      const img = new Image()
      img.onload = () => {
        setWidth(img.width)
        setHeight(img.height)
        setNewWidth(img.width)
        setNewHeight(img.height)
      }
      img.src = url
    }
    reader.readAsDataURL(f)
  }

  const resize = () => {
    if (!dataUrl) return
    const canvas = document.createElement("canvas")
    canvas.width = newWidth
    canvas.height = newHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, newWidth, newHeight)
      setResult(canvas.toDataURL(file?.type || "image/png"))
    }
    img.src = dataUrl
  }

  const download = () => {
    if (!result) return
    const a = document.createElement("a")
    a.href = result
    a.download = `redimensionada.${file?.name.split(".").pop() || "png"}`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">Selecione uma imagem</label>
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
        />
      </div>

      {dataUrl && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt="Original" className="max-h-48 rounded-lg object-contain" />
            <p className="mt-1 text-xs text-muted">
              Original: {width}x{height}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div>
                <label className="mb-1 block text-xs text-muted">Largura</label>
                <input
                  type="number"
                  min={1}
                  value={newWidth}
                  onChange={(e) => {
                    const w = Number(e.target.value)
                    setNewWidth(w)
                    if (keepRatio && width > 0) setNewHeight(Math.round(w * (height / width)))
                  }}
                  className="w-24 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary focus:border-accent-border focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted">Altura</label>
                <input
                  type="number"
                  min={1}
                  value={newHeight}
                  onChange={(e) => {
                    const h = Number(e.target.value)
                    setNewHeight(h)
                    if (keepRatio && height > 0) setNewWidth(Math.round(h * (width / height)))
                  }}
                  className="w-24 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary focus:border-accent-border focus:outline-none"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-secondary">
              <input
                type="checkbox"
                checked={keepRatio}
                onChange={(e) => setKeepRatio(e.target.checked)}
                className="h-4 w-4 rounded border-border bg-card text-accent"
              />
              Manter proporção
            </label>
            <button
              onClick={resize}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
            >
              Redimensionar
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result} alt="Redimensionada" className="max-h-48 rounded-lg border border-border object-contain" />
          <button
            onClick={download}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Baixar imagem
          </button>
        </div>
      )}
    </div>
  )
}
