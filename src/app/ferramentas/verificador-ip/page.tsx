import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { IpChecker } from "@/components/tools/IpChecker"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("verificador-ip")

export default function Page() {
  return (
    <ToolLayout
      slug="verificador-ip"
      title="Verificador de IP"
      description="Veja seu IP público e informações da sua conexão. Esta ferramenta consulta serviços externos para identificar o IP público."
    >
      <IpChecker />
    </ToolLayout>
  )
}
