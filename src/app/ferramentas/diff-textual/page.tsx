import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { DiffTextual } from "@/components/tools/DiffTextual"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("diff-textual")
export default function Page() {
  return <ToolLayout slug="diff-textual" title="Diff Textual" description="Compare dois textos lado a lado e veja as diferenças destacadas linha a linha."><DiffTextual /></ToolLayout>
}
