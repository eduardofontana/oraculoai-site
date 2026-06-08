"use client"

import { useState } from "react"
import { generateCNH } from "@/lib/cnh"
import { CopyButton } from "./CopyButton"

export function CnhGenerator() {
  const [cnh, setCnh] = useState("")

  return (
    <div className="space-y-6">
      <button
        onClick={() => setCnh(generateCNH())}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Gerar CNH
      </button>

      {cnh && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="font-mono text-xl font-bold tracking-wider text-primary">{cnh}</p>
          </div>
          <CopyButton text={cnh} />
        </div>
      )}
    </div>
  )
}
