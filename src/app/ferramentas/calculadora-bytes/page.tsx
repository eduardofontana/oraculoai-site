import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { ByteCalculator } from "@/components/tools/ByteCalculator"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("calculadora-bytes")
export default function Page() {
  return <ToolLayout slug="calculadora-bytes" title="Calculadora de Bytes" description="Converta entre bytes, KB, MB, GB e TB."><ByteCalculator /></ToolLayout>
}
