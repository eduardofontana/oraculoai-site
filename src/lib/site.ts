export const site = {
  name: "OraculoAI",
  shortName: "OraculoAI",
  slogan: "Presença digital premium que vende, protege e escala.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000",
  whatsappMessage:
    "Olá! Quero conversar sobre um projeto premium de web, segurança ou infraestrutura.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "placeholder@example.com",
  location: "Atendimento remoto para Brasil e exterior",
  services: [
    {
      title: "Desenvolvimento Web",
      description:
        "Landing pages e sites institucionais com estética premium, clareza e foco em conversão.",
      bullets: ["Landing pages", "Sites institucionais", "Manutenção estratégica"],
      href: "/servicos/desenvolvimento-web",
    },
    {
      title: "Cybersecurity",
      description:
        "Hardening, auditoria e proteção prática para sites, servidores e operações digitais.",
      bullets: ["Hardening", "Auditoria inicial", "Backup e monitoramento"],
      href: "/servicos/cybersecurity",
    },
    {
      title: "Domínios e Hospedagem",
      description:
        "Setup, migração e suporte gerenciado para domínio, DNS, e-mail e hospedagem.",
      bullets: ["Domínio", "DNS", "Migração assistida"],
      href: "/servicos/dominios-hospedagem",
    },
  ],
  trustPoints: [
    "Atendimento direto com o responsável técnico",
    "Escopo claro e resposta rápida via WhatsApp",
    "Web, segurança e infraestrutura em um só lugar",
  ],
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
