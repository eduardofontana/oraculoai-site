"use client"

import Image from "next/image"
import { useState } from "react"
import { comprimirImagem, formatSize } from "@/lib/imageCompressor"

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")
  const [quality, setQuality] = useState(0.8)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [maxHeight, setMaxHeight] = useState(1080)
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg")
  const [result, setResult] = useState<{
    url: string
    sizeOriginal: number
    sizeCompressed: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith("image/")) {
      setError("Selecione uma imagem válida.")
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
    setError("")
  }

  const handleCompress = async () => {
    if (!file) return
    setLoading(true)
    setError("")
    try {
      const res = await comprimirImagem(file, quality, maxWidth, maxHeight, format)
      setResult({
        url: res.url,
        sizeOriginal: res.sizeOriginal,
        sizeCompressed: res.sizeCompressed,
      })
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg"
    const a = document.createElement("a")
    a.href = result.url
    a.download = `comprimido.${ext}`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-bg p-6 text-center">
        {preview ? (
          <div className="space-y-4">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-lg bg-bg">
              <Image
                src={preview}
                alt="Preview"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="text-sm text-secondary">{file?.name} ({file && formatSize(file.size)})</p>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center gap-2 text-sm text-secondary hover:text-primary">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Clique para selecionar imagem</span>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
        )}
      </div>

      {file && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-secondary">
                Qualidade: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-accent"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-secondary">
                Formato de saída
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as typeof format)}
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-secondary">
                Largura máxima (px)
              </label>
              <input
                type="number"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                min="0"
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-secondary">
                Altura máxima (px)
              </label>
              <input
                type="number"
                value={maxHeight}
                onChange={(e) => setMaxHeight(Number(e.target.value))}
                min="0"
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleCompress}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)] disabled:opacity-60"
          >
            {loading ? "Comprimindo..." : "Comprimir Imagem"}
          </button>
        </>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-bg p-4 text-center">
              <p className="text-xs text-muted">Original</p>
              <p className="mt-1 font-display text-xl font-bold text-primary">
                {formatSize(result.sizeOriginal)}
              </p>
            </div>
            <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4 text-center">
              <p className="text-xs text-muted">Comprimido</p>
              <p className="mt-1 font-display text-xl font-bold text-green-500">
                {formatSize(result.sizeCompressed)}
              </p>
              {result.sizeOriginal > 0 && (
                <p className="text-xs text-muted">
                  -{Math.round((1 - result.sizeCompressed / result.sizeOriginal) * 100)}%
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={downloadResult}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
