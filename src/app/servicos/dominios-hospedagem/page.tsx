import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function DominiosHospedagemPage() {
  return (
    <main className="min-h-[80vh] text-primary">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-accent-blue/5 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-[120px]" />
        </div>

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">
                Serviço 02
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-primary md:text-7xl">
                Hospedagem Gerenciada
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg">
                Infraestrutura cloud, VPS, domínio e e-mail profissional com suporte técnico de verdade e gerenciamento completo.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${site.email}?subject=Hospedagem Gerenciada`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)] hover:-translate-y-0.5"
                >
                  Solicitar atendimento
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </a>
                <Link
                  href="/servicos/consultoria"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-secondary backdrop-blur-xl transition hover:border-border-hover hover:text-primary"
                >
                  Ver IA e segurança
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
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue-soft text-accent-blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Hospedagem gerenciada</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Servidores otimizados com cPanel, SSL grátis e performance NVMe.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue-soft text-accent-blue">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Domínio e e-mail</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Registro e configuração de DNS, e-mail profissional e estabilidade.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                    </span>
                    <div>
                      <p className="font-bold text-primary">Migração assistida</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">Troca de hospedagem ou estrutura com acompanhamento direto, sem susto.</p>
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
                Uma base digital organizada, funcional e fácil de manter.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted">Ideal para</p>
              <p className="mt-4 text-base leading-7 text-secondary">
                Quem quer resolver o lado técnico da presença online com suporte direto.
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
