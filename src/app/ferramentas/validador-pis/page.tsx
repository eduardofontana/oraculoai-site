import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { PisValidator } from "@/components/tools/PisValidator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("validador-pis")

export default function Page() {
  return (
    <ToolLayout
      slug="validador-pis"
      title="Validador de PIS/PASEP"
      description="Valide se um número de PIS/PASEP é matematicamente válido. Verifica o formato de 11 dígitos e o dígito verificador."
    >
      <PisValidator />
    </ToolLayout>
  )
}
