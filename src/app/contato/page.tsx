import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function ContatoPage() {
  const message = buildWhatsAppUrl("Olá! Quero conversar sobre meu projeto.");

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white md:px-8">
      <WhatsAppButton />
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          ← voltar
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Contato</h1>
        <p className="mt-4 text-zinc-300">O caminho mais rápido é o WhatsApp.</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={message}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
          >
            Falar no WhatsApp
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            {site.email}
          </a>
        </div>
      </div>
    </main>
  );
}
