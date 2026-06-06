import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
      <div className="hero-glow max-w-xl rounded-[2rem] border border-white/10 bg-white/5 px-8 py-10 backdrop-blur-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
          404
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-4 text-zinc-300">
          Volte para a home e siga pelo WhatsApp para falar direto comigo.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
        >
          Ir para a home
        </Link>
      </div>
    </main>
  );
}
