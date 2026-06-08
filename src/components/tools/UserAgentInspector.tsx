"use client"

export function UserAgentInspector() {
  if (typeof window === "undefined") {
    return <p className="text-sm text-muted">Coletando dados...</p>
  }

  const ua = navigator.userAgent
  const info: Record<string, string> = {
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
  }

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
