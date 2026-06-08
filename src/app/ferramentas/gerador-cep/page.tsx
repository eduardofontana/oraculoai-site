import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CepGenerator } from "@/components/tools/CepGenerator"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("gerador-cep")
export default function Page() {
  return <ToolLayout slug="gerador-cep" title="Gerador de CEP" description="Gere CEPs aleatórios com dados de endereço simulados para testes."><CepGenerator /></ToolLayout>
}
