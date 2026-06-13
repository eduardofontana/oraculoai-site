"use client"

import { useState } from "react"
import Link from "next/link"
import { checkPwnedPassword } from "@/lib/hibp"

export function PwnedPasswordBanner() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    pwned: boolean
    count: number
  } | null>(null)
  const [error, setError] = useState("")

  const handleCheck = async () => {
    if (!password) return
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await checkPwnedPassword(password)
      setResult({ pwned: res.pwned, count: res.count })
    } catch {
      setError("Erro ao consultar. Verifique sua conexão e tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const hasResult = result !== null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-border bg-gradient-to-br from-accent-soft via-card to-card p-6 shadow-[0_0_48px_-12px_rgba(225,25,55,0.3)] transition-shadow duration-500 md:p-8">
      {/* Ornamentos de fundo */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent-blue/5 blur-3xl" />

      {/* Badge "NOVO" */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        NOVO
      </div>

      {/* Título + descrição */}
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
        Verificador de Senha Vazada
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
        Descubra se sua senha já foi exposta em vazamentos de dados
        conhecidos. A consulta é{" "}
        <strong className="text-primary">anônima e 100% segura</strong> — sua
        senha nunca sai do seu navegador.
      </p>

      {/* Input + Botão */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (result) setResult(null)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCheck()
            }}
            placeholder="Digite sua senha para testar..."
            disabled={loading}
            className="w-full rounded-lg border border-border bg-bg px-4 py-3 pr-11 text-sm text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-muted disabled:opacity-50"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary"
            tabIndex={-1}
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            {showPassword ? (
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
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
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
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        <button
          onClick={handleCheck}
          disabled={!password || loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20" />
              </svg>
              Verificando...
            </>
          ) : (
            <>
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Verificar
            </>
          )}
        </button>
      </div>

      {/* Resultado */}
      {error && (
        <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
      )}

      {hasResult && (
        <div
          className={`mt-4 rounded-lg border p-4 transition-all ${
            result.pwned
              ? "border-red-500/30 bg-red-500/5"
              : "border-emerald-500/30 bg-emerald-500/5"
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Ícone de resultado */}
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm">
              {result.pwned ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-bold ${
                  result.pwned ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {result.pwned
                  ? `Senha encontrada em ${result.count.toLocaleString("pt-BR")} vazamento${result.count > 1 ? "s" : ""}!`
                  : "Senha segura! Não encontrada em vazamentos."}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-secondary">
                {result.pwned
                  ? "Recomendamos trocar esta senha imediatamente. Use uma senha longa, única e com caracteres variados."
                  : "Esta senha não aparece em nenhum vazamento de dados conhecido pelo Have I Been Pwned."}
              </p>
              {result.pwned && (
                <Link
                  href="/ferramentas/gerador-senha"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent transition hover:text-accent-text"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Gerar senha forte →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Privacidade total — k-anonymity
        </span>
        <Link
          href="/ferramentas/verificador-senha-vazada"
          className="font-medium text-accent transition hover:text-accent-text"
        >
          Versão completa →
        </Link>
      </div>
    </div>
  )
}
