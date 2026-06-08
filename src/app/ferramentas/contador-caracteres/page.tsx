import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CharacterCounter } from "@/components/tools/CharacterCounter"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("contador-caracteres")

export default function Page() {
  return (
    <ToolLayout
      slug="contador-caracteres"
      title="Contador de Caracteres"
      description="Conte caracteres, palavras, linhas e parágrafos de qualquer texto."
    >
      <CharacterCounter />
    </ToolLayout>
  )
}
