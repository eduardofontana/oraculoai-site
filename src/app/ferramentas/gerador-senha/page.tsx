import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { PasswordGenerator } from "@/components/tools/PasswordGenerator"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("gerador-senha")
export default function Page() {
  return <ToolLayout slug="gerador-senha" title="Gerador de Senha Forte" description="Gere senhas seguras com tamanho e tipos de caracteres configuráveis."><PasswordGenerator /></ToolLayout>
}
