"use client"

import { useState } from "react"
import { generateHash } from "@/lib/hash"
import { CopyButton } from "./CopyButton"

type Algorithm = "SHA-1" | "SHA-256"

export function HashGenerator() {
  const [text, setText] = useState("")
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-256")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const hash = await generateHash(algorithm, text)
      setResult(hash)
    } catch {
      setResult("Erro ao gerar hash")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
          {(["SHA-1", "SHA-256"] as Algorithm[]).map((algo) => (
          <button
            key={algo}
            onClick={() => {
              setAlgorithm(algo)
              setResult("")
            }}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
              algorithm === algo
                ? "bg-accent text-white"
                : "border border-border bg-card text-secondary hover:border-accent-border"
            }`}
          >
            {algo}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Texto para gerar hash
        </label>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setResult("")
          }}
          rows={4}
          placeholder="Digite o texto..."
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)] disabled:opacity-50"
      >
        {loading ? "Gerando..." : "Gerar Hash"}
      </button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="break-all font-mono text-sm text-primary">{result}</p>
          </div>
          <CopyButton text={result} />
        </div>
      )}
    </div>
  )
}
