import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <Logo className="h-12 w-auto" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-secondary">
              Agentes de IA, automação de processos e soluções digitais que funcionam pro seu negócio.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              IA e Automação
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              <Link href="/consultoria-ia" className="text-sm text-secondary transition hover:text-primary">
                Consultoria em IA
              </Link>
              <Link href="/agentes-ia" className="text-sm text-secondary transition hover:text-primary">
                Agentes de IA
              </Link>
              <Link href="/consultoria-ia" className="text-sm text-secondary transition hover:text-primary">
                Automação com IA
              </Link>
              <Link href="/agentes-ia" className="text-sm text-secondary transition hover:text-primary">
                Chatbots Inteligentes
              </Link>
            </nav>
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
            Infraestrutura com parceiros de hospedagem
          </p>
        </div>
      </div>
    </footer>
  );
}
