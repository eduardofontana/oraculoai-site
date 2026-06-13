import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd, organizationSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Consultoria em IA para Empresas | OraculoAI",
  description:
    "Aplicamos inteligência artificial do jeito certo no seu negócio. Sem promessa vazia — planejamento e resultado de verdade.",
  openGraph: {
    title: "Consultoria em IA para Empresas | OraculoAI",
    description:
      "Aplicamos inteligência artificial do jeito certo no seu negócio. Sem promessa vazia, com planejamento e resultado de verdade.",
    url: "https://oraculoai.cloud/consultoria-ia",
    siteName: "OráculoAI",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultoria em IA para Empresas | OraculoAI",
    description:
      "Implementamos inteligência artificial de forma prática pra empresas que querem automatizar processos e ganhar eficiência.",
  },
  alternates: {
    canonical: "https://oraculoai.cloud/consultoria-ia",
  },
};

const steps = [
  {
    step: "01",
    title: "Diagnóstico",
    desc: "Mapeamos seus processos, identificamos dores e oportunidades onde a IA pode gerar mais impacto.",
  },
  {
    step: "02",
    title: "Planejamento",
    desc: "Definimos a estratégia, tecnologias e roadmap para implementação com métricas de sucesso claras.",
  },
  {
    step: "03",
    title: "Implementação",
    desc: "Colocamos a mão na massa: agentes, automações, chatbots ou RAG rodando no seu ambiente.",
  },
  {
    step: "04",
    title: "Acompanhamento",
    desc: "Monitoramos resultados, ajustamos rotas e evoluímos a solução continuamente.",
  },
];

const useCases = [
  {
    title: "Automação de Atendimento",
    desc: "Chatbots e assistentes que resolvem mais de 70% das demandas sem intervenção humana.",
  },
  {
    title: "Análise de Dados",
    desc: "Relatórios inteligentes com insights extraídos automaticamente dos seus dados.",
  },
  {
    title: "Processamento de Documentos",
    desc: "Extração, classificação e validação de documentos usando IA com alta precisão.",
  },
  {
    title: "Integração de Sistemas",
    desc: "Conectamos sistemas legados com IA moderna sem substituir sua infraestrutura atual.",
  },
];

export default function ConsultoriaIAPage() {
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
                Consultoria em IA
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-primary md:text-7xl">
                Consultoria em IA para Empresas
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-secondary md:text-lg">
                A gente tira a IA do papel e aplica de verdade no seu negócio. Com planejamento,
                transparência e foco no que gera resultado. No seu ritmo.
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
                  href="#diagnostico"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 font-semibold text-secondary backdrop-blur-xl transition-all hover:border-border-hover hover:text-primary hover:bg-surface-overlay"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  Quero um diagnóstico
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Benefícios */}
        <Section
          eyebrow="Benefícios"
          title="Por que investir em IA agora?"
          description="Empresas que usam IA ganham produtividade, reduzem custos e decidem com mais confiança."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {site.iaBenefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 80}>
                <div className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent-border hover:-translate-y-0.5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {benefit.icon === "trending-down" && (
                        <>
                          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                          <polyline points="17 18 23 18 23 12" />
                        </>
                      )}
                      {benefit.icon === "zap" && (
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      )}
                      {benefit.icon === "message-circle" && (
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      )}
                      {benefit.icon === "bar-chart" && (
                        <>
                          <line x1="18" y1="20" x2="18" y2="10" />
                          <line x1="12" y1="20" x2="12" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="14" />
                        </>
                      )}
                      {benefit.icon === "shield" && (
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      )}
                      {!["trending-down", "zap", "message-circle", "bar-chart", "shield"].includes(benefit.icon) && (
                        <circle cx="12" cy="12" r="10" />
                      )}
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-primary">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Casos de Uso */}
        <Section
          eyebrow="Casos de Uso"
          title="Onde a IA pode transformar seu negócio"
          description="Soluções práticas pra desafios reais de empresas como a sua."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {useCases.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent-border">
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Processo */}
        <Section
          eyebrow="Processo"
          title="Como implementamos IA na sua empresa"
          description="4 etapas pra entregar resultado de verdade."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
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
          title="Dúvidas frequentes sobre Consultoria em IA"
          description="O que mais perguntam sobre aplicar IA na empresa."
        >
          <FAQ items={site.consultoriaIAFaq} />
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
                    Pronto para implementar IA na sua empresa?
                  </h2>
                  <p className="mt-4 text-base leading-7 text-secondary">
                    Preenche o formulário que a gente entra em contato pra um diagnóstico
                    gratuito e sem compromisso. Vamos descobrir juntos onde a IA pode gerar mais valor pra você.
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
