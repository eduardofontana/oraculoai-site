import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function SobrePage() {
  const message = buildWhatsAppUrl("Olá! Quero saber mais sobre a OraculoAI.");

  return (
    <main className="min-h-[80vh] text-primary">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent-blue/5 blur-[120px]" />
        </div>

        <div className="relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">
                Sobre
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-primary md:text-7xl">
                Uma presença digital com mais intenção.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg">
                A OraculoAI existe para criar, proteger e operar presença digital com estética
                premium, clareza comercial e conversa direta.
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
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-secondary backdrop-blur-xl transition hover:border-border-hover hover:text-primary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  Entrar em contato
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Posicionamento</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Consultoria direta</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Fala técnica, sem rodeio e com foco no que fecha negócio.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue-soft text-accent-blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Entrega objetiva</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Menos ruído, mais clareza e uma experiência que passa valor.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Números</p>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-display text-3xl font-extrabold text-accent">3</p>
                    <p className="text-xs text-muted">Serviços integrados</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-extrabold text-accent-blue">24h</p>
                    <p className="text-xs text-muted">Suporte via WhatsApp</p>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
