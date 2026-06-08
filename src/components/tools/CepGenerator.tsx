"use client"

import { useState } from "react"
import { generateEndereco, type Endereco } from "@/lib/cep"
import { CopyButton } from "./CopyButton"

export function CepGenerator() {
  const [endereco, setEndereco] = useState<Endereco | null>(null)

  return (
    <div className="space-y-6">
      <button
        onClick={() => setEndereco(generateEndereco())}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Gerar Endereço
      </button>

      {endereco && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4 space-y-2">
            <p className="text-sm text-muted">CEP: <span className="font-mono font-bold text-primary">{endereco.cep}</span></p>
            <p className="text-sm text-muted">Logradouro: <span className="text-primary">{endereco.logradouro}</span></p>
            <p className="text-sm text-muted">Bairro: <span className="text-primary">{endereco.bairro}</span></p>
            <p className="text-sm text-muted">Cidade: <span className="text-primary">{endereco.cidade}</span></p>
            <p className="text-sm text-muted">UF: <span className="text-primary">{endereco.uf}</span></p>
          </div>
          <CopyButton text={`${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}, CEP: ${endereco.cep}`} label="Copiar endereço" />
        </div>
      )}
    </div>
  )
}
