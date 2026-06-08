import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CnpjValidator } from "@/components/tools/CnpjValidator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("validador-cnpj")

export default function Page() {
  return (
    <ToolLayout
      slug="validador-cnpj"
      title="Validador de CNPJ"
      description="Valide se um CNPJ é matematicamente válido. Aceita CNPJ com ou sem pontuação e rejeita sequências repetidas."
    >
      <CnpjValidator />
    </ToolLayout>
  )
}
