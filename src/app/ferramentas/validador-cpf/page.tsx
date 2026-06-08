import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { CpfValidator } from "@/components/tools/CpfValidator"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("validador-cpf")

export default function Page() {
  return (
    <ToolLayout
      slug="validador-cpf"
      title="Validador de CPF"
      description="Valide se um CPF é matematicamente válido. Aceita CPF com ou sem pontuação e rejeita sequências repetidas."
    >
      <CpfValidator />
    </ToolLayout>
  )
}
