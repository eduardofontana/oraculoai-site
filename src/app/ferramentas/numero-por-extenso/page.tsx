import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { NumeroExtenso } from "@/components/tools/NumeroExtenso"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("numero-por-extenso")

export default function Page() {
  return (
    <ToolLayout
      slug="numero-por-extenso"
      title="Conversor de Número por Extenso"
      description="Converta números e valores monetários para a forma escrita em português. Suporte até 999 milhões."
    >
      <NumeroExtenso />
    </ToolLayout>
  )
}
