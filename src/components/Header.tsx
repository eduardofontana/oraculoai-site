import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";

export function Header() {
  const whatsappUrl = buildWhatsAppUrl(site.whatsappMessage);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl tracking-tight text-white"
        >
          {site.shortName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#services"
            className="text-sm text-zinc-400 transition hover:text-amber-400"
          >
            Serviços
          </Link>
          <Link
            href="/#hosting"
            className="text-sm text-zinc-400 transition hover:text-amber-400"
          >
            Revenda Hostinger
          </Link>
          <Link
            href="/sobre"
            className="text-sm text-zinc-400 transition hover:text-amber-400"
          >
            Sobre
          </Link>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-2 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all hover:shadow-[0_0_24px_rgba(251,191,36,0.4)]"
          >
            Falar no WhatsApp
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </nav>

        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 md:hidden"
        >
          WhatsApp
        </Link>
      </div>
    </header>
  );
}
