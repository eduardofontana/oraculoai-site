import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CssGradient } from "@/components/tools/CssGradient"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-css-gradient")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-css-gradient"
      title="Gerador de CSS Gradient"
      description="Crie gradientes CSS personalizados: linear, radial e cônico. Visualize em tempo real e copie o código com um clique."
    >
      <CssGradient />
    </ToolLayout>
  )
}
