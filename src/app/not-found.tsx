import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center text-white">
      <div className="max-w-xl rounded-2xl border border-white/[0.06] bg-white/[0.03] px-8 py-10 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-400/70">
          404
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-tight text-white md:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-4 text-zinc-400">
          Volte para a home e siga pelo WhatsApp para falar direto comigo.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 hover:shadow-[0_0_32px_rgba(251,191,36,0.4)]"
        >
          Ir para a home
        </Link>
      </div>
    </main>
  );
}
