"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { extrairExif, formatExifValue, type ExifResult } from "@/lib/exif"

export function ExifViewer() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")
  const [data, setData] = useState<ExifResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith("image/")) {
      setError("Selecione uma imagem válida.")
      return
    }

    setFile(f)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(f))
    setData(null)
    setError("")
    setLoading(true)

    try {
      const result = await extrairExif(f)
      setData(result)
    } catch {
      setError("Erro ao extrair metadados.")
    } finally {
      setLoading(false)
    }
  }

  const renderSection = (title: string, obj: Record<string, unknown>) => {
    const entries = Object.entries(obj).filter(([, v]) => v !== undefined && v !== null)
    if (entries.length === 0) return null

    return (
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-accent">
          {title}
        </h3>
        <div className="space-y-1.5">
          {entries.map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4 border-b border-border py-1 text-sm last:border-0">
              <span className="text-muted capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
              <span className="max-w-[60%] truncate text-right font-medium text-primary">
                {formatExifValue(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
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
            <p className="text-sm text-secondary">{file?.name}</p>
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

      {loading && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-secondary">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Extraindo metadados...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {error}
        </div>
      )}

      {data && !loading && (
        <div className="space-y-4">
          {renderSection("Informações Básicas", data.basic as unknown as Record<string, unknown>)}
          {renderSection("EXIF (Câmera, Data, Configurações)", data.exif)}
          {renderSection("IPTC (Descrição, Autor, Copyright)", data.iptc)}
          {renderSection("XMP (Metadados Extendidos)", data.xmp)}

          {Object.keys(data.exif).length === 0 &&
            Object.keys(data.iptc).length === 0 &&
            Object.keys(data.xmp).length === 0 && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-500">
              Nenhum metadado EXIF/IPTC/XMP encontrado nesta imagem.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
