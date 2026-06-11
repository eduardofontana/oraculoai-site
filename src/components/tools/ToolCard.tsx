"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Tool } from "@/data/tools"
import { isToolPopular, getToolUsage } from "@/lib/analytics"

export function ToolCard({ tool }: { tool: Tool }) {
  const [popular, setPopular] = useState(false)
  const [usage, setUsage] = useState(0)

  useEffect(() => {
    setPopular(isToolPopular(tool.slug))
    setUsage(getToolUsage(tool.slug))
  }, [tool.slug])

  return (
    <Link
      href={`/ferramentas/${tool.slug}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent-border hover:shadow-[0_0_24px_var(--glow)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-primary transition-colors group-hover:text-accent-text">
            {tool.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-secondary">
            {tool.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {popular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-500">
              <span>🔥</span>
              <span>{usage}</span>
            </span>
          )}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent-text"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
      <span className="mt-3 inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-text">
        {tool.category}
      </span>
    </Link>
  )
}
