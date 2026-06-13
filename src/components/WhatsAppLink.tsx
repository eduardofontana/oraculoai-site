"use client";

import { useCallback, type ReactNode } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";

type Props = {
  children: ReactNode;
  className?: string;
  message?: string;
  trackLabel?: string;
};

/**
 * Componente que monta o link do WhatsApp em runtime.
 * O número NUNCA aparece no HTML — só existe na memória JS.
 */
export function WhatsAppLink({
  children,
  className,
  message = "Olá, vim pelo site OraculoAI e gostaria de conversar sobre soluções de IA para minha empresa.",
  trackLabel,
}: Props) {
  const digits = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (trackLabel) {
        trackWhatsAppClick(trackLabel);
      }

      const clean = digits.replace(/[^\d]/g, "");
      const url = `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [digits, message, trackLabel],
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
