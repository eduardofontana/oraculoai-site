import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CsvToJson } from "@/components/tools/CsvToJson"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("conversor-csv-json")

export default function Page() {
  return (
    <ToolLayout
      slug="conversor-csv-json"
      title="Conversor CSV para JSON"
      description="Converta dados CSV para JSON com detecção automática de delimitador. Suporta vírgula, ponto e vírgula, tabulação e pipe."
    >
      <CsvToJson />
    </ToolLayout>
  )
}
