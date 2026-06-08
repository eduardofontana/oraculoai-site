import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { QrCodeGenerator } from "@/components/tools/QrCodeGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-qr-code")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-qr-code"
      title="Gerador de QR Code"
      description="Gere QR Codes a partir de texto ou URL. Baixe em PNG ou copie o conteúdo original."
    >
      <QrCodeGenerator />
    </ToolLayout>
  )
}
