import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { PisGenerator } from "@/components/tools/PisGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-pis")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-pis"
      title="Gerador de PIS/PASEP"
      description="Gere números de PIS/PASEP matematicamente válidos para testes de sistemas. O número gerado possui 11 dígitos com dígito verificador."
    >
      <PisGenerator />
    </ToolLayout>
  )
}
