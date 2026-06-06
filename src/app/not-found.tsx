import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white">
      <h1 className="text-3xl font-semibold">Página não encontrada</h1>
      <p className="mt-4 text-zinc-300">Volte para a home e siga pelo WhatsApp.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
      >
        Ir para a home
      </Link>
    </main>
  );
}
