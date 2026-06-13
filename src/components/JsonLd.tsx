type JsonLdProps = {
  schema: Record<string, unknown>;
};

/**
 * Renderiza JSON-LD com proteção contra XSS via injection de </script>.
 * JSON.stringify não escapa `<` ou `>`, então uma env var maliciosa
 * como `</script><script>alert(1)</script>` quebraria o script tag.
 * A substituição de `<` por `\\u003c` elimina esse risco.
 */
export function JsonLd({ schema }: JsonLdProps) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

/**
 * Schema Organization padrão para todas as páginas.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OráculoAI",
    url: "https://oraculoai.cloud",
    logo: "https://oraculoai.cloud/favicon.ico",
    description:
      "IA aplicada para gerar resultados reais no seu negócio. Agentes de IA, automações inteligentes e soluções corporativas.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
      contactType: "sales",
      availableLanguage: ["Portuguese", "English"],
    },
    sameAs: [],
  };
}

/**
 * Schema WebSite para a página inicial.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OráculoAI",
    url: "https://oraculoai.cloud",
    description:
      "IA aplicada para gerar resultados reais no seu negócio.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://oraculoai.cloud/ferramentas?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}
