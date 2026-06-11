import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CssUnitConverter } from "@/components/tools/CssUnitConverter"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("conversor-unidades-css")

export default function Page() {
  return (
    <ToolLayout
      slug="conversor-unidades-css"
      title="Conversor de Unidades CSS"
      description="Converta entre unidades CSS: pixels (px), rem, em, porcentagem (%), viewport width (vw) e viewport height (vh). Configure o tamanho base da fonte e viewport."
    >
      <CssUnitConverter />
    </ToolLayout>
  )
}
