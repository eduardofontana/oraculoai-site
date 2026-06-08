export interface Tool {
  title: string
  slug: string
  category: string
  description: string
  keywords: string[]
}

export const tools: Tool[] = [
  {
    title: "Gerador de CPF",
    slug: "gerador-cpf",
    category: "Documentos Brasil",
    description: "Gere CPFs válidos para testes de sistemas.",
    keywords: ["cpf", "gerador cpf", "documentos", "testes"],
  },
  {
    title: "Validador de CPF",
    slug: "validador-cpf",
    category: "Documentos Brasil",
    description: "Valide se um CPF é matematicamente válido.",
    keywords: ["cpf", "validador cpf", "documentos"],
  },
  {
    title: "Gerador de CNPJ",
    slug: "gerador-cnpj",
    category: "Documentos Brasil",
    description: "Gere CNPJs válidos para testes de sistemas.",
    keywords: ["cnpj", "gerador cnpj", "documentos", "testes"],
  },
  {
    title: "Validador de CNPJ",
    slug: "validador-cnpj",
    category: "Documentos Brasil",
    description: "Valide se um CNPJ é matematicamente válido.",
    keywords: ["cnpj", "validador cnpj", "documentos"],
  },
  {
    title: "Gerador de QR Code",
    slug: "gerador-qr-code",
    category: "Codificação",
    description: "Gere QR Codes a partir de texto ou URL.",
    keywords: ["qr code", "qrcode", "gerador", "codificação"],
  },
  {
    title: "Gerador de Pix Copia e Cola",
    slug: "gerador-pix",
    category: "Pagamentos",
    description: "Gere código Pix copia e cola e QR Code Pix.",
    keywords: ["pix", "copia e cola", "qr code pix", "pagamento"],
  },
  {
    title: "Formatador de JSON",
    slug: "formatador-json",
    category: "Desenvolvimento",
    description: "Formate, valide e minifique JSON.",
    keywords: ["json", "formatador", "validador", "minificar"],
  },
  {
    title: "Base64 Encode/Decode",
    slug: "base64",
    category: "Codificação",
    description: "Codifique e decodifique textos em Base64.",
    keywords: ["base64", "encode", "decode", "codificação"],
  },
  {
    title: "URL Encode/Decode",
    slug: "url-encode-decode",
    category: "Codificação",
    description: "Codifique e decodifique URLs.",
    keywords: ["url", "encode", "decode", "codificação"],
  },
  {
    title: "Gerador de UUID",
    slug: "gerador-uuid",
    category: "Desenvolvimento",
    description: "Gere UUIDs v4 para identificação única.",
    keywords: ["uuid", "gerador", "identificador"],
  },
  {
    title: "Gerador de Hash",
    slug: "gerador-hash",
    category: "Desenvolvimento",
    description: "Gere hashes MD5, SHA-1 e SHA-256.",
    keywords: ["hash", "md5", "sha1", "sha256", "criptografia"],
  },
  {
    title: "Contador de Caracteres",
    slug: "contador-caracteres",
    category: "Texto",
    description: "Conte caracteres, palavras, linhas e parágrafos.",
    keywords: ["contador", "caracteres", "palavras", "texto"],
  },
  {
    title: "Conversor Maiúsculas/Minúsculas",
    slug: "maiusculas-minusculas",
    category: "Texto",
    description: "Converta textos entre maiúsculas, minúsculas, capitalizado e título.",
    keywords: ["maiúsculas", "minúsculas", "conversor", "texto"],
  },
  {
    title: "Texto para Slug",
    slug: "texto-para-slug",
    category: "Texto",
    description: "Converta textos em slugs amigáveis para URLs.",
    keywords: ["slug", "url", "texto", "conversor"],
  },
  {
    title: "Imagem para PDF",
    slug: "imagem-para-pdf",
    category: "Imagem",
    description: "Converta imagens PNG e JPG em PDF.",
    keywords: ["imagem", "pdf", "conversor", "png", "jpg"],
  },
]

export const categories = Array.from(new Set(tools.map((t) => t.category)))

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}

export function getRelatedTools(slug: string, count = 3): Tool[] {
  const tool = getToolBySlug(slug)
  if (!tool) return []
  return tools
    .filter((t) => t.slug !== slug && t.category === tool.category)
    .slice(0, count)
}
