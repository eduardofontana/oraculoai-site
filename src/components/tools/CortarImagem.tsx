"use client"

import { useState, useRef, useCallback, useEffect } from "react"

interface CropRect {
  x: number
  y: number
  w: number
  h: number
}

export function CortarImagem() {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [crop, setCrop] = useState<CropRect | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.src = objectUrl
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      setImage(img)
      setCrop(null)
      setPreviewUrl(null)
    }
    img.onerror = () => URL.revokeObjectURL(objectUrl)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!image || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setIsDragging(true)
    setDragStart({ x, y })
    setCrop({ x, y, w: 0, h: 0 })
  }, [image])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCrop({
      x: Math.min(dragStart.x, x),
      y: Math.min(dragStart.y, y),
      w: Math.abs(x - dragStart.x),
      h: Math.abs(y - dragStart.y),
    })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const applyCrop = useCallback(() => {
    if (!image || !crop || crop.w < 5 || crop.h < 5) return
    const canvas = document.createElement("canvas")
    const scaleX = image.naturalWidth / canvasRef.current!.width
    const scaleY = image.naturalHeight / canvasRef.current!.height
    canvas.width = crop.w * scaleX
    canvas.height = crop.h * scaleY
    const ctx = canvas.getContext("2d")!
    ctx.drawImage(
      image,
      crop.x * scaleX, crop.y * scaleY,
      crop.w * scaleX, crop.h * scaleY,
      0, 0,
      canvas.width, canvas.height
    )
    setPreviewUrl(canvas.toDataURL("image/png"))
  }, [image, crop])

  const reset = useCallback(() => {
    setImage(null)
    setCrop(null)
    setPreviewUrl(null)
  }, [])

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")!
      const maxW = canvas.parentElement?.clientWidth || 600
      const scale = Math.min(maxW / image.naturalWidth, 400 / image.naturalHeight, 1)
      canvas.width = image.naturalWidth * scale
      canvas.height = image.naturalHeight * scale
      setCanvasSize({ width: canvas.width, height: canvas.height })
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      if (crop && crop.w > 0 && crop.h > 0) {
        ctx.fillStyle = "rgba(0,0,0,0.45)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.clearRect(crop.x, crop.y, crop.w, crop.h)
        ctx.strokeStyle = "#e11937"
        ctx.lineWidth = 2
        ctx.strokeRect(crop.x, crop.y, crop.w, crop.h)
      }
    }
  }, [image, crop])

  return (
    <div className="space-y-6">
      {!image ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-bg p-12 transition hover:border-accent-border"
          onClick={() => {
            const input = document.createElement("input")
            input.type = "file"
            input.accept = "image/*"
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0]
              if (file) handleFile(file)
            }
            input.click()
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="mt-4 text-sm font-medium text-secondary">
            Clique para selecionar ou arraste uma imagem
          </p>
          <p className="mt-1 text-xs text-muted">PNG, JPG ou WebP</p>
        </div>
      ) : (
        <>
          <div
            className="relative flex justify-center rounded-xl border border-border bg-bg p-2"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas
              ref={canvasRef}
              className="max-h-[400px] max-w-full cursor-crosshair"
            />
            {image && crop && crop.w > 0 && crop.h > 0 && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={applyCrop}
                  className="rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-white transition hover:bg-accent/90"
                >
                  Cortar
                </button>
                <button
                  onClick={() => setCrop(null)}
                  className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-secondary transition hover:text-primary"
                >
                  Limpar
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={reset}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-secondary transition hover:text-primary"
            >
              Nova imagem
            </button>
            {crop && (
              <span className="text-xs text-muted">
                {Math.round(crop.w)} × {Math.round(crop.h)} px
                {image && canvasSize.width > 0 && canvasSize.height > 0 && (
                  <> · {Math.round((crop.w / canvasSize.width) * image.naturalWidth)} × {Math.round((crop.h / canvasSize.height) * image.naturalHeight)} px original</>
                )}
              </span>
            )}
          </div>

        {previewUrl && (
            <div className="rounded-xl border border-border bg-bg p-4 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Prévia</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Cortada" className="mx-auto max-h-64 rounded-lg" />
              <a
                href={previewUrl}
                download="imagem-cortada.png"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2 text-sm font-bold text-white transition hover:bg-accent/90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Baixar imagem
              </a>
            </div>
          )}
        </>
      )}
    </div>
  )
}
