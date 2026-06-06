import Link from "next/link";
import { buildWhatsAppUrl, site } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <Link
      href={buildWhatsAppUrl(site.whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
    >
      WhatsApp
    </Link>
  );
}
