import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function DominiosHospedagemPage() {
  const message = buildWhatsAppUrl("Olá! Quero domínio, hospedagem ou migração assistida.");

  return (
    <main className="min-h-[80vh] text-primary">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-text/70">
                Serviço 03
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl tracking-tight text-primary md:text-7xl">
                Revenda Hostinger
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg">
                Hospedagem, domínio, DNS e e-mail profissional com suporte gerenciado e preço de revenda.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={message}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)]"
                >
                  Pedir atendimento no WhatsApp
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-semibold text-secondary backdrop-blur-xl transition hover:border-border-hover hover:text-primary"
                >
                  Sobre a OraculoAI
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <aside className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">O que entrego</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-border bg-surface-overlay p-4">
                  <p className="font-medium text-primary">Hospedagem gerenciada</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">
                    Servidores otimizados com cPanel, SSL grátis e performance NVMe.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface-overlay p-4">
                  <p className="font-medium text-primary">Domínio e e-mail</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">
                    Registro e configuração de DNS, e-mail profissional e estabilidade.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-surface-overlay p-4">
                  <p className="font-medium text-primary">Migração assistida</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">
                    Troca de hospedagem ou estrutura com acompanhamento direto.
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
                Uma base digital organizada, funcional e fácil de manter.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-text/60">Ideal para</p>
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
