import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { WebpConverter } from "@/components/tools/WebpConverter"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("conversor-webp")
export default function Page() {
  return <ToolLayout slug="conversor-webp" title="Conversor WebP" description="Converta imagens PNG e JPG para o formato WebP com qualidade ajustável."><WebpConverter /></ToolLayout>
}
