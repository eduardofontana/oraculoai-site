import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CpfGenerator } from "@/components/tools/CpfGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-cpf")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-cpf"
      title="Gerador de CPF"
      description="Gere CPFs válidos para testes de sistemas. Escolha entre formato com ou sem pontuação e copie com um clique."
    >
      <CpfGenerator />
    </ToolLayout>
  )
}
