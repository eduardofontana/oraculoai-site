"use client"

import { useEffect, useState } from "react"

export function UserAgentInspector() {
  const [info, setInfo] = useState<Record<string, string>>({})

  useEffect(() => {
    const ua = navigator.userAgent
    setInfo({
      "User-Agent": ua,
      "Plataforma": navigator.platform,
      "Idioma": navigator.language,
      "Cookies habilitados": navigator.cookieEnabled ? "Sim" : "Não",
      "Hardware Concurrency": String(navigator.hardwareConcurrency || "N/A"),
      "Resolução de tela": `${screen.width}x${screen.height}`,
      "Profundidade de cor": `${screen.colorDepth} bits`,
      "Viewport": `${window.innerWidth}x${window.innerHeight}`,
      "Navegador": ua.includes("Chrome") ? "Chrome" : ua.includes("Firefox") ? "Firefox" : ua.includes("Safari") ? "Safari" : "Outro",
      "Sistema": ua.includes("Windows") ? "Windows" : ua.includes("Mac") ? "macOS" : ua.includes("Linux") ? "Linux" : "Outro",
    })
  }, [])

  if (Object.keys(info).length === 0) return <p className="text-sm text-muted">Coletando dados...</p>

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <tbody>
            {Object.entries(info).map(([key, value], i) => (
              <tr key={key} className={i % 2 === 0 ? "bg-bg" : "bg-card"}>
                <td className="px-4 py-2.5 font-medium text-secondary">{key}</td>
                <td className="px-4 py-2.5 font-mono text-primary">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
