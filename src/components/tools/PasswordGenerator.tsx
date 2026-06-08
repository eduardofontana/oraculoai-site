"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const DIGITS = "0123456789"
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?"

export function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [useUpper, setUseUpper] = useState(true)
  const [useLower, setUseLower] = useState(true)
  const [useDigits, setUseDigits] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [password, setPassword] = useState("")

  const generate = () => {
    let chars = ""
    if (useLower) chars += LOWERCASE
    if (useUpper) chars += UPPERCASE
    if (useDigits) chars += DIGITS
    if (useSymbols) chars += SYMBOLS
    if (!chars) return

    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    setPassword(result)
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Tamanho: {length}
        </label>
        <input
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(e) => { setPassword(""); setLength(Number(e.target.value)) }}
          className="w-full accent-accent"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {[
          { key: "upper", label: "ABC", state: useUpper, set: setUseUpper },
          { key: "lower", label: "abc", state: useLower, set: setUseLower },
          { key: "digits", label: "123", state: useDigits, set: setUseDigits },
          { key: "symbols", label: "#@!", state: useSymbols, set: setUseSymbols },
        ].map(({ key, label, state, set }) => (
          <label key={key} className="flex items-center gap-2 text-sm text-secondary">
            <input
              type="checkbox"
              checked={state}
              onChange={(e) => { set(e.target.checked); setPassword("") }}
              className="h-4 w-4 rounded border-border bg-card text-accent"
            />
            {label}
          </label>
        ))}
      </div>

      <button
        onClick={generate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Gerar Senha
      </button>

      {password && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="break-all font-mono text-lg font-bold tracking-wider text-primary">{password}</p>
          </div>
          <CopyButton text={password} />
        </div>
      )}
    </div>
  )
}
