import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { JwtDecoder } from "@/components/tools/JwtDecoder"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("jwt-decoder")
export default function Page() {
  return <ToolLayout slug="jwt-decoder" title="JWT Decoder" description="Decodifique o payload de um JWT sem verificar a assinatura."><JwtDecoder /></ToolLayout>
}
