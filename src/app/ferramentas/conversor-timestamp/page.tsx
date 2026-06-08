import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { TimestampConverter } from "@/components/tools/TimestampConverter"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("conversor-timestamp")
export default function Page() {
  return <ToolLayout slug="conversor-timestamp" title="Conversor de Timestamp" description="Converta timestamps Unix para data legível e vice-versa."><TimestampConverter /></ToolLayout>
}
