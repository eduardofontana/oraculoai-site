import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  const primaryCta = buildWhatsAppUrl("Olá! Quero um orçamento para um projeto premium.");

  return (
    <main className="min-h-screen text-white">
      <WhatsAppButton />

      <section className="mx-auto flex min-h-[92vh] w-full max-w-7xl items-center px-6 py-20 md:px-8">
        <div className="grid w-full gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/90">
              OraculoAI
            </p>
            <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-white md:text-7xl">
              {site.slogan}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300 md:text-lg">
              Desenvolvimento web, cybersecurity e infraestrutura com atendimento direto no WhatsApp.
              Pouca fricção. Mais confiança. Mais conversão.
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.24em] text-zinc-500">
              Clareza • Segurança • Conversão
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryCta}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
              >
                Falar no WhatsApp
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Ver serviços
              </Link>
            </div>
          </div>

          <div className="hero-glow rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Atalho comercial</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">3 frentes</p>
                <p className="mt-2 text-sm text-zinc-300">Web, cyber e hosting</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">WhatsApp</p>
                <p className="mt-2 text-sm text-zinc-300">Contato direto e rápido</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:col-span-2">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Foco</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Converter visitas em conversas qualificadas com uma apresentação mais premium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Trusted foundation"
        title="Construído para gerar conversa rápida"
        description="A estrutura é curta, direta e pensada para parecer premium sem perder velocidade de decisão."
      >
        <div className="section-divider mb-8 h-px w-full" />
        <div className="grid gap-4 md:grid-cols-3">
          {site.trustPoints.map((point) => (
            <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-200">
              {point}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="services"
        eyebrow="Services"
        title="Três ofertas, uma conversa"
        description="Cada serviço existe para simplificar a decisão e abrir a porta do WhatsApp."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {site.services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Process"
        title="Como funciona"
        description="Um fluxo curto o suficiente para o cliente avançar sem hesitação."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">01</p>
            <p className="mt-4 text-lg font-semibold text-white">Você chama no WhatsApp</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">Contato direto, sem formulário longo ou ruído.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">02</p>
            <p className="mt-4 text-lg font-semibold text-white">Alinhamos escopo e prioridade</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">Entendemos o objetivo e definimos o caminho mais eficiente.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">03</p>
            <p className="mt-4 text-lg font-semibold text-white">Entregamos a solução</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">Execução objetiva com foco em resultado e percepção premium.</p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Contact"
        title="Pronto para começar?"
        description="Se você quer site, proteção ou estrutura digital, o próximo passo é uma conversa objetiva."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryCta}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
          >
            Falar no WhatsApp
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Enviar e-mail
          </Link>
        </div>
      </Section>
    </main>
  );
}
