import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function DesenvolvimentoWebPage() {
  const message = buildWhatsAppUrl("Olá! Quero um site premium para meu negócio.");

  return (
    <main className="min-h-[80vh] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-400/70">
                Serviço 01
              </p>
              <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-instrument-serif)] text-5xl tracking-tight text-white md:text-7xl">
                Desenvolvimento Web
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
                Sites e landing pages com estética premium, discurso claro e caminho curto até a
                conversa.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={message}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 hover:shadow-[0_0_32px_rgba(251,191,36,0.4)]"
                >
                  Pedir orçamento no WhatsApp
                </Link>
                <Link
                  href="/servicos/cybersecurity"
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.1] px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.04]"
                >
                  Ver cybersecurity
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <aside className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">O que entrego</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="font-medium text-white">Landing pages</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Estrutura pensada para captar lead e direcionar a decisão.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="font-medium text-white">Sites institucionais</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Presença digital profissional com leitura rápida e visual premium.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="font-medium text-white">Manutenção estratégica</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Ajustes contínuos para manter performance, clareza e conversão.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <section className="mt-14 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-400/60">
                Resultado esperado
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-300">
                Uma apresentação mais forte, mais clara e mais fácil de vender.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-400/60">Ideal para</p>
              <p className="mt-4 text-base leading-7 text-zinc-300">
                Negócios que querem uma landing ou site com aparência premium e foco em conversão.
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
