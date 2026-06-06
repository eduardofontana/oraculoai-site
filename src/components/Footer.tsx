import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-display)] text-lg text-white">
              {site.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-400">
              Criação de sites, hospedagem com preço de revenda Hostinger e consultoria em
              cybersecurity. Atendimento direto, sem burocracia.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Serviços
            </p>
            <nav className="mt-4 flex flex-col gap-2">
              {site.services.map((s) => (
                <Link key={s.href} href={s.href} className="text-sm text-zinc-400 transition hover:text-white">
                  {s.title}
                </Link>
              ))}
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
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-zinc-600">
            Parceiro autorizado Hostinger
          </p>
        </div>
      </div>
    </footer>
  );
}
