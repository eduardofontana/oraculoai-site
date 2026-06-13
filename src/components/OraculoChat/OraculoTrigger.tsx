"use client";

import { useState, lazy, Suspense } from "react";

const OraculoChatPanel = lazy(() =>
  import("./OraculoChatPanel").then((mod) => ({ default: mod.OraculoChatPanel })),
);

export function OraculoTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── Botão flutuante ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="group fixed right-5 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-[0_0_24px_var(--glow)] transition-all hover:shadow-[0_0_40px_var(--glow-strong)] hover:scale-105"
        aria-label="Conversar com o Oráculo"
      >
        {/* Ícone de chip/neural */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a4 4 0 0 1 4 4v1h2a3 3 0 0 1 3 3v1h-2v-1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1H3v-1a3 3 0 0 1 3-3h2V6a4 4 0 0 1 4-4z" />
          <path d="M12 6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
          <path d="M6 12h12" />
          <path d="M6 16h12" />
        </svg>

        {/* Badge "IA" */}
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white ring-2 ring-bg">
          IA
        </span>
      </button>

      {/* ── Tooltip (só visible em desktop, no hover) ── */}
      <div className="fixed right-5 bottom-36 z-50 hidden md:block pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="rounded-xl border border-border bg-elevated px-4 py-2.5 text-sm font-medium text-primary shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Conversar com o Oráculo</span>
            <span className="ml-1 rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent">
              IA
            </span>
          </div>
        </div>
      </div>

      {/* ── Painel de chat (lazy loaded) ── */}
      {isOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/90">
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
              </div>
            </div>
          }
        >
          <OraculoChatPanel onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
