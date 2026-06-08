import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { PixKeyValidator } from "@/components/tools/PixKeyValidator"
import type { Metadata } from "next"
export const metadata: Metadata = buildMetadata("validador-chave-pix")
export default function Page() {
  return <ToolLayout slug="validador-chave-pix" title="Validador de Chave Pix" description="Valide o formato de chaves Pix: CPF, CNPJ, e-mail, telefone ou chave aleatória."><PixKeyValidator /></ToolLayout>
}
