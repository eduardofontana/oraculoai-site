import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-tight text-primary"
        >
          <span className="text-accent">{site.shortName.slice(0, 1)}</span>
          {site.shortName.slice(1)}
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-5 md:flex">
            <Link
              href="/consultoria-ia"
              className="text-sm font-semibold text-secondary transition hover:text-primary"
            >
              Consultoria IA
            </Link>
            <Link
              href="/agentes-ia"
              className="text-sm font-semibold text-secondary transition hover:text-primary"
            >
              Agentes IA
            </Link>
            <Link
              href="/#servicos"
              className="text-sm font-semibold text-secondary transition hover:text-primary"
            >
              Serviços
            </Link>
            <Link
              href="/sobre"
              className="text-sm font-semibold text-secondary transition hover:text-primary"
            >
              Sobre
            </Link>
            <Link
              href="/ferramentas"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent-text transition-all hover:bg-accent/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              Ferramentas
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
            >
              Contato
            </a>
          </nav>
          <ThemeToggle />
          <a
            href={`mailto:${site.email}`}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-bold text-white md:hidden"
          >
            Contato
          </a>
        </div>
      </div>

      {/* ── Mobile: link Ferramentas centralizado abaixo do header ── */}
      <div className="flex justify-center border-t border-border px-6 py-3 md:hidden">
        <Link
          href="/ferramentas"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent-text transition-all hover:bg-accent/20"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          Ferramentas
        </Link>
      </div>
    </header>
  );
}
