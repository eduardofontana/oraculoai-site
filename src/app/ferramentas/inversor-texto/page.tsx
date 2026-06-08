import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { TextInverter } from "@/components/tools/TextInverter"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("inversor-texto")
export default function Page() {
  return <ToolLayout slug="inversor-texto" title="Inversor de Texto" description="Inverta a ordem dos caracteres ou palavras de um texto."><TextInverter /></ToolLayout>
}
