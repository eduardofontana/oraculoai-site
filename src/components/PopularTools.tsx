"use client"

import { useState, useEffect } from "react"
import { tools } from "@/data/tools"
import { getTopTools } from "@/lib/analytics"
import { ToolCard } from "@/components/tools/ToolCard"

const FALLBACK_SLUGS = [
  "gerador-cpf",
  "validador-cpf",
  "gerador-cnpj",
  "gerador-qr-code",
  "gerador-pix",
  "formatador-json",
]

export function PopularTools() {
  const [topSlugs, setTopSlugs] = useState<string[]>(FALLBACK_SLUGS)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const slugs = getTopTools(6)
      if (slugs.length >= 3) {
        setTopSlugs(slugs)
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  const topTools = tools.filter((t) => topSlugs.includes(t.slug))

  if (topTools.length === 0) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {topTools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  )
}
