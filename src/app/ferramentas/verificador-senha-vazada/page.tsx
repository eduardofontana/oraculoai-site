import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { PwnedPasswordChecker } from "@/components/tools/PwnedPasswordChecker"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("verificador-senha-vazada")

export default function Page() {
  return (
    <ToolLayout
      slug="verificador-senha-vazada"
      title="Verificador de Senha Vazada"
      description="Descubra se sua senha já foi exposta em vazamentos de dados. Consulta anônima e segura usando o modelo k-anonymity do Have I Been Pwned — sua senha nunca sai do navegador."
    >
      <PwnedPasswordChecker />
    </ToolLayout>
  )
}
