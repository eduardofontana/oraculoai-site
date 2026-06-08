"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace("#", "")
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100; l /= 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) }
}

export function ColorConverter() {
  const [hex, setHex] = useState("#7C3AED")
  const [rgb, setRgb] = useState({ r: 124, g: 58, b: 237 })
  const [hsl, setHsl] = useState({ h: 270, s: 83, l: 58 })

  const updateFromHex = (h: string) => {
    setHex(h)
    const r = hexToRgb(h)
    if (r) {
      setRgb(r)
      setHsl(rgbToHsl(r.r, r.g, r.b))
    }
  }

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b })
    setHex(rgbToHex(r, g, b))
    setHsl(rgbToHsl(r, g, b))
  }

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l })
    const r = hslToRgb(h, s, l)
    setRgb(r)
    setHex(rgbToHex(r.r, r.g, r.b))
  }

  return (
    <div className="space-y-6">
      <div
        className="h-24 rounded-xl border border-border transition-all"
        style={{ backgroundColor: hex }}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">HEX</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="flex-1 rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary focus:border-accent-border focus:outline-none"
            />
            <CopyButton text={hex} />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">RGB</label>
          <div className="flex gap-2">
            {(["r", "g", "b"] as const).map((c) => (
              <input
                key={c}
                type="number"
                min={0}
                max={255}
                value={rgb[c]}
                onChange={(e) => {
                  const v = Math.min(255, Math.max(0, Number(e.target.value) || 0))
                  updateFromRgb(
                    c === "r" ? v : rgb.r,
                    c === "g" ? v : rgb.g,
                    c === "b" ? v : rgb.b
                  )
                }}
                className="w-16 rounded-lg border border-border bg-bg px-2 py-2.5 text-center font-mono text-sm text-primary focus:border-accent-border focus:outline-none"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">HSL</label>
          <div className="flex gap-2">
            {(["h", "s", "l"] as const).map((c) => (
              <input
                key={c}
                type="number"
                min={0}
                max={c === "h" ? 360 : 100}
                value={hsl[c]}
                onChange={(e) => {
                  const max = c === "h" ? 360 : 100
                  const v = Math.min(max, Math.max(0, Number(e.target.value) || 0))
                  updateFromHsl(
                    c === "h" ? v : hsl.h,
                    c === "s" ? v : hsl.s,
                    c === "l" ? v : hsl.l
                  )
                }}
                className="w-16 rounded-lg border border-border bg-bg px-2 py-2.5 text-center font-mono text-sm text-primary focus:border-accent-border focus:outline-none"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
