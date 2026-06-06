import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  bullets: readonly string[];
  href: string;
  icon: string;
  highlight: string;
};

const icons: Record<string, React.ReactNode> = {
  globe: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  server: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  shield: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

export function ServiceCard({ title, description, bullets, href, icon, highlight }: ServiceCardProps) {
  const svgIcon = icons[icon] ?? null;

  return (
    <Link href={href} className="group block h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent-border hover:shadow-[0_0_40px_var(--glow)]">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-accent-soft text-accent-text">
          {svgIcon}
        </div>
        <h3 className="font-display text-2xl tracking-tight text-primary">
          {title}
        </h3>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-text">
          {highlight}
        </p>
        <p className="mt-4 text-sm leading-6 text-secondary">{description}</p>
        <ul className="mt-6 space-y-2.5 text-sm text-secondary">
          {bullets.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-text/60" />
              {item}
            </li>
          ))}
        </ul>
        <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text transition-all group-hover:gap-3">
          Ver serviço <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </article>
    </Link>
  );
}
