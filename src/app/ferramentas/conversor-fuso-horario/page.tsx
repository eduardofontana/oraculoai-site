import { buildMetadata, ToolLayout } from "@/components/tools/ToolLayout"
import { FusoHorarioConverter } from "@/components/tools/FusoHorarioConverter"
import type { Metadata } from "next"

export const metadata: Metadata = buildMetadata("conversor-fuso-horario")

export default function Page() {
  return (
    <ToolLayout
      slug="conversor-fuso-horario"
      title="Conversor de Fuso Horário"
      description="Converta datas e horários entre fusos de qualquer lugar do mundo. Todos os fusos suportados pelo navegador com detecção automática."
    >
      <FusoHorarioConverter />
    </ToolLayout>
  )
}
