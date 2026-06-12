"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { v4 as uuid } from "uuid";
import type { Message } from "./types";

/* ──────────────────────────────────────────────────────────────── */
/*  Constantes                                                     */
/* ──────────────────────────────────────────────────────────────── */
const MAX_MESSAGES = 20;
const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Olá! Sou o **Oráculo**, seu assistente técnico especializado em segurança cibernética, inteligência artificial e arquitetura de sistemas.\n\nPergunte sobre:\n- 🔐 Hardening & segurança defensiva\n- 🤖 Agentes de IA & automação\n- ☁️ Cloud, Linux & DevOps\n- 🛡️ Bug bounty defensivo & DevSecOps\n- 📐 Arquitetura de software\n\nComo posso ajudar hoje?",
  timestamp: Date.now(),
};

/* ──────────────────────────────────────────────────────────────── */
/*  Tipos auxiliares                                               */
/* ──────────────────────────────────────────────────────────────── */
interface Props {
  onClose: () => void;
}

/* ──────────────────────────────────────────────────────────────── */
/*  Componente                                                    */
/* ──────────────────────────────────────────────────────────────── */
export function OraculoChatPanel({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* ── Scroll automático ── */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  /* ── Foco no input ao abrir ── */
  useEffect(() => {
    // Pequeno delay para a animação de entrada
    const timer = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(timer);
  }, []);

  /* ── Fechar com Escape ── */
  useEffect(() => {
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  /* ── Travar scroll do body quando aberto (mobile) ── */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* ── Enviar mensagem ── */
  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setError(null);

    // Limite por sessão
    const userMsgCount = messages.filter((m) => m.role === "user").length;
    if (userMsgCount >= MAX_MESSAGES) {
      setError(
        `Limite de ${MAX_MESSAGES} mensagens por sessão atingido. Recarregue a página para continuar.`,
      );
      return;
    }

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: uuid(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/oraculo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Erro desconhecido");
      }

      const reply: Message = {
        id: uuid(),
        role: "assistant",
        content: data.reply,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "Falha ao comunicar com o serviço.";
      const errorMessage: Message = {
        id: uuid(),
        role: "error",
        content: errMsg,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  /* ── Enter envia, Shift+Enter nova linha ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  /* ── Retry para mensagens de erro ── */
  const handleRetry = useCallback(
    (errorContent: string) => {
      // Encontra a última mensagem do usuário anterior ao erro
      const lastUserMsg = [...messages]
        .reverse()
        .find((m) => m.role === "user");
      if (lastUserMsg) {
        setInput(lastUserMsg.content);
        setMessages((prev) => prev.filter((m) => m.role !== "error"));
      }
    },
    [messages],
  );

  /* ── Formata markdown básico ── */
  function renderContent(content: string) {
    // Bold **texto**
    const withBold = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Quebras de linha
    const withBreaks = withBold.replace(/\n/g, "<br/>");
    // Listas: linhas começando com "- "
    const withLists = withBreaks.replace(
      /^(?:<br\/>)*[-•]\s(.*?)(?:<br\/>|$)/gm,
      '<span class="flex gap-2"><span class="text-accent shrink-0">•</span><span>$1</span></span>',
    );
    return withLists;
  }

  /* ── Calcular altura do textarea ── */
  function autoResize(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  const userMsgCount = messages.filter((m) => m.role === "user").length;
  const isAtLimit = userMsgCount >= MAX_MESSAGES;

  return (
    <>
      {/* ── Backdrop (mobile) ── */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Painel ── */}
      <div
        ref={panelRef}
        className={`
          fixed z-[70] flex flex-col bg-bg border-border
          /* Desktop: lateral direita */
          md:top-0 md:right-0 md:h-full md:w-[420px] md:border-l md:shadow-2xl md:animate-slide-in-right
          /* Mobile: fullscreen */
          inset-0 border-0 animate-fade-in
        `}
        role="dialog"
        aria-label="Conversar com o Oráculo"
        aria-modal="true"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <path d="M12 2a4 4 0 0 1 4 4v1h2a3 3 0 0 1 3 3v1h-2v-1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1H3v-1a3 3 0 0 1 3-3h2V6a4 4 0 0 1 4-4z" />
                <path d="M12 6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
                <path d="M6 12h12" />
                <path d="M6 16h12" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-primary">Oráculo</h2>
              <span className="text-[11px] font-medium text-accent uppercase tracking-wider">
                Assistente Técnico IA
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all hover:bg-surface-overlay hover:text-primary"
            aria-label="Fechar chat"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* ── Mensagens ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar do Oráculo */}
              {msg.role === "assistant" && (
                <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-bold text-accent">
                  O
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent text-white rounded-br-md"
                    : msg.role === "error"
                      ? "border border-accent-border bg-accent-soft text-accent-text"
                      : "border border-border bg-card text-primary rounded-bl-md"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderContent(msg.content),
                    }}
                  />
                ) : (
                  <p>{msg.content}</p>
                )}

                {/* Botão retry para erros */}
                {msg.role === "error" && (
                  <button
                    onClick={() => handleRetry(msg.content)}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-all hover:bg-accent/20"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Tentar novamente
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* ── Indicador de digitação ── */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-bold text-accent">
                O
              </div>
              <div className="rounded-2xl rounded-bl-md border border-border bg-card px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {/* ── Aviso de limite ── */}
          {isAtLimit && (
            <div className="rounded-xl border border-accent-border bg-accent-soft px-4 py-3 text-center text-sm text-accent-text">
              Limite de {MAX_MESSAGES} mensagens por sessão atingido.
              Recarregue a página para continuar.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ── */}
        <div className="shrink-0 border-t border-border p-4">
          <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2 transition-all focus-within:border-accent-border focus-within:ring-1 focus-within:ring-accent/20">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResize(e.target);
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                isAtLimit
                  ? "Limite atingido"
                  : "Pergunte sobre segurança, IA, cloud..."
              }
              disabled={isAtLimit}
              rows={1}
              className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-primary outline-none placeholder:text-muted disabled:opacity-40"
              aria-label="Mensagem"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || isAtLimit}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition-all hover:bg-accent/90 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Enviar mensagem"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 14 0" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted">
            Enter para enviar · Shift+Enter para nova linha · Esc para fechar
          </p>
        </div>
      </div>

      {/* ── Animations (injetadas via style tag) ── */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}
