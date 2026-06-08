import type { Metadata } from "next"
import { ToolCard } from "@/components/tools/ToolCard"
import { tools, categories } from "@/data/tools"

export const metadata: Metadata = {
  title: "Ferramentas Online Grátis | OraculoAI Cloud",
  description:
    "Use ferramentas rápidas para documentos, Pix, QR Code, texto, desenvolvimento, imagem e PDF. Tudo simples, leve e gratuito.",
}

export default function FerramentasPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
          Ferramentas online grátis
        </h1>
        <p className="mt-4 text-base leading-relaxed text-secondary">
          Use ferramentas rápidas para documentos, Pix, QR Code, texto,
          desenvolvimento, imagem e PDF. Tudo simples, leve e gratuito.
        </p>
      </div>

      <div className="mt-14 space-y-10">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="mb-4 font-display text-xl font-bold text-primary">
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools
                .filter((t) => t.category === category)
                .map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-border bg-card p-6 text-center text-sm leading-relaxed text-secondary md:p-8">
        <p>
          <strong className="text-primary">📌 Aviso importante:</strong> Todas as ferramentas desta página
          processam os dados <strong className="text-primary">exclusivamente no seu navegador</strong> (client-side).
          Nenhum texto, imagem, documento ou informação inserida é enviada, armazenada ou compartilhada
          conosco ou com terceiros.
        </p>
        <p className="mt-3">
          Este site não coleta, salva ou transmite nenhum dado pessoal inserido nas ferramentas.
          Todo o processamento é feito localmente, em sua máquina. Respeitamos a{" "}
          <strong className="text-primary">LGPD (Lei Geral de Proteção de Dados Pessoais)</strong> —
          seus dados permanecem sob seu controle o tempo todo.
        </p>
        <p className="mt-3 text-xs text-muted">
          As ferramentas são disponibilizadas para fins de estudo, pesquisa e utilidade geral.
          Não nos responsabilizamos pelo uso indevido ou pela precisão absoluta dos resultados gerados.
        </p>
      </div>
    </div>
  )
}
