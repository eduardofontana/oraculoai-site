import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { RemoveAccents } from "@/components/tools/RemoveAccents"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("remover-acentos")
export default function Page() {
  return <ToolLayout slug="remover-acentos" title="Remover Acentos" description="Remova acentos e caracteres especiais de textos rapidamente."><RemoveAccents /></ToolLayout>
}
