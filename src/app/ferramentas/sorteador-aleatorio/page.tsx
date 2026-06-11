import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { Sorteador } from "@/components/tools/Sorteador"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("sorteador-aleatorio")

export default function Page() {
  return (
    <ToolLayout
      slug="sorteador-aleatorio"
      title="Sorteador Aleatório"
      description="Sorteie itens de uma lista de forma aleatória. Defina a quantidade e escolha se pode repetir itens ou não."
    >
      <Sorteador />
    </ToolLayout>
  )
}
