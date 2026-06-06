import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white md:px-8">
      <WhatsAppButton />
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">
          ← voltar
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Sobre</h1>
        <p className="mt-4 text-zinc-300">
          OraculoAI é o nome do projeto focado em criação de sites, segurança e estrutura digital para clientes que querem clareza e velocidade.
        </p>
      </div>
    </main>
  );
}
