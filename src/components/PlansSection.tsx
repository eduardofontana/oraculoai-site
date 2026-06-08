import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function PlansSection() {
  const primaryCta = buildWhatsAppUrl("Olá! Quero saber mais sobre os planos da Oráculo AI.");

  return (
    <section id="planos" className="mx-auto w-full max-w-7xl scroll-mt-20 px-6 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-accent">Planos</p>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
            Escolha o plano ideal para o seu negócio
          </h2>
          <p className="mt-4 text-base leading-8 text-secondary">
            Hospedagem gerenciada, suporte humano e infraestrutura premium. Cancele quando quiser.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-xl border border-border bg-card px-6 py-3.5 text-center text-sm">
          {["Sem fidelidade", "Cancelamento simples", "Suporte humano via WhatsApp", "Ganhe 2 meses grátis no plano anual"].map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5 text-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {site.hostingPlans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 120}>
            <div
              className={`group relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-1 ${
                plan.popular
                  ? "border-accent-border bg-card shadow-[0_0_40px_var(--glow)] ring-1 ring-accent/20"
                  : "border-border bg-card hover:border-border-hover"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-5 py-1.5 text-xs font-bold text-white drop-shadow-lg">
                  MAIS POPULAR
                </span>
              )}

              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">{plan.name}</p>
                {plan.popular && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)" className="text-accent">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )}
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold tracking-tight text-primary drop-shadow-sm">
                  {plan.price}
                </span>
                <span className="text-sm text-muted">{plan.period}</span>
              </div>

              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="font-display text-lg font-bold text-accent">
                  {plan.annualPrice}
                </span>
                <span className="text-xs text-muted">{plan.annualPeriod}</span>
                <span className="ml-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-bold text-accent-text">
                  {plan.annualSavings}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-secondary">{plan.description}</p>

              <div className="mt-6 flex-1">
                <ul className="space-y-3 border-t border-border pt-6 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-secondary">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={primaryCta}
                target="_blank"
                rel="noreferrer"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all ${
                  plan.popular
                    ? "bg-accent text-white shadow-lg shadow-[0_0_20px_var(--glow)] hover:shadow-[0_0_36px_var(--glow-strong)] hover:-translate-y-0.5"
                    : plan.name === "Enterprise"
                    ? "border border-accent-border text-accent-text hover:bg-accent-soft"
                    : "border border-border text-secondary hover:border-accent-border hover:text-accent-text"
                }`}
              >
                {plan.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={500}>
        <div className="mt-12 text-center">
          <a href="https://www.hostinger.com/br/cart?product=dockerhosting%3Astarter&period=12&referral_type=cart_link&REFERRALCODE=LJOFONTANIXB&referral_id=019ea5e5-0620-7135-a5b2-78ff96f44abb&vps_application_id=245"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 font-semibold text-secondary backdrop-blur-xl transition-all hover:border-border-hover hover:text-primary hover:bg-surface-overlay">
            Hospedagem recomendada: Hostinger Docker Starter
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </a>
        </div>
      </Reveal>


      <Reveal delay={400}>
        <p className="mt-10 text-center text-sm text-muted">
          Precisa de algo personalizado?{" "}
          <Link href={primaryCta} target="_blank" rel="noreferrer" className="font-semibold text-accent-text underline underline-offset-2 hover:text-accent">
            Fale com nosso time
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
