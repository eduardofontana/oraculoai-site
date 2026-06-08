"use client"

import { useState, useCallback } from "react"

type Format = "json" | "yaml" | "toml"

function detectFormat(text: string): Format | null {
  const t = text.trim()
  if (!t) return null
  if (t.startsWith("{") || t.startsWith("[")) return "json"
  if (t.includes("\n") && (t.includes(": ") || t.includes(":\n"))) {
    if (t.includes("=") && !t.startsWith("{")) return "toml"
    return "yaml"
  }
  return null
}

function jsonToYaml(obj: unknown, indent = 0): string {
  const pad = "  ".repeat(indent)
  if (obj === null || obj === undefined) return "null"
  if (typeof obj === "string") {
    if (obj.includes(":") || obj.includes("#") || obj.includes("\n")) return `"${obj}"`
    return obj
  }
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj)
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]"
    return obj
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          return `${pad}- ${jsonToYaml(item, indent + 1).trimStart()}`
        }
        return `${pad}- ${jsonToYaml(item, indent)}`
      })
      .join("\n")
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>)
    if (entries.length === 0) return "{}"
    return entries
      .map(([key, val]) => {
        if (typeof val === "object" && val !== null) {
          return `${pad}${key}:\n${jsonToYaml(val, indent + 1)}`
        }
        return `${pad}${key}: ${jsonToYaml(val, indent)}`
      })
      .join("\n")
  }
  return String(obj)
}

function yamlToJson(text: string): string {
  const lines = text.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"))
  const result: Record<string, unknown> = {}
  for (const line of lines) {
    const match = line.match(/^(\s*)([\w-]+):\s*(.*)$/)
    if (match) {
      const key = match[2]
      let value: unknown = match[3].trim()
      if (value === "null") value = null
      else if (value === "true") value = true
      else if (value === "false") value = false
      else if (/^\d+$/.test(String(value))) value = Number(value)
      else if (/^\d+\.\d+$/.test(String(value))) value = Number(value)
      result[key] = value
    }
  }
  return JSON.stringify(result, null, 2)
}

function jsonToToml(obj: unknown, prefix = ""): string {
  if (obj === null || obj === undefined) return ""
  if (typeof obj === "object" && !Array.isArray(obj)) {
    return Object.entries(obj as Record<string, unknown>)
      .map(([key, val]) => {
        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
          const section = prefix ? `${prefix}.${key}` : key
          return `[${section}]\n${jsonToToml(val, section)}`
        }
        const k = prefix ? `${prefix}.${key}` : key
        return `${k} = ${JSON.stringify(val)}`
      })
      .join("\n")
  }
  return JSON.stringify(obj)
}

function convert(input: string, from: Format, to: Format): string {
  try {
    if (from === "json" && to === "yaml") {
      return jsonToYaml(JSON.parse(input))
    }
    if (from === "json" && to === "toml") {
      return jsonToToml(JSON.parse(input))
    }
    if (from === "yaml" && to === "json") {
      return yamlToJson(input)
    }
    if (from === "toml" && to === "json") {
      return JSON.stringify(parseToml(input), null, 2)
    }
    if (from === "yaml" && to === "toml") {
      return jsonToToml(JSON.parse(yamlToJson(input)))
    }
    if (from === "toml" && to === "yaml") {
      return jsonToYaml(parseToml(input))
    }
    return input
  } catch {
    return "Erro: não foi possível converter o formato."
  }
}

function parseToml(text: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  let currentSection = result
  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const sectionMatch = trimmed.match(/^\[([^\]]+)\]$/)
    if (sectionMatch) {
      const keys = sectionMatch[1].split(".")
      let obj = result
      for (const key of keys) {
        if (!(key in obj)) obj[key] = {}
        obj = obj[key] as Record<string, unknown>
      }
      currentSection = obj
      continue
    }
    const kvMatch = trimmed.match(/^([\w-]+)\s*=\s*(.+)$/)
    if (kvMatch) {
      let value: unknown = kvMatch[2].trim()
      if (value === "true") value = true
      else if (value === "false") value = false
      else if (/^\d+$/.test(String(value))) value = Number(value)
      else if (/^\d+\.\d+$/.test(String(value))) value = Number(value)
      else if ((value as string).startsWith('"') && (value as string).endsWith('"'))
        value = (value as string).slice(1, -1)
      currentSection[kvMatch[1]] = value
    }
  }
  return result
}

export function YamlJsonToml() {
  const [input, setInput] = useState("")
  const [from, setFrom] = useState<Format>("json")
  const [to, setTo] = useState<Format>("yaml")

  const output = input.trim() ? convert(input, from, to) : ""

  const detected = input.trim() ? detectFormat(input) : null

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output)
  }, [output])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted">De:</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value as Format)}
            className="rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          >
            <option value="json">JSON</option>
            <option value="yaml">YAML</option>
            <option value="toml">TOML</option>
          </select>
        </div>

        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted">Para:</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value as Format)}
            className="rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-primary focus:border-accent-border focus:outline-none"
          >
            <option value="json">JSON</option>
            <option value="yaml">YAML</option>
            <option value="toml">TOML</option>
          </select>
        </div>

        {detected && detected !== from && (
          <span className="text-xs text-muted">
            (Detectado: {detected.toUpperCase()} — selecione "De" para {detected.toUpperCase()} se preferir)
          </span>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Entrada ({from.toUpperCase()})</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder={`Cole seu ${from.toUpperCase()} aqui...`}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Saída ({to.toUpperCase()})</label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              rows={10}
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary focus:outline-none"
            />
            {output && !output.startsWith("Erro") && (
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-secondary transition hover:text-primary"
              >
                Copiar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
