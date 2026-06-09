"use client"

import { useEffect, useState } from "react"

export function IpChecker() {
  const [ip, setIp] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json", {
          cache: "no-store",
          credentials: "omit",
          referrerPolicy: "no-referrer",
        })
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
      <div className="rounded-lg border border-border bg-bg p-4">
        <p className="text-xs leading-6 text-muted">
          Esta ferramenta consulta apenas um serviço externo para identificar seu IP público.
          Somente o IP público é enviado na requisição.
        </p>
      </div>
      {loading && <p className="text-sm text-muted">Obtendo IP...</p>}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-sm font-bold text-red-500">{error}</p>
        </div>
      )}
      {ip && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-bg p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Seu IP público
            </p>
            <p className="mt-2 font-mono text-3xl font-extrabold text-accent">
              {ip}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="text-xs text-muted">
              Esta página não coleta nome, e-mail, telefone, cookies ou dados persistentes.
              Se precisar de informações adicionais, use uma ferramenta dedicada com política de privacidade própria.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
