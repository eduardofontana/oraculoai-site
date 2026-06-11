import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { WordFrequency } from "@/components/tools/WordFrequency"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("analisador-frequencia-palavras")

export default function Page() {
  return (
    <ToolLayout
      slug="analisador-frequencia-palavras"
      title="Analisador de Frequência de Palavras"
      description="Analise a frequência de palavras em qualquer texto. Veja total de palavras, palavras únicas, caracteres e ranking das palavras mais usadas."
    >
      <WordFrequency />
    </ToolLayout>
  )
}
