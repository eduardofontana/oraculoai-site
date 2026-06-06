import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function CybersecurityPage() {
  const message = buildWhatsAppUrl("Olá! Quero revisar a segurança do meu site ou servidor.");

  return (
    <main className="min-h-[80vh] text-primary">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent-blue/5 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-[120px]" />
        </div>

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">
                Serviço 02
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-primary md:text-7xl">
                Cybersecurity
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg">
                Segurança prática para reduzir risco, organizar proteção e manter seu ambiente digital sob controle.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={message}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)] hover:-translate-y-0.5"
                >
                  Falar no WhatsApp
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/servicos/dominios-hospedagem"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-secondary backdrop-blur-xl transition hover:border-border-hover hover:text-primary"
                >
                  Ver domínios e hospedagem
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">O que entrego</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Hardening</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Ajustes defensivos para reduzir exposição e fortalecer a base.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Auditoria inicial</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Leitura prática dos principais riscos e pontos de melhoria.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue-soft text-accent-blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Backup e monitoramento</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Rotina mínima para manter recuperação e visibilidade.</p>
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
                Menos risco, mais clareza e uma postura defensiva que parece profissional.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Ideal para</p>
              <p className="mt-4 text-base leading-7 text-secondary">
                Negócios que precisam de proteção prática sem discurso genérico ou complexo.
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
