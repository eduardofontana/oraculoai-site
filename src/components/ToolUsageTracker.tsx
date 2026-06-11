"use client"

import { useEffect } from "react"
import { trackToolUsage } from "@/lib/analytics"

/**
 * Componente invisível que rastreia o uso de uma ferramenta.
 * Deve ser inserido no ToolLayout (que é server component).
 */
export function ToolUsageTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackToolUsage(slug)
  }, [slug])

  return null
}
