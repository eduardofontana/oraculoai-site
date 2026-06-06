import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function DesenvolvimentoWebPage() {
  const message = buildWhatsAppUrl("Olá! Quero um site premium para meu negócio.");

  return (
    <main className="min-h-[80vh] text-primary">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-text/70">
                Serviço 01
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl tracking-tight text-primary md:text-7xl">
                Criação de Sites
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg">
                Landing pages e sites institucionais com estética premium, discurso claro e caminho curto até a conversa.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={message}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)]"
                >
                  Pedir orçamento no WhatsApp
                </Link>
                <Link
                  href="/servicos/cybersecurity"
                  className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-semibold text-secondary backdrop-blur-xl transition hover:border-border-hover hover:text-primary"
                >
                  Ver cybersecurity
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <aside className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">O que entrego</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-border bg-surface-overlay p-4">
                  <p className="font-medium text-primary">Landing pages</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">
                    Estrutura pensada para captar lead e direcionar a decisão.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface-overlay p-4">
                  <p className="font-medium text-primary">Sites institucionais</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">
                    Presença digital profissional com leitura rápida e visual premium.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface-overlay p-4">
                  <p className="font-medium text-primary">Manutenção estratégica</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">
                    Ajustes contínuos para manter performance, clareza e conversão.
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
                Uma apresentação mais forte, mais clara e mais fácil de vender.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-text/60">Ideal para</p>
              <p className="mt-4 text-base leading-7 text-secondary">
                Negócios que querem uma landing ou site com aparência premium e foco em conversão.
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
