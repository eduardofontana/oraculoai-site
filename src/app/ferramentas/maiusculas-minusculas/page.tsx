import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CaseConverter } from "@/components/tools/CaseConverter"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("maiusculas-minusculas")

export default function Page() {
  return (
    <ToolLayout
      slug="maiusculas-minusculas"
      title="Conversor Maiúsculas/Minúsculas"
      description="Converta textos entre maiúsculas, minúsculas, capitalizado e formato título."
    >
      <CaseConverter />
    </ToolLayout>
  )
}
