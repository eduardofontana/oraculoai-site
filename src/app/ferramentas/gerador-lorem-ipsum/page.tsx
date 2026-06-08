import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { LoremIpsumGenerator } from "@/components/tools/LoremIpsumGenerator"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("gerador-lorem-ipsum")
export default function Page() {
  return <ToolLayout slug="gerador-lorem-ipsum" title="Gerador de Lorem Ipsum" description="Gere texto dummy Lorem Ipsum para layouts e designs."><LoremIpsumGenerator /></ToolLayout>
}
