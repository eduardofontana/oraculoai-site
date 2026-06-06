import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  const primaryCta = buildWhatsAppUrl("Olá! Quero um orçamento para um projeto premium.");

  return (
    <main className="min-h-screen text-white">
      {/* Hero */}
      <section className="relative mx-auto flex min-h-[90vh] w-full max-w-7xl items-center overflow-hidden px-6 pt-24 pb-20 md:px-8">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-glow-pulse" />
              Atendimento direto via WhatsApp
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-8 font-[family-name:var(--font-display)] text-5xl leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-white via-white to-amber-200/80 bg-clip-text text-transparent">
                {site.slogan}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
              Criação de sites, hospedagem com preço de revenda Hostinger e consultoria em
              cybersecurity. Tudo com atendimento direto, sem burocracia.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={primaryCta}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-8 py-3.5 font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]"
              >
                Falar no WhatsApp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] px-8 py-3.5 font-medium text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.04]"
              >
                Ver serviços
              </Link>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
              {site.services.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-xs font-medium text-zinc-400 backdrop-blur-xl transition-all hover:border-amber-500/20 hover:text-amber-300 hover:bg-amber-500/5"
                >
                  {s.title}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust - Bento Grid */}
      <Section
        eyebrow="Por que escolher"
        title="Uma estrutura pensada para converter"
        description="Três pilares que fazem a diferença no seu projeto digital."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {site.trustPoints.map((point, i) => (
            <Reveal key={point} delay={i * 100}>
              <div className="group rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-6 backdrop-blur-xl transition-all hover:border-amber-500/15 hover:bg-white/[0.05] hover:-translate-y-0.5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span className="text-sm leading-6 text-zinc-300">{point}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section
        id="services"
        eyebrow="Serviços"
        title="Três ofertas em um só lugar"
        description="Site, hospedagem e segurança — resolva tudo com o mesmo responsável técnico."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {site.services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Hostinger Reselling - Pricing */}
      <Section
        id="hosting"
        eyebrow="Revenda Hostinger"
        title="Hospedagem com preço de revenda"
        description="Domínio, e-mail e hospedagem gerenciada com suporte direto. Preço menor que contratar direto."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {site.hostingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 120}>
              <div className={`group relative flex flex-col rounded-2xl border p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${
                plan.popular
                  ? "border-amber-500/30 bg-gradient-to-b from-amber-500/[0.06] to-white/[0.02] hover:shadow-[0_0_60px_rgba(251,191,36,0.12)]"
                  : "border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent hover:border-white/[0.12] hover:bg-white/[0.05]"
              }`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-1 text-xs font-semibold text-zinc-950">
                    Mais escolhido
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{plan.name}</p>
                <p className="mt-1 text-sm leading-6 text-zinc-400">{plan.description}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-white">{plan.price}</span>
                  <span className="text-sm text-zinc-500">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-6 text-sm text-zinc-300">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={primaryCta}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                "popular" in plan &&                     "popular" in plan && plan.popular
                      ? "bg-amber-500 text-zinc-950 hover:bg-amber-400 hover:shadow-[0_0_32px_rgba(251,191,36,0.3)]"
                      : "border border-white/[0.12] text-white hover:border-amber-500/30 hover:bg-amber-500/10"
                  }`}
                >
                  {plan.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Portfolio - Bento Showcase */}
      <Section
        eyebrow="Portfólio"
        title="Trabalhos recentes"
        description="Projetos entregues com foco em performance, estética e resultado."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {site.portfolio.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="group rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-6 backdrop-blur-xl transition-all hover:border-amber-500/15 hover:bg-white/[0.05] hover:-translate-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04] text-zinc-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  </span>
                  <p className="font-[family-name:var(--font-display)] text-lg tracking-tight text-white">{item.title}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Processo */}
      <Section
        eyebrow="Processo"
        title="Como funciona"
        description="Três etapas até seu projeto no ar."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Você chama no WhatsApp",
              desc: "Contato direto, sem formulário longo ou ruído. Respondo pessoalmente.",
            },
            {
              step: "02",
              title: "Alinhamos escopo",
              desc: "Entendo o objetivo e defino o caminho mais eficiente com prazo e valor claros.",
            },
            {
              step: "03",
              title: "Entrego a solução",
              desc: "Execução objetiva com estética premium, suporte contínuo e backup incluso.",
            },
          ].map((item) => (
            <Reveal key={item.step} delay={Number(item.step) * 80}>
              <div className="group rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-6 backdrop-blur-xl transition-all hover:border-amber-500/15 hover:-translate-y-0.5">
                <span className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-amber-400/40">{item.step}</span>
                <p className="mt-4 text-lg font-medium text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Depoimentos */}
      <Section
        eyebrow="Depoimentos"
        title="O que nossos clientes dizem"
        description="Quem já experimentou o atendimento direto e a entrega premium sabe o valor."
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

      {/* CTA Final */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/10 bg-gradient-to-b from-amber-500/[0.06] to-transparent p-12 text-center backdrop-blur-xl md:p-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.1),transparent_60%)]" />
            <div className="relative z-10">
              <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-white md:text-5xl">
                Vamos começar?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-zinc-400">
                Site, hospedagem ou segurança — o próximo passo é uma conversa objetiva no WhatsApp.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={primaryCta}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-8 py-3.5 font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]"
                >
                  Falar no WhatsApp
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.12] px-8 py-3.5 font-medium text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.04]"
                >
                  Enviar e-mail
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
