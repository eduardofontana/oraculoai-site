"use client"

import { useState } from "react"

interface ImageItem {
  id: string
  file: File
  dataUrl: string
}

export function ImageToPdf() {
  const [images, setImages] = useState<ImageItem[]>([])

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const newImages: ImageItem[] = []
    const totalCount = images.length + files.length

    Array.from(files).slice(0, 10).forEach((file) => {
      if (totalCount > 10) return
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) return
      if (file.size > 5 * 1024 * 1024) return

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push({
            id: crypto.randomUUID(),
            file,
            dataUrl: e.target.result as string,
          })
          if (newImages.length === Math.min(files.length, 10 - images.length + newImages.length)) {
            setImages((prev) => [...prev, ...newImages].slice(0, 10))
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const moveImage = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= images.length) return
    setImages((prev) => {
      const items = [...prev]
      ;[items[index], items[newIndex]] = [items[newIndex], items[index]]
      return items
    })
  }

  const generatePdf = async () => {
    if (images.length === 0) return
    const { jsPDF } = await import("jspdf")

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    for (let i = 0; i < images.length; i++) {
      if (i > 0) pdf.addPage()
      const img = images[i]
      const imgProps = new Image()
      imgProps.src = img.dataUrl

      await new Promise((resolve) => {
        imgProps.onload = () => {
          const pageWidth = pdf.internal.pageSize.getWidth()
          const pageHeight = pdf.internal.pageSize.getHeight()
          const margin = 10
          const maxWidth = pageWidth - margin * 2
          const maxHeight = pageHeight - margin * 2

          let imgWidth = imgProps.width
          let imgHeight = imgProps.height

          const widthRatio = maxWidth / imgWidth
          const heightRatio = maxHeight / imgHeight
          const ratio = Math.min(widthRatio, heightRatio)

          imgWidth *= ratio
          imgHeight *= ratio

          const x = (pageWidth - imgWidth) / 2
          const y = (pageHeight - imgHeight) / 2

          pdf.addImage(img.dataUrl, "JPEG", x, y, imgWidth, imgHeight)
          resolve(undefined)
        }
      })
    }

    pdf.save("documento.pdf")
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Selecione imagens (PNG ou JPG, até 10 imagens, 5 MB cada)
        </label>
        <input
          type="file"
          accept="image/png,image/jpeg"
          multiple
          onChange={(e) => addFiles(e.target.files)}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
        />
      </div>

      {images.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-secondary">
            {images.length} de 10 imagens
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-lg border border-border bg-bg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.dataUrl}
                  alt={img.file.name}
                  className="h-32 w-full object-cover"
                />
                <div className="flex items-center justify-between gap-1 bg-card p-2">
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveImage(i, -1)}
                      disabled={i === 0}
                      className="rounded p-1 text-muted transition hover:text-primary disabled:opacity-30"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveImage(i, 1)}
                      disabled={i === images.length - 1}
                      className="rounded p-1 text-muted transition hover:text-primary disabled:opacity-30"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="rounded p-1 text-red-500 transition hover:bg-red-500/10"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={generatePdf}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Baixar PDF
          </button>
        </div>
      )}
    </div>
  )
}
