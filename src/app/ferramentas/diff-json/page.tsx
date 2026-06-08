import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { DiffJson } from "@/components/tools/DiffJson"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("diff-json")

export default function Page() {
  return (
    <ToolLayout
      slug="diff-json"
      title="Diff JSON"
      description="Compare dois JSONs lado a lado e veja as diferenças (adicionado, removido, modificado)."
    >
      <DiffJson />
    </ToolLayout>
  )
}
