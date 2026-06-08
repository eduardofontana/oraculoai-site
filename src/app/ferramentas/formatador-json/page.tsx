import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { JsonFormatter } from "@/components/tools/JsonFormatter"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("formatador-json")

export default function Page() {
  return (
    <ToolLayout
      slug="formatador-json"
      title="Formatador de JSON"
      description="Formate, valide e minifique JSON. Copie o resultado formatado ou minificado."
    >
      <JsonFormatter />
    </ToolLayout>
  )
}
