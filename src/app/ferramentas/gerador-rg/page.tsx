import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { RgGenerator } from "@/components/tools/RgGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-rg")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-rg"
      title="Gerador de RG"
      description="Gere RGs fictícios com dígito verificador para testes de sistemas. O RG gerado inclui sigla do estado e segue o formato popular brasileiro."
    >
      <RgGenerator />
    </ToolLayout>
  )
}
