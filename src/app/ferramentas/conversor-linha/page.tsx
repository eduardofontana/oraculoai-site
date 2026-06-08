import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { LineConverter } from "@/components/tools/LineConverter"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("conversor-linha")
export default function Page() {
  return <ToolLayout slug="conversor-linha" title="Conversor de Linha" description="Converta quebras de linha entre CRLF, LF e CR."><LineConverter /></ToolLayout>
}
