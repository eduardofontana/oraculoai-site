"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-muted">
          Erro
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-primary">
          Algo deu errado
        </h1>
        <p className="mt-4 text-secondary">
          Ocorreu um erro inesperado. Tente recarregar a página.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-[0_0_16px_var(--glow)] transition hover:shadow-[0_0_32px_var(--glow-strong)] hover:-translate-y-0.5"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
