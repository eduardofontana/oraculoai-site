import type { ReactNode } from "react"
import type { Metadata } from "next"
import { tools, getRelatedTools } from "@/data/tools"
import Link from "next/link"
import { ToolUsageTracker } from "@/components/ToolUsageTracker"

interface ToolLayoutProps {
  slug: string
  title: string
  description: string
  children: ReactNode
}

export function buildMetadata(slug: string): Metadata {
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return {}
  return {
    title: `${tool.title} | Oráculo AI`,
    description: `${tool.description} Ferramenta gratuita, rápida e segura, com processamento local no navegador sempre que possível.`,
  }
}

export function ToolLayout({
  slug,
  title,
  description,
  children,
}: ToolLayoutProps) {
  const related = getRelatedTools(slug)

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-8">
      <ToolUsageTracker slug={slug} />
      <Link
        href="/ferramentas"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition hover:text-primary"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar para Ferramentas
      </Link>

      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-base leading-relaxed text-secondary">
          {description}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 md:p-8">
        {children}
      </div>

      
      <p className="mt-4 text-xs leading-6 text-muted">
        A maioria das ferramentas roda localmente no navegador. Quando uma
        ferramenta depende de serviço externo, isso é indicado na própria página.
      </p>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-4 font-display text-xl font-bold text-primary">
            Ferramentas relacionadas
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/ferramentas/${r.slug}`}
                className="group rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent-border"
              >
                <p className="text-sm font-semibold text-primary transition-colors group-hover:text-accent-text">
                  {r.title}
                </p>
                <p className="mt-1 text-xs text-secondary">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
