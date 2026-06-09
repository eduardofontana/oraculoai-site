"use client"

import { useEffect, useState } from "react"

export function IpChecker() {
  const [ip, setIp] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchIp = async () => {
      const fetchFrom = async (url: string) => {
        const res = await fetch(url, {
          cache: "no-store",
          credentials: "omit",
          referrerPolicy: "no-referrer",
        })
        const data = await res.json()
        return data.ip
      }

      try {
        const ip = await fetchFrom("https://api.ipify.org?format=json").catch(
          () => fetchFrom("https://api.my-ip.io/ip.json").catch(
            () => fetchFrom("https://ipapi.co/json/")
          )
        )
        setIp(ip)
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
      <div className="rounded-lg border border-border bg-bg p-4">
        <p className="text-xs leading-6 text-muted">
          Esta ferramenta consulta serviços externos para identificar seu IP público.
          Apenas essa informação é enviada às APIs usadas na consulta.
        </p>
      </div>
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
