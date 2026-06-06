import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  bullets: readonly string[];
  href: string;
};

const icons = {
  "Desenvolvimento Web": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  Cybersecurity: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "Domínios e Hospedagem": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
};

export function ServiceCard({ title, description, bullets, href }: ServiceCardProps) {
  const icon = icons[title as keyof typeof icons] ?? null;

  return (
    <Link href={href} className="group block h-full">
      <article className="relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/20 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl">
          {icon}
        </div>
        <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
        <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
          {bullets.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
              {item}
            </li>
          ))}
        </ul>
        <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 transition group-hover:gap-2.5">
          Ver serviço <span aria-hidden="true">→</span>
        </span>
      </article>
    </Link>
  );
}
