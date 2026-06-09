import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center text-primary">
      <div className="relative max-w-xl">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <div className="relative rounded-2xl border border-border bg-card px-8 py-10">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-muted">
            404
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
            Página não encontrada
          </h1>
          <p className="mt-4 text-secondary">
            Volte para a home ou use o contato para seguir pelo canal certo.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)] hover:-translate-y-0.5"
          >
            Ir para a home
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
