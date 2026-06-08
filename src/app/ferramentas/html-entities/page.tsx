import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { HtmlEntities } from "@/components/tools/HtmlEntities"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("html-entities")
export default function Page() {
  return <ToolLayout slug="html-entities" title="HTML Entities" description="Codifique e decodifique entidades HTML."><HtmlEntities /></ToolLayout>
}
