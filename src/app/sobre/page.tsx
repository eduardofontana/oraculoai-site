import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function SobrePage() {
  const message = buildWhatsAppUrl("Olá! Quero saber mais sobre a OraculoAI.");

  return (
    <main className="min-h-[80vh] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <section>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-400/70">
                Sobre
              </p>
              <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-5xl tracking-tight text-white md:text-7xl">
                Uma presença digital com mais intenção.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
                A OraculoAI existe para criar, proteger e operar presença digital com estética
                premium, clareza comercial e conversa direta.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={message}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 hover:shadow-[0_0_32px_rgba(251,191,36,0.4)]"
                >
                  Falar no WhatsApp
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.1] px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.04]"
                >
                  Entrar em contato
                </Link>
              </div>
            </section>
          </Reveal>

          <Reveal delay={150}>
            <aside className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Posicionamento</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="font-medium text-white">Consultoria direta</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Fala técnica, sem rodeio e com foco no que fecha negócio.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="font-medium text-white">Entrega objetiva</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Menos ruído, mais clareza e uma experiência que passa valor.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
