export const site = {
  name: "Oráculo AI",
  shortName: "Oráculo AI",
  slogan: "Tecnologia, Hospedagem e Segurança Digital",
  heroSubtitle:
    "Hospedagem gerenciada, criação de sites, infraestrutura em nuvem, inteligência artificial e consultoria em cibersegurança com atendimento humano.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  whatsappMessage:
    "Olá! Quero saber mais sobre os planos e serviços da Oráculo AI.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  location: "Atendimento remoto para Brasil e exterior",
  services: [
    {
      title: "Criação de Sites",
      description:
        "Sites institucionais e landing pages com foco em performance e conversão.",
      bullets: ["Landing pages de alta conversão", "Sites institucionais", "Manutenção e otimização contínua"],
      href: "/servicos/desenvolvimento-web",
      icon: "globe",
      highlight: "Sob medida para o seu negócio",
    },
    {
      title: "Hospedagem Gerenciada",
      description:
        "Infraestrutura em nuvem com suporte técnico, migração assistida e monitoramento ativo.",
      bullets: ["Hospedagem cloud gerenciada", "Revenda de VPS e cloud", "Configuração de domínios e DNS"],
      href: "/servicos/dominios-hospedagem",
      icon: "server",
      highlight: "Parceiro tecnológico",
    },
    {
      title: "Consultoria em IA e Cibersegurança",
      description:
        "Inteligência artificial aplicada ao negócio e cibersegurança prática para proteger sua operação digital.",
      bullets: ["Consultoria em Inteligência Artificial", "Consultoria em Cibersegurança", "Monitoramento e manutenção de ambientes web"],
      href: "/servicos/consultoria",
      icon: "shield",
      highlight: "Inovação e proteção",
    },
  ],
  hostingPlans: [
    {
      name: "Profissional",
      price: "R$ 149,90",
      period: "/mês",
      annualPrice: "R$ 1.499",
      annualPeriod: "/ano",
      annualSavings: "Ganhe 2 meses grátis",
      description: "Ideal para profissionais liberais, pequenos negócios e sites institucionais que precisam de estabilidade, suporte humano e gerenciamento simplificado.",
      popular: false,
      features: [
        "1 site",
        "20 GB SSD NVMe",
        "Domínio .com.br grátis (1 ano)",
        "Certificado SSL grátis",
        "10 contas de e-mail",
        "Backup semanal",
        "Migração gratuita",
        "Suporte via WhatsApp",
        "Hospedagem gerenciada",
        "Monitoramento básico",
      ],
      cta: "Começar Agora",
    },
    {
      name: "Business",
      price: "R$ 299,90",
      period: "/mês",
      annualPrice: "R$ 2.999",
      annualPeriod: "/ano",
      annualSavings: "Ganhe 2 meses grátis",
      description: "Para empresas que dependem do ambiente online e precisam de performance, suporte prioritário e acompanhamento técnico.",
      popular: true,
      features: [
        "Até 5 sites",
        "100 GB SSD NVMe",
        "50 contas de e-mail",
        "Backup diário",
        "Monitoramento contínuo",
        "Migração assistida",
        "Suporte prioritário via WhatsApp",
        "Hospedagem gerenciada",
        "1h de suporte técnico/mês",
        "Orientação básica de segurança digital",
      ],
      cta: "Escolher Plano",
    },
    {
      name: "Enterprise",
      price: "R$ 599,90",
      period: "/mês",
      annualPrice: "R$ 5.999",
      annualPeriod: "/ano",
      annualSavings: "Ganhe 2 meses grátis",
      description: "Solução completa para empresas que exigem alta disponibilidade, suporte avançado e acompanhamento estratégico.",
      popular: false,
      features: [
        "Até 10 sites",
        "200 GB SSD NVMe",
        "E-mails ilimitados",
        "Backup diário",
        "Monitoramento avançado",
        "Migração completa",
        "Suporte prioritário",
        "Hospedagem gerenciada",
        "3h de suporte técnico/mês",
        "Consultoria mensal",
        "Orientação em cibersegurança",
        "Atendimento estratégico",
      ],
      cta: "Falar com Especialista",
    },
  ],
  differentials: [
    {
      title: "Atendimento Humano",
      description: "Fale diretamente com especialistas via WhatsApp. Sem filas e sem roteiros prontos.",
      icon: "headset",
    },
    {
      title: "Hospedagem Gerenciada",
      description: "Nós cuidamos da infraestrutura para você focar no seu negócio. Atualizações, segurança e performance sob nossa responsabilidade.",
      icon: "settings",
    },
    {
      title: "Segurança em Primeiro Lugar",
      description: "Boas práticas de proteção, monitoramento ativo e orientação especializada para manter seu ambiente digital seguro.",
      icon: "shield",
    },
    {
      title: "Suporte Técnico Especializado",
      description: "Auxílio real para DNS, e-mails, sites, WordPress, VPS e toda a infraestrutura. Resposta ágil e técnica de verdade.",
      icon: "headset",
    },
    {
      title: "Migração Sem Complicações",
      description: "Transferimos seu projeto sem dor de cabeça. Planejamento, execução e validação — tudo feito por nós.",
      icon: "zap",
    },
    {
      title: "Parceiro Tecnológico",
      description: "Muito além da hospedagem: desenvolvimento, automação, inteligência artificial e cibersegurança em um único lugar.",
      icon: "star",
    },
  ],
  portfolio: [
    {
      title: "Mendez Tech",
      desc: "Site institucional com blog e integração com WhatsApp",
      tags: ["Next.js", "Tailwind", "Vercel"],
    },
    {
      title: "Barcelos Studio",
      desc: "Landing page para estúdio de design",
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
    "Infraestrutura com parceiros de hospedagem",
    "Web, segurança e infraestrutura em um só lugar",
  ],
  testimonials: [
    {
      quote:
        "A Oráculo AI transformou nossa presença digital. O site ficou muito mais profissional e as conversas pelo WhatsApp aumentaram significativamente.",
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
        "Infraestrutura, segurança e hospedagem tudo resolvido em um lugar. Economizei tempo e dinheiro com a consultoria completa.",
      author: "Rafael Oliveira",
      role: "CTO, Oliva Digital",
    },
  ],
  faq: [
    {
      question: "Quanto tempo leva para migrar ou criar um site?",
      answer:
        "Landing pages simples ficam prontas em 3 a 7 dias úteis. Projetos mais complexos, como sites institucionais ou integrações, podem levar de 2 a 4 semanas. Migrações de hospedagem são feitas em até 48h sem downtime.",
    },
    {
      question: "Preciso ter conhecimentos técnicos para contratar?",
      answer:
        "Não. Nossa hospedagem é gerenciada — nós cuidamos da infraestrutura, segurança, atualizações e backups. Você só precisa se preocupar com o seu negócio.",
    },
    {
      question: "O que diferencia a Oráculo AI de uma hospedagem comum?",
      answer:
        "Não somos apenas hospedagem. Somos um parceiro tecnológico: criamos sites, gerenciamos infraestrutura em nuvem, oferecemos consultoria em IA e cibersegurança, com suporte humano direto via WhatsApp. Tudo em um só lugar com o mesmo responsável técnico.",
    },
    {
      question: "Como funciona o suporte técnico?",
      answer:
        "Suporte via WhatsApp com resposta ágil. Planos Business e Enterprise incluem horas de suporte técnico dedicadas por mês para resolver problemas, realizar ajustes e otimizar seu ambiente.",
    },
    {
      question: "Fazem apenas sites ou também segurança e IA?",
      answer:
        "Fazemos tudo: criação de sites, hospedagem gerenciada, revenda de VPS, consultoria em inteligência artificial e cibersegurança. É tudo no mesmo lugar com o mesmo responsável técnico.",
    },
  ],
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
