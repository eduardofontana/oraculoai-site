import type { Metadata } from "next";
import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd, organizationSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Agentes de IA Personalizados | OraculoAI",
  description:
    "Desenvolvemos agentes de IA capazes de automatizar tarefas, responder clientes e integrar processos empresariais.",
  openGraph: {
    title: "Agentes de IA Personalizados | OraculoAI",
    description:
      "Desenvolvemos agentes de IA capazes de automatizar tarefas, responder clientes e integrar processos empresariais.",
    url: "https://oraculoai.cloud/agentes-ia",
    siteName: "OráculoAI",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentes de IA Personalizados | OraculoAI",
    description:
      "Desenvolvemos agentes de IA capazes de automatizar tarefas, responder clientes e integrar processos empresariais.",
  },
  alternates: {
    canonical: "https://oraculoai.cloud/agentes-ia",
  },
};

const useCases = [
  {
    title: "Atendimento ao Cliente",
    icon: "message-circle",
    desc: "Agentes que atendem clientes 24/7, resolvem dúvidas, abrem chamados e qualificam leads automaticamente.",
  },
  {
    title: "Operações Internas",
    icon: "settings",
    desc: "Automatização de tarefas administrativas, aprovações, relatórios e fluxos de trabalho repetitivos.",
  },
  {
    title: "Integrações",
    icon: "globe",
    desc: "Agentes que conectam CRM, ERP, e-mail, WhatsApp e APIs para orquestrar processos completos.",
  },
  {
    title: "Análise de Dados",
    icon: "search",
    desc: "Agentes que monitoram métricas, geram relatórios e alertam sobre anomalias em tempo real.",
  },
  {
    title: "Suporte Técnico",
    icon: "headset",
    desc: "Triagem inteligente de chamados, diagnóstico automatizado e encaminhamento para equipe certa.",
  },
  {
    title: "Vendas e Marketing",
    icon: "zap",
    desc: "Agentes que nutrem leads, disparam campanhas e qualificam oportunidades de venda.",
  },
];

const iconPaths: Record<string, React.ReactNode> = {
  "message-circle": (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </>
  ),
  headset: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  zap: (
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  ),
};

export default function AgentesIAPage() {
  const whatsappUrl = buildWhatsAppUrl(
    "Olá, vim pelo site OraculoAI (página Agentes de IA) e gostaria de saber mais sobre agentes de IA para minha empresa.",
  );

  return (
    <>
      <JsonLd schema={organizationSchema()} />
      <main className="min-h-screen text-primary">
        {/* Hero */}
        <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden px-6 pt-24 pb-20 md:px-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="hero-orb hero-orb-red hero-orb-red-1 absolute -top-20 -right-20 h-96 w-96 rounded-full" />
            <div className="hero-orb hero-orb-blue hero-orb-blue-1 absolute -bottom-32 -left-20 h-[30rem] w-[30rem] rounded-full" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-text">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow-pulse" />
                Agentes de IA
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-primary md:text-7xl">
                Agentes de IA Personalizados
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-secondary md:text-lg">
                Desenvolvemos agentes de IA inteligentes que automatizam tarefas, atendem clientes,
                integram sistemas e transformam a operação da sua empresa.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="#diagnostico"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-[0_0_24px_var(--glow)] transition-all hover:shadow-[0_0_40px_var(--glow-strong)] hover:-translate-y-0.5"
                >
                  Solicitar Diagnóstico Gratuito
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 font-semibold text-secondary backdrop-blur-xl transition-all hover:border-border-hover hover:text-primary hover:bg-surface-overlay"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Falar no WhatsApp
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* O que são */}
        <Section
          eyebrow="O que são"
          title="Agentes de IA"
          description="Sistemas inteligentes que executam tarefas de forma autônoma: atendem, analisam, decidem e agem."
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-8 text-secondary">
              Diferente de chatbots simples, nossos agentes de IA são capazes de <strong className="text-primary">raciocinar, executar ações e integrar sistemas</strong> para automatizar processos completos. Eles aprendem com seus dados, respeitam regras de negócio e evoluem continuamente.
            </p>
          </div>
        </Section>

        {/* Casos de Uso */}
        <Section
          eyebrow="Casos de Uso"
          title="O que um Agente de IA pode fazer por você"
          description="Soluções práticas para áreas críticas do seu negócio."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent-border hover:-translate-y-0.5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {iconPaths[item.icon]}
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Processo */}
        <Section
          eyebrow="Processo"
          title="Como desenvolvemos seu Agente de IA"
          description="Metodologia ágil para entregar valor rápido."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Mapeamento", desc: "Entendemos seus processos, dados e objetivos para definir o escopo do agente." },
              { step: "02", title: "Treinamento", desc: "Alimentamos o agente com seus dados, documentos e regras de negócio." },
              { step: "03", title: "Integração", desc: "Conectamos com seus sistemas: CRM, ERP, WhatsApp, e-mail, APIs." },
              { step: "04", title: "Produção", desc: "Agente em operação com monitoramento contínuo e evolução gradual." },
            ].map((item) => (
              <Reveal key={item.step} delay={Number(item.step) * 80}>
                <div className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-accent-border hover:-translate-y-0.5">
                  <span className="text-3xl font-extrabold text-accent/30">{item.step}</span>
                  <h3 className="mt-2 font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section
          eyebrow="FAQ"
          title="Dúvidas frequentes sobre Agentes de IA"
          description="Tire suas principais dúvidas."
        >
          <FAQ items={site.agentesIAFaq} />
        </Section>

        {/* CTA + Form */}
        <section id="diagnostico" className="mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(225,25,55,0.04),transparent_60%)]" />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">Diagnóstico Gratuito</p>
                  <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                    Pronto para ter seu Agente de IA?
                  </h2>
                  <p className="mt-4 text-base leading-7 text-secondary">
                    Preencha o formulário e descubra como um agente de IA pode automatizar processos, reduzir custos e transformar sua operação.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Diagnóstico personalizado",
                      "Sem compromisso",
                      "Retorno em até 24h",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-sm text-secondary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-surface-overlay p-6">
                  <LeadForm />
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
