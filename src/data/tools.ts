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
  {
    title: "Gerador de CNH",
    slug: "gerador-cnh",
    category: "Documentos Brasil",
    description: "Gere números de CNH fictícios para testes.",
    keywords: ["cnh", "gerador cnh", "documentos", "testes"],
  },
  {
    title: "Gerador de CEP",
    slug: "gerador-cep",
    category: "Documentos Brasil",
    description: "Gere CEPs aleatórios com dados de endereço simulados.",
    keywords: ["cep", "endereço", "gerador cep"],
  },
  {
    title: "Validador de Cartão de Crédito",
    slug: "validador-cartao",
    category: "Documentos Brasil",
    description: "Valide números de cartão de crédito pelo algoritmo de Luhn.",
    keywords: ["cartão", "crédito", "validador", "luhn"],
  },
  {
    title: "Validador de Chave Pix",
    slug: "validador-chave-pix",
    category: "Pagamentos",
    description: "Valide o formato de chaves Pix: CPF, CNPJ, e-mail, telefone ou aleatória.",
    keywords: ["pix", "chave pix", "validador", "pagamento"],
  },
  {
    title: "Diff Textual",
    slug: "diff-textual",
    category: "Texto",
    description: "Compare dois textos lado a lado e veja as diferenças.",
    keywords: ["diff", "comparar", "texto", "diferenças"],
  },
  {
    title: "Remover Acentos",
    slug: "remover-acentos",
    category: "Texto",
    description: "Remova acentos e caracteres especiais de textos.",
    keywords: ["acentos", "normalizar", "texto", "remover"],
  },
  {
    title: "Inversor de Texto",
    slug: "inversor-texto",
    category: "Texto",
    description: "Inverta a ordem dos caracteres ou palavras de um texto.",
    keywords: ["inverter", "texto", "reverso", "palavras"],
  },
  {
    title: "Contador de Sílabas",
    slug: "contador-silabas",
    category: "Texto",
    description: "Conte o número de sílabas em palavras e frases.",
    keywords: ["sílabas", "contador", "palavras", "poesia"],
  },
  {
    title: "Gerador de Senha Forte",
    slug: "gerador-senha",
    category: "Desenvolvimento",
    description: "Gere senhas seguras com tamanho e tipos configuráveis.",
    keywords: ["senha", "segurança", "gerador", "password"],
  },
  {
    title: "Conversor de Cores",
    slug: "conversor-cores",
    category: "Desenvolvimento",
    description: "Converta cores entre HEX, RGB e HSL.",
    keywords: ["cores", "hex", "rgb", "hsl", "conversor"],
  },
  {
    title: "Inspetor de User-Agent",
    slug: "inspetor-user-agent",
    category: "Desenvolvimento",
    description: "Veja informações detalhadas do seu navegador e sistema.",
    keywords: ["user-agent", "navegador", "browser", "inspecionar"],
  },
  {
    title: "Conversor de Timestamp",
    slug: "conversor-timestamp",
    category: "Desenvolvimento",
    description: "Converta timestamps Unix para data legível e vice-versa.",
    keywords: ["timestamp", "unix", "data", "conversor"],
  },
  {
    title: "JWT Decoder",
    slug: "jwt-decoder",
    category: "Codificação",
    description: "Decodifique o payload de um JWT sem verificar a assinatura.",
    keywords: ["jwt", "token", "decodificar", "payload"],
  },
  {
    title: "HTML Entities",
    slug: "html-entities",
    category: "Codificação",
    description: "Codifique e decodifique entidades HTML.",
    keywords: ["html", "entities", "encode", "decode"],
  },
  {
    title: "Conversor de Linha",
    slug: "conversor-linha",
    category: "Texto",
    description: "Converta quebras de linha entre CRLF, LF e CR.",
    keywords: ["linha", "crlf", "lf", "cr", "quebra"],
  },
  {
    title: "Redimensionar Imagem",
    slug: "redimensionar-imagem",
    category: "Imagem",
    description: "Redimensione imagens PNG e JPG diretamente no navegador.",
    keywords: ["imagem", "redimensionar", "resize", "png", "jpg"],
  },
  {
    title: "Conversor WebP",
    slug: "conversor-webp",
    category: "Imagem",
    description: "Converta imagens PNG e JPG para o formato WebP.",
    keywords: ["webp", "imagem", "conversor", "png", "jpg"],
  },
  {
    title: "Gerador de Placeholder",
    slug: "gerador-placeholder",
    category: "Imagem",
    description: "Gere imagens placeholder coloridas para seus projetos.",
    keywords: ["placeholder", "imagem", "gerador", "design"],
  },
  {
    title: "Conversor de Unidades",
    slug: "conversor-unidades",
    category: "Utilitários",
    description: "Converta unidades de comprimento, peso, temperatura e dados.",
    keywords: ["unidades", "conversor", "comprimento", "peso", "temperatura"],
  },
  {
    title: "Calculadora de Bytes",
    slug: "calculadora-bytes",
    category: "Utilitários",
    description: "Converta entre bytes, KB, MB, GB e TB.",
    keywords: ["bytes", "kb", "mb", "gb", "armazenamento"],
  },
  {
    title: "Gerador de Lorem Ipsum",
    slug: "gerador-lorem-ipsum",
    category: "Utilitários",
    description: "Gere texto dummy Lorem Ipsum para layouts e designs.",
    keywords: ["lorem", "ipsum", "texto", "dummy", "placeholder"],
  },
  {
    title: "Verificador de IP",
    slug: "verificador-ip",
    category: "Utilitários",
    description: "Veja seu IP público e informações de conexão.",
    keywords: ["ip", "rede", "conexão", "internet"],
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
