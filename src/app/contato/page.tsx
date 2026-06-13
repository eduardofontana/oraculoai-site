import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";

export default function ContatoPage() {
  return (
    <main className="min-h-[80vh] text-primary">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent-blue/5 blur-[120px]" />
        </div>

        <div className="relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">
                Contato
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-primary md:text-7xl">
                Vamos conversar sobre o seu projeto?
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg">
                Manda um e-mail que a gente responde rápido. Sem roteiro pronto, sem conversa
                genérica — é da pessoa que cuida do seu projeto direto com você.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)] hover:-translate-y-0.5"
                >
                  Enviar E-mail
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </a>
                <a
                  href="#formulario"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-secondary backdrop-blur-xl transition hover:border-border-hover hover:text-primary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                  Preferir formulário
                </a>
              </div>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Informações</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">E-mail</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">{site.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue-soft text-accent-blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Resposta</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Respondemos em até 24 horas úteis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>

        {/* Form section */}
        <section id="formulario" className="mt-20 scroll-mt-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(225,25,55,0.04),transparent_60%)]" />
              <div className="relative z-10 mx-auto max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">Formulário</p>
                <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                  Me conta sobre seu projeto
                </h2>
                <p className="mt-4 text-base leading-7 text-secondary">
                  Preenche aí que a gente entra em contato. Sem compromisso, sem pressão.
                </p>
                <div className="mt-8">
                  <LeadForm />
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
