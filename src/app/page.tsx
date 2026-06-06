import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  const primaryCta = buildWhatsAppUrl("Olá! Quero um orçamento para meu projeto.");

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <WhatsAppButton />

      <section className="mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-center px-6 py-20 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            OraculoAI
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {site.slogan}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            Desenvolvimento web, cybersecurity e infraestrutura com conversa direta no WhatsApp.
            Menos enrolação. Mais entrega. Mais cliente.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryCta}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
            >
              Falar no WhatsApp
            </Link>
            <Link
              href="/servicos/desenvolvimento-web"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Ver serviços
            </Link>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Serviços"
        title="O MVP vende o que importa"
        description="Três frentes claras para facilitar a decisão do cliente e aumentar a conversão."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {site.services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Por que funciona"
        title="Direto, rápido e sem fricção"
        description="O cliente vê a oferta, entende o valor e chama no WhatsApp sem precisar navegar por um site pesado."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {site.trustPoints.map((point) => (
            <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-200">
              {point}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Próximo passo"
        title="Fale agora e a gente define o escopo"
        description="Se você precisa de site, proteção ou estrutura digital, o caminho mais rápido é começar a conversa no WhatsApp."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryCta}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
          >
            WhatsApp agora
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
