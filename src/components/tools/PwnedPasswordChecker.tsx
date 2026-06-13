"use client"

import { useState } from "react"
import Link from "next/link"
import { checkPwnedPassword } from "@/lib/hibp"

function getPasswordStrength(password: string): {
  label: string
  color: string
  score: number
  bars: number
} {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (password.length >= 16) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 1)
    return { label: "Muito fraca", color: "bg-red-500", score, bars: 1 }
  if (score <= 2)
    return { label: "Fraca", color: "bg-orange-500", score, bars: 2 }
  if (score <= 3)
    return { label: "Média", color: "bg-amber-500", score, bars: 3 }
  if (score <= 4)
    return { label: "Forte", color: "bg-lime-500", score, bars: 4 }
  return { label: "Muito forte", color: "bg-emerald-500", score, bars: 5 }
}

export function PwnedPasswordChecker() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    pwned: boolean
    count: number
  } | null>(null)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const strength = password ? getPasswordStrength(password) : null

  const handleCheck = async () => {
    if (!password) return
    setLoading(true)
    setError("")
    setResult(null)
    setSearched(false)
    try {
      const res = await checkPwnedPassword(password)
      setResult({ pwned: res.pwned, count: res.count })
    } catch {
      setError("Erro ao consultar a API. Verifique sua conexão e tente novamente.")
    } finally {
      setLoading(false)
      setSearched(true)
    }
  }

  return (
    <div className="space-y-8">
      {/* Input de senha */}
      <div>
        <label
          htmlFor="pwned-password"
          className="text-sm font-semibold text-primary"
        >
          Digite a senha para verificar
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              id="pwned-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (result) setResult(null)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCheck()
              }}
              placeholder="Cole ou digite sua senha..."
              disabled={loading}
              className="w-full rounded-lg border border-border bg-bg px-4 py-3 pr-11 text-sm text-primary outline-none transition focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-muted disabled:opacity-50"
              autoComplete="off"
              spellCheck={false}
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
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeDasharray="60"
                    strokeDashoffset="20"
                  />
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

        {/* Medidor de força da senha */}
        {strength && (
          <div className="mt-3">
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i < strength.bars ? strength.color : "bg-border"
                  }`}
                />
              ))}
            </div>
            <p className="mt-1 text-xs text-muted">
              Força:{" "}
              <span className="font-medium text-primary">
                {strength.label}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Resultado da consulta HIBP */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <div className="flex items-start gap-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        </div>
      )}

      {result && (
        <div
          className={`rounded-lg border p-5 transition-all ${
            result.pwned
              ? "border-red-500/30 bg-red-500/5"
              : "border-emerald-500/30 bg-emerald-500/5"
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Badge grande de resultado */}
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                result.pwned ? "bg-red-500/15" : "bg-emerald-500/15"
              }`}
            >
              {result.pwned ? (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              ) : (
                <svg
                  width="28"
                  height="28"
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
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`text-lg font-bold ${
                  result.pwned ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {result.pwned
                  ? `Senha comprometida!`
                  : "Senha segura!"}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-secondary">
                {result.pwned
                  ? `Esta senha foi encontrada em ${result.count.toLocaleString("pt-BR")} vazamento${result.count > 1 ? "s" : ""} de dados conhecido${result.count > 1 ? "s" : ""}. `
                  : "Esta senha não aparece em nenhum vazamento de dados conhecido pelo Have I Been Pwned."}
                {result.pwned
                  ? "Isso significa que ela pode estar circulando publicamente e deve ser trocada imediatamente."
                  : "Continue usando boas práticas de segurança: senhas longas, únicas e com variedade de caracteres."}
              </p>
            </div>
          </div>

          {/* Ações */}
          <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4">
            {result.pwned ? (
              <>
                <Link
                  href="/ferramentas/gerador-senha"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Gerar senha forte
                </Link>
                <button
                  onClick={() => {
                    setPassword("")
                    setResult(null)
                    setSearched(false)
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-secondary transition hover:border-accent-border hover:text-primary"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  Testar outra senha
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setPassword("")
                  setResult(null)
                  setSearched(false)
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-secondary transition hover:border-accent-border hover:text-primary"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                Testar outra senha
              </button>
            )}
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-3">
            <svg
              className="h-8 w-8 animate-spin text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeDasharray="60"
                strokeDashoffset="20"
              />
            </svg>
            <p className="text-sm text-muted">
              Consultando banco de dados de vazamentos...
            </p>
            <p className="text-xs text-muted">
              Sua senha nunca sai do navegador (k-anonymity)
            </p>
          </div>
        </div>
      )}

      {/* Como funciona */}
      {!searched && !loading && (
        <div className="rounded-lg border border-border bg-bg p-5">
          <h3 className="text-sm font-bold text-primary">
            Como esta verificação funciona?
          </h3>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-secondary">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-primary">1 — Hash local:</strong> Sua senha é convertida em um hash SHA-1
                diretamente no seu navegador. A senha em si nunca é enviada para lugar nenhum.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-primary">2 — k-anonymity:</strong> Apenas os primeiros 5 caracteres do hash
                são enviados para a API do Have I Been Pwned. Isso é insuficiente para reconstruir
                sua senha, mas permite buscar entre milhares de hashes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>
                <strong className="text-primary">3 — Matching local:</strong> O restante do hash é comparado
                localmente com os resultados retornados. Se houver correspondência, sua senha
                foi exposta em algum vazamento.
              </span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-muted">
            Esse modelo foi desenvolvido por Troy Hunt e é o mesmo usado por navegadores,
            gerenciadores de senhas e plataformas como Firefox, 1Password e Apple.
          </p>
        </div>
      )}

      {/* Dicas de segurança */}
      <div className="rounded-lg border border-border bg-bg p-5">
        <h3 className="text-sm font-bold text-primary">Dicas de segurança</h3>
        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-secondary">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-emerald-500">✓</span>
            <span>Use senhas com <strong className="text-primary">pelo menos 12 caracteres</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-emerald-500">✓</span>
            <span>Combine maiúsculas, minúsculas, números e símbolos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-emerald-500">✓</span>
            <span>Nunca reuse a mesma senha em serviços diferentes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-emerald-500">✓</span>
            <span>Use um <strong className="text-primary">gerenciador de senhas</strong> para criar e armazenar senhas únicas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-emerald-500">✓</span>
            <span>Ative a <strong className="text-primary">autenticação de dois fatores (2FA)</strong> sempre que possível</span>
          </li>
        </ul>
        <Link
          href="/ferramentas/gerador-senha"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition hover:text-accent-text"
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
          Usar gerador de senha forte
        </Link>
      </div>

      {/* Aviso de privacidade */}
      <div className="rounded-lg border border-border bg-bg p-4">
        <p className="text-xs leading-6 text-muted">
          <strong className="text-primary">Privacidade:</strong> Esta ferramenta utiliza o modelo{" "}
          <strong className="text-primary">k-anonymity</strong> do Have I Been Pwned. Nenhum dado pessoal
          é enviado, armazenado ou compartilhado. A senha digitada permanece exclusivamente no seu
          navegador durante todo o processo. Consulte os{" "}
          <a
            href="https://haveibeenpwned.com/API/v3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline transition hover:text-accent-text"
          >
            termos da API do HIBP
          </a>{" "}
          para mais detalhes.
        </p>
      </div>
    </div>
  )
}
