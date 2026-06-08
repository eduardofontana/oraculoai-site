import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CnpjGenerator } from "@/components/tools/CnpjGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-cnpj")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-cnpj"
      title="Gerador de CNPJ"
      description="Gere CNPJs válidos para testes de sistemas. Escolha entre formato com ou sem pontuação e copie com um clique."
    >
      <CnpjGenerator />
    </ToolLayout>
  )
}
