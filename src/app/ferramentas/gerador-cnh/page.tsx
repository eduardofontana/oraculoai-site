import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CnhGenerator } from "@/components/tools/CnhGenerator"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("gerador-cnh")
export default function Page() {
  return <ToolLayout slug="gerador-cnh" title="Gerador de CNH" description="Gere números de CNH fictícios para testes de sistemas."><CnhGenerator /></ToolLayout>
}
