import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { ImageCompressor } from "@/components/tools/ImageCompressor"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("compressor-imagem")

export default function Page() {
  return (
    <ToolLayout
      slug="compressor-imagem"
      title="Compressor de Imagem"
      description="Comprima e redimensione imagens PNG, JPG e WebP diretamente no navegador. Controle qualidade, dimensões e formato de saída."
    >
      <ImageCompressor />
    </ToolLayout>
  )
}
