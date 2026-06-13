import type { MetadataRoute } from "next";

/**
 * Lista de slugs de ferramentas para incluir no sitemap.
 * Mantida manualmente para evitar scan dinâmico.
 */
const toolSlugs = [
  "analisador-frequencia-palavras",
  "base64",
  "calculadora-bytes",
  "calculadora-datas",
  "calculadora-financiamento",
  "calculadora-juros-compostos",
  "calculadora-porcentagem",
  "calculadora-subnet",
  "compressor-imagem",
  "contador-caracteres",
  "contador-silabas",
  "conversor-bases",
  "conversor-cores",
  "conversor-csv-json",
  "conversor-fuso-horario",
  "conversor-linha",
  "conversor-moedas",
  "conversor-timestamp",
  "conversor-unidades",
  "conversor-unidades-css",
  "conversor-webp",
  "conversor-yaml-json-toml",
  "cortar-imagem",
  "diff-json",
  "diff-textual",
  "extrator-metadados-imagem",
  "formatador-json",
  "formatador-sql",
  "gerador-cep",
  "gerador-cnh",
  "gerador-cnpj",
  "gerador-codigo-barras",
  "gerador-cpf",
  "gerador-css-gradient",
  "gerador-hash",
  "gerador-lorem-ipsum",
  "gerador-pis",
  "gerador-pix",
  "gerador-placeholder",
  "gerador-qr-code",
  "gerador-rg",
  "gerador-senha",
  "gerador-titulo-eleitor",
  "gerador-uuid",
  "html-entities",
  "imagem-para-pdf",
  "inspetor-user-agent",
  "inversor-texto",
  "jwt-decoder",
  "maiusculas-minusculas",
  "marca-dagua-imagem",
  "minificador-css-js",
  "numero-por-extenso",
  "redimensionar-imagem",
  "remover-acentos",
  "sorteador-aleatorio",
  "testador-regex",
  "texto-para-slug",
  "url-encode-decode",
  "validador-cartao",
  "validador-chave-pix",
  "validador-cnpj",
  "validador-cpf",
  "validador-pis",
  "validador-rg",
  "verificador-ip",
  "verificador-senha-vazada",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://oraculoai.cloud";

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/consultoria-ia`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/agentes-ia`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/ferramentas`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/sobre`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contato`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/servicos/desenvolvimento-web`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/servicos/dominios-hospedagem`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/servicos/consultoria`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/servicos/cybersecurity`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const toolPages = toolSlugs.map((slug) => ({
    url: `${baseUrl}/ferramentas/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...toolPages];
}
