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
    <main className="min-h-screen text-primary">
      {/* Hero */}
      <section className="relative mx-auto flex min-h-[88vh] w-full max-w-7xl items-center overflow-hidden px-6 pt-24 pb-20 md:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent-blue/5 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-text">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-glow-pulse" />
              Atendimento direto via WhatsApp
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.08] tracking-tight text-primary md:text-7xl lg:text-8xl">
              {site.slogan}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-secondary md:text-lg">
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
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-[0_0_24px_var(--glow)] transition-all hover:shadow-[0_0_40px_var(--glow-strong)] hover:-translate-y-0.5"
              >
                Falar no WhatsApp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 font-semibold text-secondary backdrop-blur-xl transition-all hover:border-border-hover hover:text-primary hover:bg-surface-overlay"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>
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
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-overlay px-5 py-2.5 text-sm font-medium text-secondary backdrop-blur-xl transition-all hover:border-accent-border hover:text-accent-text hover:bg-accent-soft"
                >
                  <span className="flex h-5 w-5 items-center justify-center">
                    {s.icon === "globe" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    )}
                    {s.icon === "server" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
                    )}
                    {s.icon === "shield" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    )}
                  </span>
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
              { number: "3", label: "Serviços integrados", desc: "Web, hospedagem e segurança em um só lugar" },
              { number: "24h", label: "Suporte via WhatsApp", desc: "Resposta rápida, sem burocracia" },
              { number: "100%", label: "Atendimento remoto", desc: "Brasil e exterior com suporte direto" },
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

      {/* Services */}
      <Section
        id="services"
        eyebrow="Serviços"
        title="Tudo que você precisa em um só lugar"
        description="Site, hospedagem e segurança — resolva tudo com o mesmo responsável técnico, sem intermediários."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {site.services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Hostinger Pricing */}
      <Section
        id="hosting"
        eyebrow="Revenda Hostinger"
        title="Hospedagem com preço de revenda"
        description="Domínio, e-mail profissional e hospedagem gerenciada. Preço menor que contratar direto."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {site.hostingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 120}>
              <div className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 ${
                plan.popular
                  ? "border-accent-border bg-card shadow-[0_0_24px_var(--glow)]"
                  : "border-border bg-card"
              }`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-bold text-white">
                    Mais escolhido
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">{plan.name}</p>
                <p className="mt-1 text-sm leading-6 text-secondary">{plan.description}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-primary">{plan.price}</span>
                  <span className="text-sm text-muted">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-6 text-sm text-secondary">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={primaryCta}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                    plan.popular
                      ? "bg-accent text-white shadow-lg shadow-[0_0_16px_var(--glow)] hover:shadow-[0_0_32px_var(--glow-strong)]"
                      : "border border-border text-secondary hover:border-accent-border hover:text-accent-text"
                  }`}
                >
                  {plan.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Portfolio */}
      <Section
        eyebrow="Portfólio"
        title="Trabalhos recentes"
        description="Projetos entregues com foco em performance, estética e resultado."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {site.portfolio.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent-border hover:-translate-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-overlay text-accent-blue">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                  </span>
                  <div>
                    <p className="font-semibold text-primary">{item.title}</p>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-surface-overlay px-2.5 py-1 text-xs text-muted">
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
        description="Três etapas até seu projeto no ar. Simples e direto."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Você chama no WhatsApp",
              desc: "Contato direto, sem formulário. Respondo pessoalmente em minutos.",
              icon: "message",
            },
            {
              step: "02",
              title: "Alinhamos escopo",
              desc: "Entendo o objetivo e defino o caminho mais eficiente com prazo e valor claros.",
              icon: "target",
            },
            {
              step: "03",
              title: "Entrego a solução",
              desc: "Execução objetiva com estética premium, suporte contínuo e backup incluso.",
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
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-12 text-center md:p-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(225,25,55,0.04),transparent_60%)]" />
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent-blue/3 blur-[100px]" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
                Vamos começar?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base text-secondary">
                Site, hospedagem ou segurança — o próximo passo é uma conversa objetiva no WhatsApp.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={primaryCta}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-[0_0_24px_var(--glow)] transition-all hover:shadow-[0_0_40px_var(--glow-strong)] hover:-translate-y-0.5"
                >
                  Falar no WhatsApp
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 font-semibold text-secondary backdrop-blur-xl transition-all hover:border-border-hover hover:text-primary hover:bg-surface-overlay"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
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
