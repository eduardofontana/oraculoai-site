import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { BarcodeGenerator } from "@/components/tools/BarcodeGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-codigo-barras")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-codigo-barras"
      title="Gerador de Código de Barras"
      description="Gere códigos de barras nos formatos Code 128, Code 39, EAN-13, EAN-8, UPC e ITF-14. Personalize cores, tamanho e baixe em SVG."
    >
      <BarcodeGenerator />
    </ToolLayout>
  )
}
