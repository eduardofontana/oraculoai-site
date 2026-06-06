import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function CybersecurityPage() {
  const message = buildWhatsAppUrl("Olá! Quero revisar a segurança do meu site/servidor.");

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white md:px-8">
      <WhatsAppButton />
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          ← voltar
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Cybersecurity</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Segurança prática para quem precisa reduzir risco sem discurso vazio.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">O que entrego</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>• Hardening básico</li>
              <li>• Auditoria inicial</li>
              <li>• Backup e monitoramento</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">Ponto importante</h2>
            <p className="mt-3 text-sm text-zinc-300">
              Tudo é feito com escopo autorizado e objetivo defensivo. Sem promessa genérica, sem exagero.
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
            Falar no WhatsApp
          </Link>
          <Link
            href="/servicos/dominios-hospedagem"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Ver domínios e hospedagem
          </Link>
        </div>
      </div>
    </main>
  );
}
