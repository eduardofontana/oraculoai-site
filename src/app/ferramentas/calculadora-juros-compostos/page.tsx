import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { JurosCompostos } from "@/components/tools/JurosCompostos"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("calculadora-juros-compostos")

export default function Page() {
  return (
    <ToolLayout
      slug="calculadora-juros-compostos"
      title="Calculadora de Juros Compostos"
      description="Calcule o montante final e os juros acumulados de um investimento com juros compostos. Informe capital inicial, taxa mensal e período."
    >
      <JurosCompostos />
    </ToolLayout>
  )
}
