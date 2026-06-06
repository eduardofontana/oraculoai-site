import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function DesenvolvimentoWebPage() {
  const message = buildWhatsAppUrl("Olá! Quero um site premium para meu negócio.");

  return (
    <main className="min-h-screen text-white">
      <WhatsAppButton />
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8">
        <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">
          ← voltar
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
              Serviço 01
            </p>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Desenvolvimento Web
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
              Sites e landing pages com estética premium, discurso claro e caminho curto até a conversa.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={message}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
              >
                Pedir orçamento no WhatsApp
              </Link>
              <Link
                href="/servicos/cybersecurity"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Ver cybersecurity
              </Link>
            </div>
          </section>

          <aside className="hero-glow rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">O que entrego</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Landing pages</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Estrutura pensada para captar lead e direcionar a decisão.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Sites institucionais</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Presença digital profissional com leitura rápida e visual premium.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Manutenção estratégica</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Ajustes contínuos para manter performance, clareza e conversão.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Resultado esperado</p>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              Uma apresentação mais forte, mais clara e mais fácil de vender.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Ideal para</p>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              Negócios que querem uma landing ou site com aparência premium e foco em conversão.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
