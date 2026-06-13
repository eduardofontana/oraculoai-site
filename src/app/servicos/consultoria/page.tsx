import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function ConsultoriaPage() {
  return (
    <main className="min-h-[80vh] text-primary">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent-blue/5 blur-[120px]" />
        </div>

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">
                Serviço 03
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-primary md:text-7xl">
                Consultoria em IA e Segurança
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg">
                Inteligência artificial aplicada ao seu negócio e cibersegurança prática pra proteger sua operação digital.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${site.email}?subject=Consultoria em IA e Segurança`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)] hover:-translate-y-0.5"
                >
                  Falar com especialista
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </a>
                <Link
                  href="/servicos/desenvolvimento-web"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-secondary backdrop-blur-xl transition hover:border-border-hover hover:text-primary"
                >
                  Ver criação de sites
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">O que oferecemos</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Inteligência Artificial</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Automação de processos, análise de dados e IA aplicada ao seu negócio.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Cibersegurança</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Hardening, auditoria de vulnerabilidades e proteção para sites, servidores e operações digitais.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue-soft text-accent-blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Monitoramento e Manutenção</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Supervisão contínua de ambientes web com resposta rápida a incidentes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <section className="mt-14 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Resultado esperado</p>
              <p className="mt-4 text-base leading-7 text-secondary">
                Mais inovação, menos risco e uma operação digital preparada pro futuro.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Ideal para</p>
              <p className="mt-4 text-base leading-7 text-secondary">
                Empresas que querem aplicar IA no negócio ou precisam de segurança digital sem complicação.
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
