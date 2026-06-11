import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { FinanciamentoCalculator } from "@/components/tools/FinanciamentoCalculator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("calculadora-financiamento")

export default function Page() {
  return (
    <ToolLayout
      slug="calculadora-financiamento"
      title="Calculadora de Financiamento SAC vs PRICE"
      description="Compare tabelas SAC e PRICE lado a lado para financiamentos imobiliários. Simule parcelas, juros totais e saldo devedor mês a mês."
    >
      <FinanciamentoCalculator />
    </ToolLayout>
  )
}
