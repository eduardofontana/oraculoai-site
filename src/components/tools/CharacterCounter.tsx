"use client"

import { useState } from "react"

export function CharacterCounter() {
  const [text, setText] = useState("")

  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, "").length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text ? text.split("\n").length : 0
  const paragraphs = text
    ? text.split("\n").filter((p) => p.trim().length > 0).length
    : 0

  return (
    <div className="space-y-6">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="Digite ou cole seu texto aqui..."
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: "Caracteres", value: chars },
          { label: "Sem espaços", value: charsNoSpace },
          { label: "Palavras", value: words },
          { label: "Linhas", value: lines },
          { label: "Parágrafos", value: paragraphs },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-bg p-4 text-center"
          >
            <p className="font-display text-2xl font-extrabold text-accent">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
