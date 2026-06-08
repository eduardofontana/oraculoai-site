"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { CopyButton } from "./CopyButton"

export function UuidGenerator() {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState<string[]>([])

  const generate = () => {
    setUuids(Array.from({ length: count }, () => uuidv4()))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Quantidade
        </label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-24 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={generate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Gerar UUID{count > 1 ? "s" : ""}
      </button>

      {uuids.length > 0 && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <div className="space-y-2">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-primary">{uuid}</span>
                  <CopyButton text={uuid} />
                </div>
              ))}
            </div>
          </div>
          {uuids.length > 1 && (
            <CopyButton text={uuids.join("\n")} label="Copiar todos" />
          )}
        </div>
      )}
    </div>
  )
}
