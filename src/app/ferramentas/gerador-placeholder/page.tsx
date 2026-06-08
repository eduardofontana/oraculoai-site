import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { PlaceholderGenerator } from "@/components/tools/PlaceholderGenerator"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("gerador-placeholder")
export default function Page() {
  return <ToolLayout slug="gerador-placeholder" title="Gerador de Placeholder" description="Gere imagens placeholder coloridas para seus projetos com tamanho e cores personalizáveis."><PlaceholderGenerator /></ToolLayout>
}
