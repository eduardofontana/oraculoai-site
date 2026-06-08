import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { ColorConverter } from "@/components/tools/ColorConverter"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("conversor-cores")
export default function Page() {
  return <ToolLayout slug="conversor-cores" title="Conversor de Cores" description="Converta cores entre HEX, RGB e HSL."><ColorConverter /></ToolLayout>
}
