import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { Watermark } from "@/components/tools/Watermark"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("marca-dagua-imagem")

export default function Page() {
  return (
    <ToolLayout
      slug="marca-dagua-imagem"
      title="Adicionar Marca d'Água em Imagem"
      description="Adicione marcas d'água personalizadas em imagens diretamente no navegador. Escolha texto, posição e opacidade."
    >
      <Watermark />
    </ToolLayout>
  )
}
