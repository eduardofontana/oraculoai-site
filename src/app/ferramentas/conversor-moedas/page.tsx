import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { MoedasConverter } from "@/components/tools/MoedasConverter"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("conversor-moedas")

export default function Page() {
  return (
    <ToolLayout
      slug="conversor-moedas"
      title="Conversor de Moedas"
      description="Converta valores entre moedas como dólar, euro, real e outras. Utiliza a AwesomeAPI com fallback offline para taxas aproximadas."
    >
      <MoedasConverter />
    </ToolLayout>
  )
}
