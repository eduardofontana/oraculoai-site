import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { SqlFormatter } from "@/components/tools/SqlFormatter"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("formatador-sql")

export default function Page() {
  return (
    <ToolLayout
      slug="formatador-sql"
      title="Formatador de SQL"
      description="Formate e minifique consultas SQL. Indentação inteligente com keywords em maiúsculas, suporte a comentários e strings literais."
    >
      <SqlFormatter />
    </ToolLayout>
  )
}
