"use client"

import { useState, useMemo } from "react"
import { calcularSubnet, CIDR_PRESETS, type SubnetResult } from "@/lib/subnet"
import { CopyButton } from "./CopyButton"

export function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.0")
  const [cidr, setCidr] = useState(24)

  const resultado = useMemo<SubnetResult | string>(() => {
    return calcularSubnet(ip, cidr)
  }, [ip, cidr])

  const data = typeof resultado === "object" ? resultado : null
  const error = typeof resultado === "string" ? resultado : null

  const cidrInfo = CIDR_PRESETS.find((p) => p.cidr === cidr)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Endereço IP
          </label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.0"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Máscara (CIDR): /{cidr}
          </label>
          <div className="flex gap-2">
            <input
              type="range"
              min="0"
              max="32"
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="w-12 text-right font-mono text-sm text-primary">{cidr}</span>
          </div>
          {cidrInfo && (
            <p className="mt-1 text-xs text-muted">{cidrInfo.desc}</p>
          )}
        </div>
      </div>

      {/* CIDR Presets */}
      <details className="rounded-lg border border-border bg-card">
        <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary">
          Máscaras comuns
        </summary>
        <div className="grid gap-1 border-t border-border px-4 py-3 sm:grid-cols-3">
          {CIDR_PRESETS.slice(0, 12).map((p) => (
            <button
              key={p.cidr}
              onClick={() => setCidr(p.cidr)}
              className={`rounded px-3 py-1.5 text-left text-xs transition-all ${
                cidr === p.cidr
                  ? "bg-accent-soft text-accent"
                  : "text-secondary hover:bg-surface-overlay"
              }`}
            >
              <span className="font-mono">/{p.cidr}</span>
              <span className="ml-2 text-muted">{p.hosts} hosts</span>
            </button>
          ))}
        </div>
      </details>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-4">
          {/* Cards principais */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-bg p-3 text-center">
              <p className="text-xs text-muted">Rede</p>
              <p className="mt-1 font-mono text-sm font-bold text-primary">{data.networkAddress}</p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-3 text-center">
              <p className="text-xs text-muted">Primeiro Host</p>
              <p className="mt-1 font-mono text-sm font-bold text-accent">{data.firstHost}</p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-3 text-center">
              <p className="text-xs text-muted">Último Host</p>
              <p className="mt-1 font-mono text-sm font-bold text-accent">{data.lastHost}</p>
            </div>
            <div className="rounded-lg border border-border bg-bg p-3 text-center">
              <p className="text-xs text-muted">Broadcast</p>
              <p className="mt-1 font-mono text-sm font-bold text-primary">{data.broadcastAddress}</p>
            </div>
          </div>

          {/* Detalhes */}
          <div className="rounded-lg border border-border bg-card">
            <div className="divide-y divide-border">
              {[
                { label: "Endereço IP", value: `${data.ip}/${data.cidr}` },
                { label: "Máscara de Rede", value: `${data.mask}` },
                { label: "Máscara (binário)", value: data.maskBinary, mono: true },
                { label: "IP (binário)", value: data.ipBinary, mono: true },
                { label: "Rede (binário)", value: data.networkBinary, mono: true },
                { label: "Broadcast (binário)", value: data.broadcastBinary, mono: true },
                { label: "Wildcard", value: data.wildcard },
                { label: "Total de Hosts", value: data.totalHosts.toLocaleString() },
                { label: "Hosts Utilizáveis", value: data.usableHosts.toLocaleString() },
                { label: "Classe IP", value: data.ipClass },
                { label: "Rede Privada", value: data.isPrivate ? "Sim" : "Não" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-muted">{row.label}</span>
                  <span className={`font-medium text-primary ${row.mono ? "font-mono" : ""}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <CopyButton
            text={`IP: ${data.ip}/${data.cidr}\nMáscara: ${data.mask}\nRede: ${data.networkAddress}\nBroadcast: ${data.broadcastAddress}\nHosts: ${data.firstHost} - ${data.lastHost}\nHosts Utilizáveis: ${data.usableHosts}`}
            label="Copiar dados"
          />
        </div>
      )}
    </div>
  )
}
