import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <Link
      href={buildWhatsAppUrl(site.whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-zinc-950/80 px-4 py-3 text-sm font-semibold text-amber-100 shadow-2xl shadow-black/40 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-zinc-900 animate-glow-pulse"
    >
      <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.7)]" />
      WhatsApp
    </Link>
  );
}
