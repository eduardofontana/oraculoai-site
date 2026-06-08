import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { RegexTester } from "@/components/tools/RegexTester"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("testador-regex")

export default function Page() {
  return (
    <ToolLayout
      slug="testador-regex"
      title="Testador de Expressões Regulares"
      description="Teste e depure expressões regulares em tempo real com highlight de matches."
    >
      <RegexTester />
    </ToolLayout>
  )
}
