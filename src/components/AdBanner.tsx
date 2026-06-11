type AdFormat = "horizontal" | "rectangle" | "leaderboard"

interface AdBannerProps {
  format?: AdFormat
  className?: string
}

const dimensions: Record<AdFormat, string> = {
  horizontal: "min-h-[90px]",
  rectangle: "min-h-[250px]",
  leaderboard: "min-h-[120px]",
}

export function AdBanner({ format = "horizontal", className = "" }: AdBannerProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-surface-overlay text-xs text-muted ${dimensions[format]} ${className}`}
    >
      <span className="flex items-center gap-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <path d="M6 6h.01M6 18h.01" />
        </svg>
        Publicidade
      </span>
    </div>
  )
}
