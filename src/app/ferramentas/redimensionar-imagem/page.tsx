import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { ImageResizer } from "@/components/tools/ImageResizer"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("redimensionar-imagem")
export default function Page() {
  return <ToolLayout slug="redimensionar-imagem" title="Redimensionar Imagem" description="Redimensione imagens PNG e JPG diretamente no navegador."><ImageResizer /></ToolLayout>
}
