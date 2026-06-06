import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";

export function Header() {
  const whatsappUrl = buildWhatsAppUrl(site.whatsappMessage);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-instrument-serif)] text-xl tracking-tight text-white"
        >
          {site.shortName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#services"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Serviços
          </Link>
          <Link
            href="/sobre"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Contato
          </Link>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400"
          >
            Falar no WhatsApp
          </Link>
        </nav>

        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 md:hidden"
        >
          WhatsApp
        </Link>
      </div>
    </header>
  );
}
