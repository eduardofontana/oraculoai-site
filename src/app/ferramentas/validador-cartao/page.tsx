import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CardValidator } from "@/components/tools/CardValidator"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("validador-cartao")
export default function Page() {
  return <ToolLayout slug="validador-cartao" title="Validador de Cartão de Crédito" description="Valide números de cartão de crédito pelo algoritmo de Luhn e descubra a bandeira."><CardValidator /></ToolLayout>
}
