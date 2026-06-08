import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { UrlEncodeDecode } from "@/components/tools/UrlEncodeDecode"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("url-encode-decode")

export default function Page() {
  return (
    <ToolLayout
      slug="url-encode-decode"
      title="URL Encode/Decode"
      description="Codifique e decodifique URLs rapidamente."
    >
      <UrlEncodeDecode />
    </ToolLayout>
  )
}
