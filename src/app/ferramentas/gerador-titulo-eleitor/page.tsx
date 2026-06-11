import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { TituloEleitor } from "@/components/tools/TituloEleitor"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-titulo-eleitor")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-titulo-eleitor"
      title="Gerador e Validador de Título de Eleitor"
      description="Gere títulos de eleitor fictícios para testes ou valide números existentes com verificação dos dígitos por UF."
    >
      <TituloEleitor />
    </ToolLayout>
  )
}
