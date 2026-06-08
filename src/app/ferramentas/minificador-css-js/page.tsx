import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { Minificador } from "@/components/tools/Minificador"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("minificador-css-js")

export default function Page() {
  return (
    <ToolLayout
      slug="minificador-css-js"
      title="Minificador CSS/JS"
      description="Minifique código CSS e JavaScript removendo espaços, comentários e caracteres desnecessários."
    >
      <Minificador />
    </ToolLayout>
  )
}
