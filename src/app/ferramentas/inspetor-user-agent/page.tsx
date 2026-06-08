import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { UserAgentInspector } from "@/components/tools/UserAgentInspector"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("inspetor-user-agent")
export default function Page() {
  return <ToolLayout slug="inspetor-user-agent" title="Inspetor de User-Agent" description="Veja informações detalhadas do seu navegador, sistema e tela."><UserAgentInspector /></ToolLayout>
}
