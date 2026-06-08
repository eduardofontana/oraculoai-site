import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { UuidGenerator } from "@/components/tools/UuidGenerator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("gerador-uuid")

export default function Page() {
  return (
    <ToolLayout
      slug="gerador-uuid"
      title="Gerador de UUID"
      description="Gere UUIDs v4 para identificação única. Gere múltiplos UUIDs de uma vez."
    >
      <UuidGenerator />
    </ToolLayout>
  )
}
