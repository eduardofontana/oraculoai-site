"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { tools } from "@/data/tools"

export function ToolSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Abre/fecha com Ctrl+K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Foco no input ao abrir
  useEffect(() => {
    if (open) {
      // Pequeno delay para a animação de abertura
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery("")
      setSelectedIndex(0)
    }
  }, [open])

  // Filtragem
  const results = query.trim()
    ? tools.filter((t) => {
        const q = query.toLowerCase()
        return (
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.keywords?.some((kw) => kw.toLowerCase().includes(q))
        )
      })
    : tools.slice(0, 12) // mostra algumas ao abrir sem digitar

  // Reset selectedIndex quando resultados mudam
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Navegação por setas
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault()
        router.push(`/ferramentas/${results[selectedIndex].slug}`)
        setOpen(false)
      }
    },
    [results, selectedIndex, router]
  )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-muted"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar ferramentas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-base text-primary outline-none placeholder:text-muted"
          />
          <kbd className="hidden shrink-0 rounded-md border border-border bg-surface-overlay px-2 py-0.5 text-xs text-muted sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="text-sm text-muted">Nenhuma ferramenta encontrada</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((tool, i) => (
                <li key={tool.slug}>
                  <button
                    onClick={() => {
                      router.push(`/ferramentas/${tool.slug}`)
                      setOpen(false)
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === selectedIndex
                        ? "bg-accent-soft text-accent-text"
                        : "text-primary hover:bg-surface-overlay"
                    }`}
                  >
                    <span className="flex-1 truncate font-medium">{tool.title}</span>
                    <span className="shrink-0 text-xs text-muted">{tool.category}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="hidden border-t border-border px-5 py-2.5 text-xs text-muted sm:flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-surface-overlay px-1.5 py-0.5 text-[10px]">↑↓</kbd>
            Navegar
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-surface-overlay px-1.5 py-0.5 text-[10px]">↵</kbd>
            Abrir
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-surface-overlay px-1.5 py-0.5 text-[10px]">Esc</kbd>
            Fechar
          </span>
        </div>
      </div>
    </div>
  )
}
