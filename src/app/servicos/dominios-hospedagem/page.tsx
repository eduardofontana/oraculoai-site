import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";

export default function DominiosHospedagemPage() {
  const message = buildWhatsAppUrl("Olá! Quero domínio, hospedagem ou migração assistida.");

  return (
    <main className="min-h-[80vh] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-400/80">
              Serviço 03
            </p>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-instrument-serif)] text-5xl tracking-tight text-white md:text-7xl">
              Domínios e Hospedagem
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
              Estrutura de domínio, DNS, e-mail e hospedagem com menos atrito e mais estabilidade.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={message}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400"
              >
                Pedir atendimento no WhatsApp
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Sobre a OraculoAI
              </Link>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">O que entrego</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Domínio</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Registro, apontamento e organização sem dor de cabeça.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">DNS e e-mail</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Configuração alinhada para manter o serviço estável e funcional.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Migração assistida</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Troca de hospedagem ou estrutura com acompanhamento direto.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-400/80">
              Resultado esperado
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              Uma base digital organizada, funcional e fácil de manter.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-400/80">Ideal para</p>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              Quem quer resolver o lado técnico da presença online com suporte direto.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
