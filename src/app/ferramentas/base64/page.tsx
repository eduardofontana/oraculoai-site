import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { Base64Tool } from "@/components/tools/Base64Tool"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("base64")

export default function Page() {
  return (
    <ToolLayout
      slug="base64"
      title="Base64 Encode/Decode"
      description="Codifique e decodifique textos em Base64 rapidamente."
    >
      <Base64Tool />
    </ToolLayout>
  )
}
