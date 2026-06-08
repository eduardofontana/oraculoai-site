import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { SyllableCounter } from "@/components/tools/SyllableCounter"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("contador-silabas")
export default function Page() {
  return <ToolLayout slug="contador-silabas" title="Contador de Sílabas" description="Conte o número de sílabas em palavras e frases."><SyllableCounter /></ToolLayout>
}
