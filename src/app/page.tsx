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
      <section className="relative mx-auto flex min-h-[90vh] w-full max-w-7xl items-center overflow-hidden px-6 pt-20 pb-20 md:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-400/70">
                OraculoAI
              </p>
              <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-instrument-serif)] text-5xl tracking-tight text-white md:text-7xl">
                {site.slogan}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
                Desenvolvimento web, cybersecurity e infraestrutura com atendimento direto no
                WhatsApp. Pouca fricção. Mais confiança. Mais conversão.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={primaryCta}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 hover:shadow-[0_0_32px_rgba(251,191,36,0.4)]"
                >
                  Falar no WhatsApp
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.1] px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.04]"
                >
                  Ver serviços
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Atalho comercial</p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="text-2xl font-semibold text-white">3 frentes</p>
                  <p className="mt-1 text-sm text-zinc-400">Web, cyber e hosting</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="text-2xl font-semibold text-white">WhatsApp</p>
                  <p className="mt-1 text-sm text-zinc-400">Contato direto e rápido</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-400/60">Foco</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Converter visitas em conversas qualificadas com uma apresentação mais premium.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust - Bento Grid */}
      <Section
        eyebrow="Por que escolher"
        title="Construído para gerar conversa rápida"
        description="A estrutura é curta, direta e pensada para parecer premium sem perder velocidade de decisão."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {site.trustPoints.map((point) => (
            <div
              key={point}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 text-sm leading-6 text-zinc-300 backdrop-blur-xl transition hover:border-amber-500/10 hover:bg-white/[0.05]"
            >
              {point}
            </div>
          ))}
        </div>
      </Section>

      {/* Services - Bento Grid Cards */}
      <Section
        id="services"
        eyebrow="Serviços"
        title="Três ofertas, uma conversa"
        description="Cada serviço existe para simplificar a decisão e abrir a porta do WhatsApp."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {site.services.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Processo - Bento */}
      <Section
        eyebrow="Processo"
        title="Como funciona"
        description="Um fluxo curto o suficiente para o cliente avançar sem hesitação."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Você chama no WhatsApp",
              desc: "Contato direto, sem formulário longo ou ruído.",
            },
            {
              step: "02",
              title: "Alinhamos escopo e prioridade",
              desc: "Entendemos o objetivo e definimos o caminho mais eficiente.",
            },
            {
              step: "03",
              title: "Entregamos a solução",
              desc: "Execução objetiva com foco em resultado e percepção premium.",
            },
          ].map((item) => (
            <Reveal key={item.step} delay={Number(item.step) * 80}>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl transition hover:border-amber-500/10">
                <p className="text-sm uppercase tracking-[0.24em] text-amber-400/60">{item.step}</p>
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
        description="Respostas rápidas para as perguntas mais comuns antes de você chamar no WhatsApp."
      >
        <FAQ items={site.faq} />
      </Section>

      {/* CTA Final */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-8">
        <Reveal>
          <div className="rounded-2xl border border-amber-500/10 bg-gradient-to-b from-amber-500/[0.04] to-transparent p-12 text-center backdrop-blur-xl md:p-16">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl tracking-tight text-white md:text-5xl">
              Pronto para começar?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-zinc-400">
              Se você quer site, proteção ou estrutura digital, o próximo passo é uma conversa
              objetiva.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={primaryCta}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 hover:shadow-[0_0_32px_rgba(251,191,36,0.4)]"
              >
                Falar no WhatsApp
              </Link>
              <Link
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center rounded-full border border-white/[0.1] px-8 py-3 font-semibold text-white backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                Enviar e-mail
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
