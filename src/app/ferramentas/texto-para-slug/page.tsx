import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { SlugGenerator } from "@/components/tools/SlugGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("texto-para-slug")

export default function Page() {
  return (
    <ToolLayout
      slug="texto-para-slug"
      title="Texto para Slug"
      description="Converta textos em slugs amigáveis para URLs com opção de hífen ou underline."
    >
      <SlugGenerator />
    </ToolLayout>
  )
}
