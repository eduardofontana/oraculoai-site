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
  testimonials: [
    {
      quote:
        "A OraculoAI transformou nossa presença digital. O site ficou muito mais profissional e as conversas pelo WhatsApp aumentaram.",
      author: "Carlos Mendes",
      role: "CEO, Mendez Tech",
    },
    {
      quote:
        "Atendimento direto, sem burocracia. Em uma semana meu site estava no ar com uma aparência que parece de agência grande.",
      author: "Ana Barcelos",
      role: "Fundadora, Barcelos Studio",
    },
    {
      quote:
        "Contratei para um hardening de servidor e recebi uma consultoria completa. Segurança e hospedagem tudo resolvido em um lugar.",
      author: "Rafael Oliveira",
      role: "CTO, Oliva Digital",
    },
  ],
  faq: [
    {
      question: "Quanto tempo leva para ficar pronto?",
      answer:
        "Landing pages simples ficam prontas em 3 a 7 dias úteis. Projetos mais complexos, como sites institucionais ou integrações, podem levar de 2 a 4 semanas. O prazo é alinhado no primeiro contato.",
    },
    {
      question: "Preciso ter domínio e hospedagem?",
      answer:
        "Não necessariamente. Cuidamos de tudo: registro de domínio, configuração de DNS, e-mail profissional e hospedagem. Você só precisa trazer a ideia.",
    },
    {
      question: "Vocês atendem fora do Brasil?",
      answer:
        "Sim. Todo o atendimento é remoto via WhatsApp e e-mail. Já atendemos clientes em Portugal, EUA e América Latina.",
    },
    {
      question: "Como funciona o suporte depois da entrega?",
      answer:
        "Oferecemos manutenção estratégica com ajustes contínuos, backup e monitoramento. O suporte é via WhatsApp com resposta em até 24h em dias úteis.",
    },
    {
      question: "Fazem apenas sites ou também segurança?",
      answer:
        "Fazemos os três: desenvolvimento web, cybersecurity e infraestrutura (domínio, DNS, e-mail e hospedagem). É tudo no mesmo lugar com o mesmo responsável técnico.",
    },
  ],
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
