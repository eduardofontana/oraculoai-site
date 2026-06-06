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
      title: "Criação de Sites",
      description:
        "Landing pages e sites institucionais com estética premium, clareza e foco em conversão.",
      bullets: ["Landing pages de alta conversão", "Sites institucionais", "Manutenção e otimização"],
      href: "/servicos/desenvolvimento-web",
      icon: "globe",
      highlight: "Sob medida para o seu negócio",
    },
    {
      title: "Revenda Hostinger",
      description:
        "Hospedagem, domínio, DNS e e-mail profissional com suporte gerenciado e preço de revenda.",
      bullets: ["Hospedagem com cPanel", "Domínio .com.br grátis", "Suporte técnico direto"],
      href: "/servicos/dominios-hospedagem",
      icon: "server",
      highlight: "Parceiro oficial Hostinger",
    },
    {
      title: "Cybersecurity",
      description:
        "Hardening, auditoria e proteção prática para sites, servidores e operações digitais.",
      bullets: ["Hardening de servidor", "Auditoria de vulnerabilidades", "Backup e monitoramento 24/7"],
      href: "/servicos/cybersecurity",
      icon: "shield",
      highlight: "Proteção sem complexidade",
    },
  ],
  hostingPlans: [
    {
      name: "Start",
      price: "R$ 39",
      period: "/mês",
      description: "Perfeito para landing pages e sites pessoais.",
      features: [
        "1 site",
        "10 GB SSD",
        "Domínio .com.br grátis (1 ano)",
        "5 contas de e-mail",
        "SSL grátis",
        "Suporte via WhatsApp",
      ],
      popular: false,
      cta: "Quero este plano",
    },
    {
      name: "Profissional",
      price: "R$ 79",
      period: "/mês",
      description: "Para negócios que precisam de performance e múltiplos sites.",
      popular: true,
      features: [
        "3 sites",
        "50 GB SSD",
        "Domínio .com.br grátis (1 ano)",
        "20 contas de e-mail",
        "SSL grátis",
        "Backup semanal",
        "Suporte prioritário WhatsApp",
      ],
      cta: "Quero este plano",
    },
    {
      name: "Enterprise",
      price: "R$ 149",
      period: "/mês",
      description: "Solução completa para agências e operações maiores.",
      features: [
        "10 sites",
        "200 GB NVMe",
        "Domínios ilimitados",
        "E-mails ilimitados",
        "SSL grátis",
        "Backup diário",
        "Migração assistida",
        "Suporte 24h WhatsApp",
      ],
      popular: false,
      cta: "Quero este plano",
    },
  ],
  portfolio: [
    {
      title: "Mendez Tech",
      desc: "Site institucional com blog e integração WhatsApp",
      tags: ["Next.js", "Tailwind", "Vercel"],
    },
    {
      title: "Barcelos Studio",
      desc: "Landing page premium para estúdio de design",
      tags: ["Next.js", "Framer Motion", "Hostinger"],
    },
    {
      title: "Oliva Digital",
      desc: "Portal corporativo com área de membros",
      tags: ["React", "Node.js", "cPanel"],
    },
  ],
  trustPoints: [
    "Atendimento direto com o responsável técnico",
    "Parceiro oficial Hostinger com preço de revenda",
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
        "Segurança e hospedagem tudo resolvido em um lugar. Economizei tempo e dinheiro com a consultoria completa.",
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
        "Não necessariamente. Cuidamos de tudo: registro de domínio, configuração de DNS, e-mail profissional e hospedagem via Hostinger com preço de revenda. Você só precisa trazer a ideia.",
    },
    {
      question: "Por que revenda Hostinger e não outra?",
      answer:
        "A Hostinger oferece o melhor custo-benefício do mercado: performance NVMe, cPanel intuitivo, suporte 24h e certificado SSL grátis. Como revendedor, você paga menos do que contratando direto.",
    },
    {
      question: "Como funciona o suporte depois da entrega?",
      answer:
        "Oferecemos manutenção estratégica com ajustes contínuos, backup e monitoramento. O suporte é via WhatsApp com resposta em até 24h em dias úteis.",
    },
    {
      question: "Fazem apenas sites ou também segurança?",
      answer:
        "Fazemos os três: criação de sites, hospedagem/domínio com revenda Hostinger e cybersecurity. É tudo no mesmo lugar com o mesmo responsável técnico.",
    },
  ],
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
