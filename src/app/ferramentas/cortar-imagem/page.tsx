import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CortarImagem } from "@/components/tools/CortarImagem"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("cortar-imagem")

export default function Page() {
  return (
    <ToolLayout
      slug="cortar-imagem"
      title="Cortar Imagem"
      description="Faça upload de uma imagem e corte (crop) a área desejada diretamente no navegador."
    >
      <CortarImagem />
    </ToolLayout>
  )
}
