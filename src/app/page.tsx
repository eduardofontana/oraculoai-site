import Link from "next/link";
import { site } from "@/lib/site";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { PlansSection } from "@/components/PlansSection";
import { DifferentialsSection } from "@/components/DifferentialsSection";
import { PopularTools } from "@/components/PopularTools";
import { LeadForm } from "@/components/LeadForm";
import { TrackedLink } from "@/components/TrackedLink";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd schema={organizationSchema()} />
      <JsonLd schema={websiteSchema()} />
      <main className="min-h-screen text-primary">
        {/* Hero */}
        <section id="hero" className="relative flex min-h-[88vh] w-full items-center overflow-hidden px-6 pt-24 pb-20 md:px-8">
          {/* ── Floating orbs ── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="hero-orb hero-orb-red hero-orb-red-1 absolute -top-20 -right-20 h-96 w-96 rounded-full" />
            <div className="hero-orb hero-orb-blue hero-orb-blue-1 absolute -bottom-32 -left-20 h-[30rem] w-[30rem] rounded-full" />
            <div className="hero-orb hero-orb-red hero-orb-red-2 absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="hero-orb hero-orb-blue hero-orb-blue-2 absolute top-1/4 right-1/4 h-48 w-48 rounded-full" />
          </div>

          {/* ── Dots de conexão (neural nodes) ── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
            <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
              <circle cx="200" cy="150" r="2" fill="var(--accent)" opacity="0.6" />
              <circle cx="1200" cy="200" r="1.5" fill="var(--accent-blue)" opacity="0.5" />
              <circle cx="100" cy="600" r="2" fill="var(--accent-blue)" opacity="0.4" />
              <circle cx="1300" cy="700" r="1.5" fill="var(--accent)" opacity="0.5" />
              <circle cx="700" cy="100" r="2" fill="var(--accent)" opacity="0.4" />
              <circle cx="500" cy="750" r="1.5" fill="var(--accent-blue)" opacity="0.5" />
              <line x1="200" y1="150" x2="700" y2="100" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
              <line x1="200" y1="150" x2="1200" y2="200" stroke="var(--accent)" strokeWidth="0.5" opacity="0.08" />
              <line x1="1200" y1="200" x2="1300" y2="700" stroke="var(--accent-blue)" strokeWidth="0.5" opacity="0.12" />
              <line x1="700" y1="100" x2="500" y2="750" stroke="var(--accent-blue)" strokeWidth="0.5" opacity="0.08" />
              <line x1="100" y1="600" x2="500" y2="750" stroke="var(--accent)" strokeWidth="0.5" opacity="0.1" />
              <line x1="100" y1="600" x2="200" y2="150" stroke="var(--accent-blue)" strokeWidth="0.5" opacity="0.08" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-text">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow-pulse" />
                Especialistas em IA para empresas
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-primary md:text-7xl lg:text-8xl">
                {site.slogan}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-secondary md:text-lg">
                {site.heroSubtitle}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <TrackedLink
                  href="#diagnostico"
                  track="diagnostico"
                  trackLabel="hero"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-[0_0_24px_var(--glow)] transition-all hover:shadow-[0_0_40px_var(--glow-strong)] hover:-translate-y-0.5"
                >
                  Solicitar Diagnóstico Gratuito
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </TrackedLink>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 font-semibold text-secondary backdrop-blur-xl transition-all hover:border-border-hover hover:text-primary hover:bg-surface-overlay"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  Enviar E-mail
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
                {site.iaServices.map((s) => (
                  <Link
                    key={s.title}
                    href={s.href}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-overlay px-5 py-2.5 text-sm font-medium text-secondary backdrop-blur-xl transition-all hover:border-accent-border hover:text-accent-text hover:bg-accent-soft"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Trust Stats */}
        <section className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <Reveal>
            <div className="grid divide-y border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
              {[
                { number: "3+", label: "Frentes de atuação", desc: "IA, automação e cloud integrados" },
                { number: "24h", label: "Suporte por e-mail", desc: "Resposta ágil e direta" },
                { number: "100%", label: "Projetos entregues", desc: "Do diagnóstico à implementação" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4 px-6 py-8 md:px-8">
                  <span className="font-display text-4xl font-extrabold text-accent md:text-5xl">{stat.number}</span>
                  <div>
                    <p className="font-semibold text-primary">{stat.label}</p>
                    <p className="text-sm text-muted">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* IA Services */}
        <Section
          id="servicos"
          eyebrow="Serviços de IA"
          title="Soluções de IA para o seu negócio"
          description="De consultoria estratégica a agentes inteligentes e automação — tudo que você precisa para transformar sua empresa com IA."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {site.iaServices.map((service, i) => (
              <Reveal key={service.title} delay={i * 80}>
                <ServiceCard {...service} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Benefícios IA */}
        <Section
          eyebrow="Benefícios"
          title="O que sua empresa ganha com IA"
          description="Resultados mensuráveis que impactam diretamente seus resultados."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {site.iaBenefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 80}>
                <div className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent-border hover:-translate-y-0.5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {benefit.icon === "trending-down" && (
                        <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></>
                      )}
                      {benefit.icon === "zap" && (
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      )}
                      {benefit.icon === "message-circle" && (
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      )}
                      {benefit.icon === "bar-chart" && (
                        <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>
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

        {/* Plans */}
        <PlansSection />

        {/* Popular Tools */}
        <Section
          eyebrow="Ferramentas"
          title="Ferramentas populares"
          description="As ferramentas gratuitas mais acessadas pelos nossos visitantes — tudo direto no navegador, sem envio de dados."
        >
          <PopularTools />
          <div className="mt-8 text-center">
            <Link
              href="/ferramentas"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-overlay px-6 py-3 text-sm font-semibold text-secondary transition-all hover:border-accent-border hover:text-accent-text hover:bg-accent-soft"
            >
              Ver todas as ferramentas
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Section>

        {/* Differentials */}
        <DifferentialsSection />

        {/* Processo */}
        <Section
          eyebrow="Processo"
          title="Como funciona"
          description="Simples, direto e sem burocracia. Do diagnóstico à implementação."
        >
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Você entra em contato",
                desc: "Nos envie uma mensagem pelo formulário ou e-mail. A gente entende seu cenário e objetivos numa conversa simples.",
                icon: "message",
              },
              {
                step: "02",
                title: "Alinhamos a solução",
                desc: "Definimos o plano, escopo e prazos. Você recebe tudo claro e sem surpresas.",
                icon: "target",
              },
              {
                step: "03",
                title: "Cuidamos de tudo",
                desc: "Execução, migração, configuração e suporte contínuo — você foca no seu negócio.",
                icon: "rocket",
              },
            ].map((item) => (
              <Reveal key={item.step} delay={Number(item.step) * 80}>
                <div className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-accent-border hover:-translate-y-0.5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      {item.icon === "message" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                      )}
                      {item.icon === "target" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                      )}
                      {item.icon === "rocket" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                      )}
                    </span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{item.step}</span>
                      <p className="font-semibold text-primary">{item.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-secondary">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Depoimentos */}
        <Section
          eyebrow="Depoimentos"
          title="O que nossos clientes dizem"
          description="Quem já experimenta o atendimento direto e a entrega consistente entende o valor."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {site.testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 100}>
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section
          eyebrow="FAQ"
          title="Dúvidas frequentes"
          description="Respostas rápidas para as perguntas mais comuns."
        >
          <FAQ items={site.faq} />
        </Section>

        {/* CTA Final com Form */}
        <section id="diagnostico" className="mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(225,25,55,0.04),transparent_60%)]" />
              <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent-blue/3 blur-[100px]" />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">Diagnóstico Gratuito</p>
                  <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                    Pronto para implementar IA na sua empresa?
                  </h2>
                  <p className="mt-4 text-base leading-7 text-secondary">
                    Preencha o formulário e nossa equipe entrará em contato para um diagnóstico
                    gratuito e sem compromisso. Descubra onde a IA pode gerar mais valor para você.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`mailto:${site.email}?subject=Diagnóstico Gratuito - IA`}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-[0_0_24px_var(--glow)] transition-all hover:shadow-[0_0_40px_var(--glow-strong)] hover:-translate-y-0.5"
                    >
                      Enviar E-mail
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                    <TrackedLink
                      href="#diagnostico"
                      track="diagnostico"
                      trackLabel="cta_final"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 font-semibold text-secondary backdrop-blur-xl transition-all hover:border-border-hover hover:text-primary hover:bg-surface-overlay"
                    >
                      Solicitar Proposta
                    </TrackedLink>
                  </div>
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
