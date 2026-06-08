"use client"

import { useState } from "react"

function countSyllables(word: string): number {
  const vowels = "aeiouáéíóúâêîôûàèìòùãẽĩõũäëïöü"
  let count = 0
  let prevVowel = false
  for (const char of word.toLowerCase()) {
    const isVowel = vowels.includes(char)
    if (isVowel && !prevVowel) count++
    prevVowel = isVowel
  }
  return count || 1
}

export function SyllableCounter() {
  const [text, setText] = useState("")

  const words = text.trim()
    ? text.trim().split(/\s+/).map((w) => ({
        word: w,
        syllables: countSyllables(w),
      }))
    : []

  const totalSyllables = words.reduce((sum, w) => sum + w.syllables, 0)

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">Texto</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Digite o texto..."
          className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-primary placeholder-muted focus:border-accent-border focus:outline-none"
        />
      </div>

      {text && (
        <>
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="text-sm text-muted">Total de sílabas: <span className="font-bold text-primary">{totalSyllables}</span></p>
          </div>
          <div className="flex flex-wrap gap-2">
            {words.map((w, i) => (
              <span key={i} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-primary">
                {w.word}
                <span className="ml-1.5 text-xs text-muted">({w.syllables})</span>
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
