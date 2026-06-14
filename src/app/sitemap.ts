import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";

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

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/ferramentas/${tool.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...toolPages];
}
