"use client"

import { useState } from "react"
import { csvToJson, detectDelimiter } from "@/lib/csvToJson"
import { CopyButton } from "./CopyButton"

export function CsvToJson() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [delimiter, setDelimiter] = useState("auto")
  const [hasHeader, setHasHeader] = useState(true)

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Cole o conteúdo CSV primeiro.")
      setOutput("")
      return
    }

    try {
      setError("")
      const detected = delimiter === "auto" ? detectDelimiter(input) : delimiter
      const result = csvToJson(input, {
        delimiter: detected,
        hasHeader,
      })
      setOutput(result)
    } catch (e) {
      setError(`Erro ao converter: ${(e as Error).message}`)
      setOutput("")
    }
  }

  const autoDetected = input.trim()
    ? detectDelimiter(input)
    : ""

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-secondary">
            Delimitador
          </label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          >
            <option value="auto">Automático {autoDetected && `("${autoDetected}")`}</option>
            <option value=",">Vírgula (,)</option>
            <option value=";">Ponto e vírgula (;)</option>
            <option value="\t">Tabulação</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-secondary">
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={(e) => setHasHeader(e.target.checked)}
              className="h-4 w-4 rounded border-border bg-card text-accent"
            />
            Primeira linha é cabeçalho
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          CSV de entrada
        </label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
            setOutput("")
          }}
          rows={8}
          placeholder={`nome,email,telefone\nJoão,joao@email.com,(11) 99999-0000\nMaria,maria@email.com,(21) 98888-0000`}
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={handleConvert}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Converter para JSON
      </button>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm font-bold text-red-500">
          {error}
        </div>
      )}

      {output && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <pre className="max-h-80 overflow-auto font-mono text-sm leading-relaxed text-primary">
              {output}
            </pre>
          </div>
          <CopyButton text={output} label="Copiar JSON" />
        </div>
      )}
    </div>
  )
}
