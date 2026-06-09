"use client"

import { useState, useMemo } from "react"

interface DiffEntry {
  key: string
  type: "same" | "added" | "removed" | "modified"
  valueA?: unknown
  valueB?: unknown
}

function flatten(obj: unknown, prefix = ""): Record<string, unknown> {
  if (obj === null || obj === undefined) return {}
  if (typeof obj !== "object") return { [prefix || "(value)"]: obj }
  const result: Record<string, unknown> = {}
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      if (typeof item === "object" && item !== null) {
        Object.assign(result, flatten(item, `${prefix}[${i}]`))
      } else {
        result[`${prefix}[${i}]`] = item
      }
    })
    return result
  }
  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      Object.assign(result, flatten(val, path))
    } else {
      result[path] = val
    }
  }
  return result
}

function diff(objA: unknown, objB: unknown): DiffEntry[] {
  const flatA = flatten(objA)
  const flatB = flatten(objB)
  const allKeys = new Set([...Object.keys(flatA), ...Object.keys(flatB)])
  const result: DiffEntry[] = []

  for (const key of Array.from(allKeys).sort()) {
    const inA = key in flatA
    const inB = key in flatB
    if (inA && !inB) {
      result.push({ key, type: "removed", valueA: flatA[key] })
    } else if (!inA && inB) {
      result.push({ key, type: "added", valueB: flatB[key] })
    } else if (JSON.stringify(flatA[key]) !== JSON.stringify(flatB[key])) {
      result.push({ key, type: "modified", valueA: flatA[key], valueB: flatB[key] })
    } else {
      result.push({ key, type: "same", valueA: flatA[key] })
    }
  }
  return result
}

export function DiffJson() {
  const [inputA, setInputA] = useState('{\n  "nome": "João",\n  "idade": 30,\n  "cidade": "São Paulo"\n}')
  const [inputB, setInputB] = useState('{\n  "nome": "João",\n  "idade": 31,\n  "email": "joao@exemplo.com"\n}')

  const parsedA = useMemo(() => {
    try { return { value: JSON.parse(inputA), error: null } }
    catch { return { value: null, error: "JSON A inválido" } }
  }, [inputA])

  const parsedB = useMemo(() => {
    try { return { value: JSON.parse(inputB), error: null } }
    catch { return { value: null, error: "JSON B inválido" } }
  }, [inputB])

  const diffs = useMemo(() => {
    if (parsedA.error || parsedB.error) return []
    return diff(parsedA.value, parsedB.value)
  }, [parsedA, parsedB])

  const stats = useMemo(() => {
    const same = diffs.filter((d) => d.type === "same").length
    const added = diffs.filter((d) => d.type === "added").length
    const removed = diffs.filter((d) => d.type === "removed").length
    const modified = diffs.filter((d) => d.type === "modified").length
    return { same, added, removed, modified }
  }, [diffs])

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">JSON A (original)</label>
          <textarea
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            rows={10}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
          {parsedA.error && <p className="mt-1 text-xs text-red-500">{parsedA.error}</p>}
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">JSON B (modificado)</label>
          <textarea
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            rows={10}
            className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
          />
          {parsedB.error && <p className="mt-1 text-xs text-red-500">{parsedB.error}</p>}
        </div>
      </div>

      {diffs.length > 0 && (
        <>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Iguais", value: stats.same, color: "text-green-500" },
              { label: "Adicionados", value: stats.added, color: "text-blue-500" },
              { label: "Removidos", value: stats.removed, color: "text-red-500" },
              { label: "Modificados", value: stats.modified, color: "text-yellow-500" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-bg px-4 py-2 text-center">
                <p className={`font-display text-lg font-extrabold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="max-h-80 overflow-y-auto rounded-lg border border-border bg-bg font-mono text-xs">
            {diffs.map((d, i) => {
              const colors = {
                same: "text-secondary",
                added: "bg-blue-500/10 text-blue-400 border-l-2 border-blue-500",
                removed: "bg-red-500/10 text-red-400 border-l-2 border-red-500",
                modified: "bg-yellow-500/10 text-yellow-400 border-l-2 border-yellow-500",
              }
              const labels = {
                same: "=",
                added: "+",
                removed: "-",
                modified: "~",
              }
              return (
                <div key={i} className={`flex gap-4 px-4 py-2 ${colors[d.type]}`}>
                  <span className="w-4 shrink-0 font-bold">{labels[d.type]}</span>
                  <span className="w-48 shrink-0 truncate text-muted">{d.key}</span>
                  {d.type === "removed" && <span className="truncate text-red-400">{JSON.stringify(d.valueA)}</span>}
                  {d.type === "added" && <span className="truncate text-blue-400">{JSON.stringify(d.valueB)}</span>}
                  {d.type === "modified" && (
                    <span className="truncate">
                      <span className="text-red-400">{JSON.stringify(d.valueA)}</span>
                      <span className="text-muted"> → </span>
                      <span className="text-yellow-400">{JSON.stringify(d.valueB)}</span>
                    </span>
                  )}
                  {d.type === "same" && <span className="truncate text-secondary">{JSON.stringify(d.valueA)}</span>}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
