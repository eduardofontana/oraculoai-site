import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg font-extrabold text-primary">
              <span className="text-accent">{site.name.slice(0, 1)}</span>
              {site.name.slice(1)}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary">
              Criação de sites, hospedagem com preço de revenda Hostinger e consultoria em
              cybersecurity. Atendimento direto, sem burocracia.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Serviços
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              {site.services.map((s) => (
                <Link key={s.href} href={s.href} className="text-sm text-secondary transition hover:text-primary">
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Contato
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-secondary transition hover:text-primary"
              >
                {site.email}
              </a>
              <p className="text-sm text-secondary">{site.location}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {site.name}.
          </p>
          <p className="text-xs text-muted">
            Parceiro autorizado Hostinger
          </p>
        </div>
      </div>
    </footer>
  );
}
