import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CalculadoraDatas } from "@/components/tools/CalculadoraDatas"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("calculadora-datas")

export default function Page() {
  return (
    <ToolLayout
      slug="calculadora-datas"
      title="Calculadora de Datas"
      description="Calcule a diferença entre datas ou adicione/subtraia dias, meses e anos."
    >
      <CalculadoraDatas />
    </ToolLayout>
  )
}
