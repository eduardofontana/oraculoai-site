import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { PercentCalculator } from "@/components/tools/PercentCalculator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("calculadora-porcentagem")

export default function Page() {
  return (
    <ToolLayout
      slug="calculadora-porcentagem"
      title="Calculadora de Porcentagem"
      description="Calcule porcentagens de forma simples: X% de Y, X é quantos % de Y, ou aumento/redução percentual entre dois valores."
    >
      <PercentCalculator />
    </ToolLayout>
  )
}
