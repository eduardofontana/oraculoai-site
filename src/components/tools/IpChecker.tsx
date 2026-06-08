"use client"

import { useEffect, useState } from "react"

export function IpChecker() {
  const [ip, setIp] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json")
        const data = await res.json()
        setIp(data.ip)
      } catch {
        setError("Não foi possível obter o IP. Verifique sua conexão.")
      } finally {
        setLoading(false)
      }
    }
    fetchIp()
  }, [])

  return (
    <div className="space-y-6">
      {loading && <p className="text-sm text-muted">Obtendo IP...</p>}
      {error && <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4"><p className="text-sm font-bold text-red-500">{error}</p></div>}
      {ip && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-bg p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Seu IP público</p>
            <p className="mt-2 font-mono text-3xl font-extrabold text-accent">{ip}</p>
          </div>
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="text-xs text-muted">
              Informações adicionais (cidade, ISP) podem ser obtidas através de APIs como ipapi.co ou ipwhois.io,
              mas exigem chave de API ou limite de requisições.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
