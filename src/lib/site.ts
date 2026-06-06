export const site = {
  name: "OraculoAI",
  shortName: "OraculoAI",
  slogan: "Construo, protejo e opero sua presença digital.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000",
  whatsappMessage:
    "Olá! Quero falar sobre desenvolvimento web, cybersecurity e/ou hospedagem. Pode me ajudar?",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "placeholder@example.com",
  location: "Atendimento remoto para Brasil e exterior",
  services: [
    {
      title: "Desenvolvimento Web",
      description:
        "Sites institucionais, landing pages e soluções sob medida para converter visitas em clientes.",
      bullets: ["Landing pages", "Sites institucionais", "Manutenção"],
      href: "/servicos/desenvolvimento-web",
    },
    {
      title: "Cybersecurity",
      description:
        "Hardening, auditoria e proteção prática para sites, servidores e operações digitais.",
      bullets: ["Hardening", "Auditoria", "Backup e monitoramento"],
      href: "/servicos/cybersecurity",
    },
    {
      title: "Domínios e Hospedagem",
      description:
        "Setup, migração e suporte gerenciado para domínio, DNS, e-mail e hospedagem.",
      bullets: ["Domínio", "Hospedagem", "Migração"],
      href: "/servicos/dominios-hospedagem",
    },
  ],
  trustPoints: [
    "Atendimento direto com o responsável técnico",
    "Comunicação rápida via WhatsApp",
    "Escopo claro e entrega objetiva",
  ],
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
