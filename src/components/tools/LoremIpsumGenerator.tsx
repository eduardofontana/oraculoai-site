"use client"

import { useState } from "react"
import { CopyButton } from "./CopyButton"

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in",
  "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est",
  "laborum",
]

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function LoremIpsumGenerator() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<"paragraphs" | "words">("paragraphs")
  const [result, setResult] = useState("")

  const generate = () => {
    if (type === "paragraphs") {
      const paragraphs = Array.from({ length: count }, () => {
        const sentenceCount = Math.floor(Math.random() * 10) + 5
        const sentences = Array.from({ length: sentenceCount }, () => {
          const wordCount = Math.floor(Math.random() * 10) + 5
          const words = Array.from({ length: wordCount }, () => loremWords[Math.floor(Math.random() * loremWords.length)])
          return capitalize(words.join(" ")) + "."
        })
        return sentences.join(" ")
      })
      setResult(paragraphs.join("\n\n"))
    } else {
      const words = Array.from({ length: count }, () => loremWords[Math.floor(Math.random() * loremWords.length)])
      setResult(words.join(" "))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {(["paragraphs", "words"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${type === t ? "bg-accent text-white" : "border border-border bg-card text-secondary hover:border-accent-border"}`}
          >
            {t === "paragraphs" ? "Parágrafos" : "Palavras"}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-secondary">
          Quantidade de {type === "paragraphs" ? "parágrafos" : "palavras"}
        </label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-24 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-primary focus:border-accent-border focus:outline-none"
        />
      </div>

      <button
        onClick={generate}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_24px_var(--glow-strong)]"
      >
        Gerar Lorem Ipsum
      </button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border bg-bg p-4">
            <p className="font-serif text-sm leading-relaxed text-primary">{result}</p>
          </div>
          <CopyButton text={result} />
        </div>
      )}
    </div>
  )
}
