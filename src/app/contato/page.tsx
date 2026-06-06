import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";

export default function ContatoPage() {
  const message = buildWhatsAppUrl("Olá! Quero conversar sobre um projeto premium.");

  return (
    <main className="min-h-[80vh] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-400/80">
              Contato
            </p>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-instrument-serif)] text-5xl tracking-tight text-white md:text-7xl">
              O caminho mais rápido é o WhatsApp.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
              Se você quer um site, proteção ou estrutura digital com mais clareza, me chama direto.
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
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                {site.email}
              </a>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Canais</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">WhatsApp</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Resposta mais rápida para alinhamento de escopo e orçamento.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">E-mail</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Suporte para quem prefere documentar o primeiro contato.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
