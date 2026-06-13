import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd, organizationSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Obrigado pelo contato | OraculoAI",
  description:
    "Recebemos sua mensagem! Nossa equipe retornará em até 24 horas pelo e-mail informado.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Obrigado pelo contato | OraculoAI",
    description:
      "Recebemos sua mensagem! Nossa equipe retornará em até 24 horas.",
  },
};

export default function ObrigadoPage() {
  return (
    <>
      <JsonLd schema={organizationSchema()} />

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-lg text-center">
          {/* Ícone de sucesso */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-primary">
            Obrigado pelo contato!
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-secondary">
            Recebemos sua mensagem e nossa equipe retornará em até{" "}
            <strong className="text-primary">24 horas</strong> pelo e-mail
            informado.
          </p>

          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-tertiary">
            <Link
              href="/"
              className="underline-offset-2 hover:text-accent hover:underline transition-colors"
            >
              Voltar ao início
            </Link>
            <span className="opacity-30">|</span>
            <Link
              href="/consultoria-ia"
              className="underline-offset-2 hover:text-accent hover:underline transition-colors"
            >
              Ver serviços de IA
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
