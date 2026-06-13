"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackWhatsAppClick, trackDiagnosticoClick } from "@/lib/analytics";

type TrackEvent = "whatsapp" | "diagnostico";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  /** Se definido, dispara evento de analytics no clique */
  track?: TrackEvent;
  /** Label para o evento (ex: "hero", "cta_final") */
  trackLabel?: string;
};

const trackMap: Record<TrackEvent, (label: string) => void> = {
  whatsapp: trackWhatsAppClick,
  diagnostico: trackDiagnosticoClick,
};

/**
 * Link com suporte a tracking de analytics.
 * Pode ser usado em Server Components pois aceita apenas strings como props.
 */
export function TrackedLink({ href, children, className, target, rel, track, trackLabel = "" }: Props) {
  const handleClick = track
    ? () => trackMap[track](trackLabel)
    : undefined;

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
