import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function DominiosHospedagemPage() {
  const message = buildWhatsAppUrl("Olá! Quero domínio, hospedagem ou migração.");

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white md:px-8">
      <WhatsAppButton />
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          ← voltar
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Domínios e Hospedagem</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Ajudo a estruturar domínio, DNS, hospedagem e e-mail sem complicação.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">O que entrego</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>• Registro de domínio</li>
              <li>• Configuração DNS</li>
              <li>• Migração assistida</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">Para quem é</h2>
            <p className="mt-3 text-sm text-zinc-300">
              Para quem quer uma estrutura simples, funcionando e com suporte direto quando precisar.
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
            Pedir atendimento no WhatsApp
          </Link>
          <Link
            href="/sobre"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Sobre
          </Link>
        </div>
      </div>
    </main>
  );
}
