import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function DesenvolvimentoWebPage() {
  const message = buildWhatsAppUrl("Olá! Quero um site/landing page para meu negócio.");

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white md:px-8">
      <WhatsAppButton />
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          ← voltar
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Desenvolvimento Web</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Crio sites enxutos para converter visitas em orçamento. Ideal para quem quer presença digital séria e direta.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">O que entrego</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>• Landing page</li>
              <li>• Site institucional</li>
              <li>• Página de contato com WhatsApp</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">Resultado esperado</h2>
            <p className="mt-3 text-sm text-zinc-300">
              Mensagem clara, identidade profissional e um caminho simples para o cliente chamar você.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={message}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
          >
            Pedir orçamento no WhatsApp
          </Link>
          <Link
            href="/servicos/cybersecurity"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Ver cybersecurity
          </Link>
        </div>
      </div>
    </main>
  );
}
