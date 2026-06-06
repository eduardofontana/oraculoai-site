import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function SobrePage() {
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
              Sobre
            </p>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Uma presença digital com mais intenção.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
              A OraculoAI existe para criar, proteger e operar presença digital com estética premium,
              clareza comercial e conversa direta.
            </p>
          </section>

          <aside className="hero-glow rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Posicionamento</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Consultoria direta</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Fala técnica, sem rodeio e com foco no que fecha negócio.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-lg font-semibold text-white">Entrega objetiva</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Menos ruído, mais clareza e uma experiência que passa valor.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
