# OraculoAI Mailkit-Inspired Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** redesenhar o site da OraculoAI para um estilo premium editorial dark, inspirado na lógica do Mailkit, com mais percepção de valor, mais autoridade visual e mais conversão para WhatsApp.

**Architecture:** a mudança será concentrada na camada de apresentação do Next.js App Router. Vamos preservar a estrutura de rotas existente, mas refinar o sistema visual global, a hierarquia tipográfica, a copy da home e a apresentação dos serviços para parecer uma consultoria/estúdio premium em vez de um template genérico. O foco é clareza + sofisticação + CTA forte, sem adicionar complexidade desnecessária.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, next/font/google, ESLint.

---

### Task 1: Establish the premium dark visual system

**Objective:** elevar a base visual global para sustentar o estilo editorial dark em todas as páginas.

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Optional modify: `src/app/not-found.tsx`

- [ ] **Step 1: Update the global font stack and metadata for a premium brand feel**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
```

Use a refined global stack in the layout and update metadata to emphasize OraculoAI as a premium digital studio focused on web, cybersecurity, and infrastructure.

- [ ] **Step 2: Replace the plain dark base with layered editorial surfaces**

```css
:root {
  --background: #050507;
  --foreground: #f5f5f5;
}

body {
  background:
    radial-gradient(circle at top, rgba(34, 211, 238, 0.08), transparent 30%),
    linear-gradient(180deg, #050507 0%, #09090b 45%, #050507 100%);
  color: var(--foreground);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}
```

Keep the page dark, but give it depth with subtle gradients and a cleaner typographic base.

- [ ] **Step 3: Add utility classes for subtle glow, glass, and editorial spacing**

```css
::selection {
  background: rgba(34, 211, 238, 0.28);
  color: #f8fafc;
}

.hero-glow {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06), 0 30px 80px rgba(0, 0, 0, 0.45);
}

.section-divider {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
}
```

- [ ] **Step 4: Run the styling sanity check**

Run: `npm run lint`
Expected: pass with no new ESLint errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/app/not-found.tsx
git commit -m "style: establish premium dark visual system"
```

---

### Task 2: Rebuild the homepage hero and narrative flow

**Objective:** turn the homepage into a high-impact editorial landing page with a strong hero, tighter copy, and a more persuasive reading order.

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/lib/site.ts`
- Modify: `src/components/Section.tsx`
- Modify: `src/components/WhatsAppButton.tsx`

- [ ] **Step 1: Write the new homepage structure with hero, authority band, services, process, and final CTA**

```tsx
<main className="min-h-screen text-white">
  <WhatsAppButton />
  <section className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl items-center px-6 py-20 md:px-8">
    <div className="grid w-full gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/90">
          OraculoAI
        </p>
        <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
          Presença digital premium que vende, protege e escala.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300 md:text-lg">
          Desenvolvimento web, cybersecurity e infraestrutura com atendimento direto no WhatsApp.
          Pouca fricção. Mais confiança. Mais conversão.
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
    eyebrow="Services"
    title="Três ofertas, uma conversa"
    description="Cada serviço existe para simplificar a decisão e abrir a porta do WhatsApp."
  >
    <div id="services" className="grid gap-6 md:grid-cols-3">
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
```
Make `Section` feel more editorial:
- larger max width;
- stronger section headings;
- tighter eyebrow label;
- improved spacing for dense hero-like sections.

```tsx
<section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
```

- [ ] **Step 4: Make the WhatsApp CTA feel premium and persistent**

Rework the floating WhatsApp button into a cleaner, subtler component with better contrast and hover states.

```tsx
className="fixed bottom-5 right-5 z-50 rounded-full border border-cyan-300/20 bg-cyan-400 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-2xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
```

- [ ] **Step 5: Run the homepage-focused test pass**

Run: `npm run lint`
Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/lib/site.ts src/components/Section.tsx src/components/WhatsAppButton.tsx
git commit -m "feat: redesign homepage for premium conversion"
```

---

### Task 3: Restyle service cards and supporting pages for consistency

**Objective:** ensure the service pages and cards feel like part of the same premium system, not leftover MVP screens.

**Files:**
- Modify: `src/components/ServiceCard.tsx`
- Modify: `src/app/servicos/desenvolvimento-web/page.tsx`
- Modify: `src/app/servicos/cybersecurity/page.tsx`
- Modify: `src/app/servicos/dominios-hospedagem/page.tsx`
- Modify: `src/app/sobre/page.tsx`
- Modify: `src/app/contato/page.tsx`

- [ ] **Step 1: Restyle cards to feel more premium and editorial**

```tsx
<article className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition hover:border-cyan-300/20 hover:bg-white/[0.07]">
```

Cards should look like premium panels, with cleaner bullets and stronger hover feedback.

- [ ] **Step 2: Align service pages with the new brand voice**

Each service page should keep the same content intent, but rewrite the opening copy to sound more direct and premium.

Example direction:
- Development Web: sites that convert and feel custom.
- Cybersecurity: practical protection, hardening, and visibility.
- Domínios/Hospedagem: managed setup with less friction.

- [ ] **Step 3: Adjust About and Contact pages so they match the new aesthetic**

Keep them short, but make them visually consistent:
- stronger headings;
- fewer generic paragraphs;
- more premium spacing;
- same CTA language as the home.

- [ ] **Step 4: Verify cross-page consistency manually in the browser**

Check:
- homepage → service page → WhatsApp link;
- mobile layout;
- visual tone consistency;
- sticky CTA visibility.

- [ ] **Step 5: Commit**

```bash
git add src/components/ServiceCard.tsx src/app/servicos/desenvolvimento-web/page.tsx src/app/servicos/cybersecurity/page.tsx src/app/servicos/dominios-hospedagem/page.tsx src/app/sobre/page.tsx src/app/contato/page.tsx
git commit -m "feat: align service pages with premium redesign"
```

---

### Task 4: Validate, polish, and deploy-ready check

**Objective:** confirm the redesign is production-safe and ready for Vercel publication.

**Files:**
- Modify only if needed after validation: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/lib/site.ts`
- Test: project-wide lint/build and browser check against the deployed URL

- [ ] **Step 1: Run the full static validation**

Run:
```bash
npm run lint
npm run build
```
Expected: both commands pass.

- [ ] **Step 2: Verify the live site in the browser**

Check `https://oraculoai-site.vercel.app/` for:
- hero hierarchy;
- readability on mobile and desktop;
- WhatsApp CTA visibility;
- no broken links;
- overall premium feel.

- [ ] **Step 3: Make only the minimal polish changes if validation reveals issues**

If the browser check reveals a spacing, contrast, or overflow problem, fix only that issue before shipping.

- [ ] **Step 4: Final commit if any polish was needed**

```bash
git add src/app/layout.tsx src/app/page.tsx src/app/globals.css src/lib/site.ts
git commit -m "fix: polish premium redesign for production"
```

---

## Files likely to change

- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/not-found.tsx`
- `src/app/servicos/desenvolvimento-web/page.tsx`
- `src/app/servicos/cybersecurity/page.tsx`
- `src/app/servicos/dominios-hospedagem/page.tsx`
- `src/app/sobre/page.tsx`
- `src/app/contato/page.tsx`
- `src/components/Section.tsx`
- `src/components/ServiceCard.tsx`
- `src/components/WhatsAppButton.tsx`
- `src/lib/site.ts`

## Validation

Primary checks:
- `npm run lint`
- `npm run build`
- browser verification on the Vercel preview/live URL

Manual checks:
- hero reads clearly in under 10 seconds;
- WhatsApp CTA is visible and obvious;
- the site feels premium, not generic;
- service pages match the new brand tone;
- mobile layout is clean and not cramped.

## Risks / tradeoffs

- The redesign can become overly decorative and hurt conversion; keep effects subtle and CTA-first.
- The site can drift too close to the Mailkit reference; use the same logic, not the same layout.
- Copy can become too luxurious and vague; every section still needs to explain the offer and drive contact.
- Mobile spacing may need a second pass after the visual changes; test early.

## Open questions

- Whether to keep Geist as the main body font or introduce a stronger serif display accent for the hero.
- Whether the service pages should receive a full visual refresh in this pass or only copy/spacing alignment.
- Whether a small proof strip should use numbers, trust labels, or a short “how we work” sequence.
