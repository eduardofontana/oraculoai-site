import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { ExifViewer } from "@/components/tools/ExifViewer"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("extrator-metadados-imagem")

export default function Page() {
  return (
    <ToolLayout
      slug="extrator-metadados-imagem"
      title="Extrator de Metadados de Imagem"
      description="Extraia metadados EXIF, IPTC e XMP de imagens como data da foto, modelo da câmera, coordenadas GPS, autor e muito mais."
    >
      <ExifViewer />
    </ToolLayout>
  )
}
