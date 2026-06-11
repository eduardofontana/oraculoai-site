import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { RgValidator } from "@/components/tools/RgValidator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("validador-rg")

export default function Page() {
  return (
    <ToolLayout
      slug="validador-rg"
      title="Validador de RG"
      description="Valide o formato e o dígito verificador de RGs brasileiros. Aceita formatos com ou sem pontuação e sigla do estado."
    >
      <RgValidator />
    </ToolLayout>
  )
}
