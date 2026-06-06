import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center text-primary">
      <div className="max-w-xl rounded-2xl border border-border bg-card px-8 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-text/70">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-primary md:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-4 text-secondary">
          Volte para a home e siga pelo WhatsApp para falar direto comigo.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)]"
        >
          Ir para a home
        </Link>
      </div>
    </main>
  );
}
