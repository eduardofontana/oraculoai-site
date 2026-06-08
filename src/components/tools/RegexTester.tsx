"use client"

import { useState, useMemo } from "react"

export function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("gi")
  const [testText, setTestText] = useState("")

  const regex = useMemo(() => {
    try {
      return { regex: new RegExp(pattern, flags), error: null }
    } catch (e) {
      return { regex: null, error: (e as Error).message }
    }
  }, [pattern, flags])

  const matches = useMemo(() => {
    if (!regex.regex || !testText) return []
    const results: { value: string; index: number }[] = []
    let match: RegExpExecArray | null
    const r = new RegExp(regex.regex.source, regex.regex.flags.includes("g") ? regex.regex.flags : regex.regex.flags + "g")
    while ((match = r.exec(testText)) !== null) {
      results.push({ value: match[0], index: match.index })
      if (match.index === r.lastIndex) r.lastIndex++
    }
    return results
  }, [regex.regex, testText])

  const matchCount = matches.length

  const highlightedText = useMemo(() => {
    if (!regex.regex || !testText || matchCount === 0) return [{ text: testText, highlight: false }]
    const parts: { text: string; highlight: boolean }[] = []
    let lastIndex = 0
    const r = new RegExp(regex.regex.source, regex.regex.flags.includes("g") ? regex.regex.flags : regex.regex.flags + "g")
    let match: RegExpExecArray | null
    while ((match = r.exec(testText)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ text: testText.slice(lastIndex, match.index), highlight: false })
      }
      parts.push({ text: match[0], highlight: true })
      lastIndex = match.index + match[0].length
      if (match.index === r.lastIndex) r.lastIndex++
    }
    if (lastIndex < testText.length) {
      parts.push({ text: testText.slice(lastIndex), highlight: false })
    }
    return parts
  }, [regex.regex, testText, matchCount])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Expressão Regular</label>
          <div className="flex rounded-lg border border-border bg-bg focus-within:border-accent-border">
            <span className="flex items-center pl-3 text-sm text-muted">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="ex: [a-z]+"
              className="flex-1 bg-transparent px-1 py-2.5 font-mono text-sm text-primary placeholder-muted focus:outline-none"
            />
            <span className="flex items-center text-sm text-muted">/</span>
            <input
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="gi"
              className="w-16 bg-transparent px-2 py-2.5 font-mono text-sm text-primary placeholder-muted focus:outline-none"
            />
          </div>
        </div>
      </div>

      {regex.error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-500">
          {regex.error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
          Texto de teste
        </label>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          rows={8}
          placeholder="Cole o texto para testar a expressão regular..."
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <div className="rounded-lg border border-border bg-bg p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Resultado</span>
          {testText && (
            <span className="text-xs text-muted">
              {matchCount} {matchCount === 1 ? "match" : "matches"} encontrado{matchCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="min-h-[60px] whitespace-pre-wrap rounded border border-border bg-bg p-3 font-mono text-sm leading-relaxed text-primary">
          {testText ? (
            highlightedText.map((part, i) =>
              part.highlight ? (
                <span key={i} className="rounded bg-accent/20 text-accent-text font-semibold">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )
          ) : (
            <span className="text-muted">Os matches aparecerão destacados aqui...</span>
          )}
        </div>
      </div>

      {matches.length > 0 && (
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
            Matches ({matchCount})
          </label>
          <div className="max-h-40 overflow-y-auto rounded-lg border border-border bg-bg p-3 font-mono text-xs">
            {matches.map((m, i) => (
              <div key={i} className="flex gap-4 py-1 text-secondary">
                <span className="w-12 shrink-0 text-muted">#{i + 1}</span>
                <span className="text-primary">&quot;{m.value}&quot;</span>
                <span className="text-muted">(posição {m.index})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
