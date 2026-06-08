import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { ImageToPdf } from "@/components/tools/ImageToPdf"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("imagem-para-pdf")

export default function Page() {
  return (
    <ToolLayout
      slug="imagem-para-pdf"
      title="Conversor PNG/JPG para PDF"
      description="Converta imagens PNG e JPG em PDF diretamente no navegador. Suporta até 10 imagens."
    >
      <ImageToPdf />
    </ToolLayout>
  )
}
