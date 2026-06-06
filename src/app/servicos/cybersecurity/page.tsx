import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";

export default function CybersecurityPage() {
  const message = buildWhatsAppUrl("Olá! Quero revisar a segurança do meu site ou servidor.");

  return (
    <main className="min-h-[80vh] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-400/80">
              Serviço 02
            </p>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-instrument-serif)] text-5xl tracking-tight text-white md:text-7xl">
              Cybersecurity
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
              Segurança prática para reduzir risco, organizar proteção e manter seu ambiente digital
              sob controle.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={message}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400"
              >
                Falar no WhatsApp
              </Link>
              <Link
                href="/servicos/dominios-hospedagem"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Ver domínios e hospedagem
              </Link>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">O que entrego</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Hardening</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Ajustes defensivos para reduzir exposição e fortalecer a base.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Auditoria inicial</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Leitura prática dos principais riscos e pontos de melhoria.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Backup e monitoramento</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Rotina mínima para manter recuperação e visibilidade.
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
              Menos risco, mais clareza e uma postura defensiva que parece profissional.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-400/80">Ideal para</p>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              Negócios que precisam de proteção prática sem discurso genérico ou complexo.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
