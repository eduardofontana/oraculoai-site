import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function CybersecurityPage() {
  const message = buildWhatsAppUrl("Olá! Quero revisar a segurança do meu site ou servidor.");

  return (
    <main className="min-h-[80vh] text-primary">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-text/70">
                Serviço 02
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl tracking-tight text-primary md:text-7xl">
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
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)]"
                >
                  Falar no WhatsApp
                </Link>
                <Link
                  href="/servicos/dominios-hospedagem"
                  className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-semibold text-secondary backdrop-blur-xl transition hover:border-border-hover hover:text-primary"
                >
                  Ver domínios e hospedagem
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <aside className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">O que entrego</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-border bg-surface-overlay p-4">
                  <p className="font-medium text-primary">Hardening</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">
                    Ajustes defensivos para reduzir exposição e fortalecer a base.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface-overlay p-4">
                  <p className="font-medium text-primary">Auditoria inicial</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">
                    Leitura prática dos principais riscos e pontos de melhoria.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface-overlay p-4">
                  <p className="font-medium text-primary">Backup e monitoramento</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">
                    Rotina mínima para manter recuperação e visibilidade.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <section className="mt-14 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-text/60">
                Resultado esperado
              </p>
              <p className="mt-4 text-base leading-7 text-secondary">
                Menos risco, mais clareza e uma postura defensiva que parece profissional.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-text/60">Ideal para</p>
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
