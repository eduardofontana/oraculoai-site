import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { PixGenerator } from "@/components/tools/PixGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-pix")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-pix"
      title="Gerador de Pix Copia e Cola"
      description="Gere código Pix copia e cola e QR Code Pix. Ferramenta local, sem intermediação de pagamento."
    >
      <PixGenerator />
    </ToolLayout>
  )
}
