"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

export function QrCodeGenerator() {
  const [text, setText] = useState("")
  const [qrDataUrl, setQrDataUrl] = useState("")

  const generate = async () => {
    if (!text.trim()) return
    const QRCode = (await import("qrcode")).default
    const url = await QRCode.toDataURL(text, { width: 300, margin: 2 })
    setQrDataUrl(url)
  }

  const download = () => {
    if (!qrDataUrl) return
    const a = document.createElement("a")
    a.href = qrDataUrl
    a.download = "qrcode.png"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Texto ou URL
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://exemplo.com"
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={generate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Gerar QR Code
      </button>

      {qrDataUrl && (
        <div className="space-y-4">
          <div className="flex justify-center rounded-lg border border-border bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="QR Code" className="h-48 w-48" />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={download}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-secondary transition-all hover:border-accent-border hover:text-accent-text"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Baixar PNG
            </button>
            <CopyButton text={text} label="Copiar conteúdo" />
          </div>
        </div>
      )}
    </div>
  )
}
