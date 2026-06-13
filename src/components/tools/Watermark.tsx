"use client"

import Image from "next/image"
import { useState, useRef } from "react"

export function Watermark() {
  const [imagem, setImagem] = useState<string | null>(null)
  const [texto, setTexto] = useState("© Oráculo AI")
  const [opacidade, setOpacidade] = useState(50)
  const [posicao, setPosicao] = useState("centro")
  const [processando, setProcessando] = useState(false)
  const [resultadoUrl, setResultadoUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      setImagem(ev.target?.result as string)
      setResultadoUrl(null)
    }
    reader.readAsDataURL(file)
  }

  const aplicarMarca = () => {
    if (!imagem) return
    setProcessando(true)

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      const ctx = canvas.getContext("2d")!

      // Redimensiona para no máximo 1200px de largura
      const maxW = 1200
      const escala = Math.min(1, maxW / img.width)
      const w = Math.round(img.width * escala)
      const h = Math.round(img.height * escala)

      canvas.width = w
      canvas.height = h

      // Desenha imagem redimensionada
      ctx.drawImage(img, 0, 0, w, h)

      // Configura marca d'água
      ctx.globalAlpha = opacidade / 100
      ctx.fillStyle = "#ffffff"
      ctx.font = `bold ${Math.round(w * 0.04)}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Sombra no texto para legibilidade
      ctx.shadowColor = "rgba(0,0,0,0.5)"
      ctx.shadowBlur = 4

      const padding = Math.round(w * 0.04)
      let x: number, y: number

      switch (posicao) {
        case "topo-esq":
          x = padding
          y = padding + Math.round(w * 0.04) / 2
          ctx.textAlign = "left"
          ctx.textBaseline = "top"
          break
        case "topo-dir":
          x = w - padding
          y = padding + Math.round(w * 0.04) / 2
          ctx.textAlign = "right"
          ctx.textBaseline = "top"
          break
        case "base-esq":
          x = padding
          y = h - padding - Math.round(w * 0.04) / 2
          ctx.textAlign = "left"
          ctx.textBaseline = "bottom"
          break
        case "base-dir":
          x = w - padding
          y = h - padding - Math.round(w * 0.04) / 2
          ctx.textAlign = "right"
          ctx.textBaseline = "bottom"
          break
        case "centro":
        default:
          x = w / 2
          y = h / 2
          break
      }

      // Rotaciona levemente para não atrapalhar visualização
      if (posicao === "centro") {
        ctx.rotate(-0.2)
      }

      ctx.fillText(texto, x, y)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.globalAlpha = 1
      ctx.shadowColor = "transparent"

      setResultadoUrl(canvas.toDataURL("image/png"))
      setProcessando(false)
    }
    img.src = imagem
  }

  const handleDownload = () => {
    if (!resultadoUrl) return
    const link = document.createElement("a")
    link.download = "imagem-com-marca-dagua.png"
    link.href = resultadoUrl
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Selecione uma imagem
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFile}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary file:mr-3 file:rounded file:border-0 file:bg-accent file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white focus:border-accent-border focus:outline-none"
        />
      </div>

      {imagem && (
        <>
          {/* Preview original */}
          <div className="rounded-lg border border-border bg-bg p-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-bg">
              <Image
                src={imagem}
                alt="Preview"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          {/* Configurações */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-secondary">
                Texto da marca d&apos;água
              </label>
              <input
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-secondary">
                Posição
              </label>
              <select
                value={posicao}
                onChange={(e) => setPosicao(e.target.value)}
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
              >
                <option value="centro">Centro</option>
                <option value="topo-esq">Topo esquerdo</option>
                <option value="topo-dir">Topo direito</option>
                <option value="base-esq">Base esquerda</option>
                <option value="base-dir">Base direita</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-secondary">
              Opacidade: {opacidade}%
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={opacidade}
              onChange={(e) => setOpacidade(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          <button
            onClick={aplicarMarca}
            disabled={processando}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)] disabled:opacity-50"
          >
            {processando ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            )}
            {processando ? "Processando..." : "Aplicar Marca d'Água"}
          </button>

          {/* Resultado */}
          {resultadoUrl && (
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-bg p-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-bg">
                  <Image
                    src={resultadoUrl}
                    alt="Resultado"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Baixar imagem
              </button>
            </div>
          )}
        </>
      )}

      {/* Canvas oculto para processamento */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
