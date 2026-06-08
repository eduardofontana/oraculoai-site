"use client"

import { useState } from "react"
import { generatePixPayload } from "@/lib/pix"
import { CopyButton } from "./CopyButton"

export function PixGenerator() {
  const [key, setKey] = useState("")
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [payload, setPayload] = useState("")

  const generate = () => {
    if (!key || !name || !city) return
    const p = generatePixPayload({
      key,
      name,
      city,
      amount: amount || undefined,
      description: description || undefined,
    })
    setPayload(p)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Chave Pix *
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="CPF, CNPJ, e-mail, telefone ou chave aleatória"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Nome do recebedor *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Cidade *
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="São Paulo"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Valor (opcional)
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="R$ 100,00"
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-secondary">
            Descrição (opcional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Pagamento referente a..."
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={generate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Gerar Pix
      </button>

      {payload && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
              Código Pix Copia e Cola
            </p>
            <p className="break-all font-mono text-sm text-primary">
              {payload}
            </p>
          </div>
          <CopyButton text={payload} label="Copiar código Pix" />
          <p className="text-xs text-muted">
            Ferramenta local, sem intermediação de pagamento. O QR Code Pix pode
            ser gerado na ferramenta de QR Code com o código acima.
          </p>
        </div>
      )}
    </div>
  )
}
