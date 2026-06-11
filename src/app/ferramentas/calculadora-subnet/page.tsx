import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { SubnetCalculator } from "@/components/tools/SubnetCalculator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("calculadora-subnet")

export default function Page() {
  return (
    <ToolLayout
      slug="calculadora-subnet"
      title="Calculadora de Subnet"
      description="Calcule máscara de rede, endereço de rede e broadcast, hosts disponíveis e mais a partir de um endereço IP e máscara CIDR."
    >
      <SubnetCalculator />
    </ToolLayout>
  )
}
