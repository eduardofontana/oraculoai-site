import Link from "next/link"
import type { Tool } from "@/data/tools"

export function ToolCard({ tool }: { tool: Tool }) {
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
      <span className="mt-3 inline-block rounded-full bg-accent-soft px-3 py-0.5 text-xs font-medium text-accent-text">
        {tool.category}
      </span>
    </Link>
  )
}
