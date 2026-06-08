import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { YamlJsonToml } from "@/components/tools/YamlJsonToml"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("conversor-yaml-json-toml")

export default function Page() {
  return (
    <ToolLayout
      slug="conversor-yaml-json-toml"
      title="Conversor YAML/JSON/TOML"
      description="Converta entre formatos de configuração YAML, JSON e TOML instantaneamente."
    >
      <YamlJsonToml />
    </ToolLayout>
  )
}
