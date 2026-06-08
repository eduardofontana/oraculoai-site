import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { HashGenerator } from "@/components/tools/HashGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-hash")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-hash"
      title="Gerador de Hash"
      description="Gere hashes MD5, SHA-1 e SHA-256 para qualquer texto."
    >
      <HashGenerator />
    </ToolLayout>
  )
}
