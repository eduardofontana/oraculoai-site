import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function DesenvolvimentoWebPage() {
  const message = buildWhatsAppUrl("Olá! Quero um site para meu negócio.");

  return (
    <main className="min-h-[80vh] text-primary">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent-blue/5 blur-[120px]" />
        </div>

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">
                Serviço 01
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-primary md:text-7xl">
                Criação de Sites
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg">
                Landing pages e sites institucionais com foco em clareza, desempenho e caminho
                curto até a conversa.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={message}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)] hover:-translate-y-0.5"
                >
                  Pedir orçamento no WhatsApp
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/servicos/consultoria"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-secondary backdrop-blur-xl transition hover:border-border-hover hover:text-primary"
                >
                  Ver consultoria em IA e cibersegurança
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Landing pages</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Estrutura pensada para captar lead e direcionar a decisão.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Sites institucionais</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Presença digital profissional com leitura rápida e interface objetiva.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue-soft text-accent-blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Manutenção estratégica</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Ajustes contínuos para manter performance, clareza e conversão.</p>
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
                Uma apresentação mais forte, mais clara e mais fácil de vender.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Ideal para</p>
              <p className="mt-4 text-base leading-7 text-secondary">
                Negócios que querem uma landing ou site com aparência profissional e foco em conversão.
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
