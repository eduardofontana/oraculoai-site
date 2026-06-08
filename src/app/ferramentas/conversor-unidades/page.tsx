import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { UnitConverter } from "@/components/tools/UnitConverter"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("conversor-unidades")
export default function Page() {
  return <ToolLayout slug="conversor-unidades" title="Conversor de Unidades" description="Converta unidades de comprimento, peso, temperatura e dados."><UnitConverter /></ToolLayout>
}
