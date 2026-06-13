import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  bullets: readonly string[];
  href: string;
  icon: string;
  highlight: string;
};

const iconMap: Record<string, { node: React.ReactNode; color: string }> = {
  globe: {
    color: "text-accent-blue",
    node: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  server: {
    color: "text-accent-text",
    node: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  shield: {
    color: "text-accent-blue",
    node: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  brain: {
    color: "text-accent",
    node: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v1h2a3 3 0 0 1 3 3v1h-2v-1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1H3v-1a3 3 0 0 1 3-3h2V6a4 4 0 0 1 4-4z" />
        <path d="M12 6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
        <path d="M6 12h12" />
        <path d="M6 16h12" />
      </svg>
    ),
  },
  bot: {
    color: "text-accent-text",
    node: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="16" r="1" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        <line x1="2" y1="16" x2="3" y2="16" />
        <line x1="21" y1="16" x2="22" y2="16" />
      </svg>
    ),
  },
  "message-circle": {
    color: "text-accent-blue",
    node: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  zap: {
    color: "text-accent",
    node: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  search: {
    color: "text-accent-blue",
    node: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
};

export function ServiceCard({ title, description, bullets, href, icon, highlight }: ServiceCardProps) {
  const { node: svgIcon, color: iconColor } = iconMap[icon] ?? { node: null, color: "text-accent-text" };

  return (
    <Link href={href} className="group block h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent-border hover:shadow-[0_0_40px_var(--glow)]">
        <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border ${iconColor} bg-surface-overlay`}>
          {svgIcon}
        </div>
        <h3 className="text-xl font-bold text-primary">
          {title}
        </h3>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-text uppercase tracking-wider">
          {highlight}
        </p>
        <p className="mt-4 text-sm leading-6 text-secondary">{description}</p>
        <ul className="mt-6 space-y-3 text-sm text-secondary">
          {bullets.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
              {item}
            </li>
          ))}
        </ul>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent transition-all group-hover:gap-3">
          Ver serviço
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </span>
      </article>
    </Link>
  );
}
