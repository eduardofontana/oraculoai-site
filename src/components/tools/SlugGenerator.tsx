"use client"

import { useState } from "react"
import { textToSlug } from "@/lib/slug"
import { CopyButton } from "./CopyButton"

export function SlugGenerator() {
  const [input, setInput] = useState("")
  const [separator, setSeparator] = useState<string>("-")
  const [result, setResult] = useState("")

  const handleConvert = () => {
    setResult(textToSlug(input, separator === "-" ? "-" : "_"))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Texto para converter
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setResult("")
          }}
          placeholder="Meu texto para slug"
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-secondary">
          <input
            type="radio"
            name="separator"
            checked={separator === "-"}
            onChange={() => setSeparator("-")}
            className="h-4 w-4 text-accent"
          />
          Hífen (-)
        </label>
        <label className="flex items-center gap-2 text-sm text-secondary">
          <input
            type="radio"
            name="separator"
            checked={separator === "_"}
            onChange={() => setSeparator("_")}
            className="h-4 w-4 text-accent"
          />
          Underline (_)
        </label>
      </div>

      <button
        onClick={handleConvert}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Converter para Slug
      </button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="font-mono text-lg font-bold tracking-wider text-primary">
              {result}
            </p>
          </div>
          <CopyButton text={result} />
        </div>
      )}
    </div>
  )
}
