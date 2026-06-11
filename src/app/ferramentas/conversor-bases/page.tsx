import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { BaseConverter } from "@/components/tools/BaseConverter"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("conversor-bases")

export default function Page() {
  return (
    <ToolLayout
      slug="conversor-bases"
      title="Conversor de Bases Numéricas"
      description="Converta números entre binário (base 2), octal (base 8), decimal (base 10) e hexadecimal (base 16). Suporta números de qualquer tamanho."
    >
      <BaseConverter />
    </ToolLayout>
  )
}
