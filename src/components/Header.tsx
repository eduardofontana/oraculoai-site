import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const whatsappUrl = buildWhatsAppUrl(site.whatsappMessage);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-primary"
        >
          {site.shortName}
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/#services"
              className="text-sm text-secondary transition hover:text-accent-text"
            >
              Serviços
            </Link>
            <Link
              href="/#hosting"
              className="text-sm text-secondary transition hover:text-accent-text"
            >
              Revenda Hostinger
            </Link>
            <Link
              href="/sobre"
              className="text-sm text-secondary transition hover:text-accent-text"
            >
              Sobre
            </Link>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
            >
              Falar no WhatsApp
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </nav>
          <ThemeToggle />
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white md:hidden"
          >
            WhatsApp
          </Link>
        </div>
      </div>
    </header>
  );
}
