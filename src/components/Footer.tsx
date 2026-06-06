import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-[family-name:var(--font-instrument-serif)] text-lg text-white">
              {site.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Presença digital premium que vende, protege e escala.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Navegar
            </p>
            <nav className="mt-4 flex flex-col gap-2">
              <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">
                Home
              </Link>
              <Link href="/#services" className="text-sm text-zinc-400 transition hover:text-white">
                Serviços
              </Link>
              <Link href="/sobre" className="text-sm text-zinc-400 transition hover:text-white">
                Sobre
              </Link>
              <Link href="/contato" className="text-sm text-zinc-400 transition hover:text-white">
                Contato
              </Link>
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Contato
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                {site.email}
              </a>
              <p className="text-sm text-zinc-400">{site.location}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
