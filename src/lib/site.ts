export const site = {
  name: "OráculoAI",
  shortName: "Oráculo AI",
  slogan: "Transformação digital impulsionada por Inteligência Artificial",
  heroSubtitle:
    "Criamos agentes de IA, automatizamos processos e construímos soluções digitais que encaixam no que sua empresa precisa. Sem complicação, sem promessa vazia — é tecnologia feita com cuidado pra gerar resultado de verdade.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  location: "Atendimento remoto para Brasil e exterior",
  services: [
    {
      title: "Criação de Sites",
      description:
        "Landing pages e sites institucionais que passam profissionalismo — e ajudam a transformar visita em cliente.",
      bullets: ["Landing pages feitas pra converter", "Sites institucionais com a cara do seu negócio", "Manutenção e otimização contínua"],
      href: "/servicos/desenvolvimento-web",
      icon: "globe",
      highlight: "Feito sob medida pra você",
    },
    {
      title: "Hospedagem Gerenciada",
      description:
        "Infraestrutura em nuvem com acompanhamento próximo, migração tranquila e monitoramento que não dorme no ponto.",
      bullets: ["Hospedagem cloud gerenciada", "Revenda de VPS e cloud", "Configuração de domínios e DNS"],
      href: "/servicos/dominios-hospedagem",
      icon: "server",
      highlight: "Parceiro tecnológico",
    },
    {
      title: "Consultoria em IA e Cibersegurança",
      description:
        "IA aplicada ao seu negócio, do jeito certo. Segurança prática pra proteger sua operação digital.",
      bullets: ["Consultoria em Inteligência Artificial", "Consultoria em Cibersegurança", "Monitoramento e manutenção de ambientes web"],
      href: "/servicos/consultoria",
      icon: "shield",
      highlight: "Inovação e proteção",
    },
  ],
  iaServices: [
    {
      title: "Consultoria em IA",
      description: "Sentamos com você, entendemos seu negócio e mapeamos onde a inteligência artificial pode gerar mais impacto.",
      bullets: ["Mapeamento de processos que podem ser automatizados", "Estratégia de IA que cabe no seu bolso", "ROI e viabilidade técnica sem enrolação"],
      href: "/consultoria-ia",
      icon: "brain",
      highlight: "Estratégia que funciona",
    },
    {
      title: "Agentes de IA",
      description: "Assistentes inteligentes feitos sob medida pra automatizar tarefas, atender clientes e dar aquele gás no dia a dia.",
      bullets: ["Assistentes virtuais que entendem do seu negócio", "Automação de tarefas repetitivas", "Integração com os sistemas que você já usa"],
      href: "/agentes-ia",
      icon: "bot",
      highlight: "Seu novo assistente",
    },
    {
      title: "Automação com IA",
      description: "Cansaço de tarefa manual repetitiva? A gente automatiza fluxos inteiros. Você ganha tempo pro que realmente importa.",
      bullets: ["Fluxos de trabalho automatizados", "Processamento inteligente de documentos", "Integração entre sistemas sem estresse"],
      href: "/consultoria-ia",
      icon: "zap",
      highlight: "Menos trabalho manual",
    },
    {
      title: "Chatbots Inteligentes",
      description: "Chatbots com IA que atendem seus clientes com naturalidade — 24 horas por dia, 7 dias por semana.",
      bullets: ["Atendimento automático com toque humano", "FAQ inteligente que resolve antes de perguntar", "Captura de leads qualificados"],
      href: "/agentes-ia",
      icon: "message-circle",
      highlight: "Atendimento 24/7",
    },
    {
      title: "RAG com OpenAI",
      description: "Seus documentos, manuais e bases de conhecimento viram respostas rápidas e precisas — como ter um especialista disponível o tempo todo.",
      bullets: ["Base de conhecimento corporativa sempre acessível", "Busca inteligente nos seus documentos", "Respostas com fonte — você sabe de onde veio"],
      href: "/consultoria-ia",
      icon: "search",
      highlight: "Conhecimento na ponta dos dedos",
    },
    {
      title: "Cloud Security",
      description: "Proteção de verdade pro seu ambiente digital. A gente cuida da segurança e você dorme tranquilo.",
      bullets: ["Segurança em nuvem sem complicação", "Gestão de identidade e acesso", "Proteção de dados que inspira confiança"],
      href: "/servicos/consultoria",
      icon: "shield",
      highlight: "Dormir tranquilo",
    },
  ],
  iaBenefits: [
    {
      title: "Menos gasto, mais resultado",
      description: "Automatizamos processos repetitivos. Você reduz custos sem perder qualidade.",
      icon: "trending-down",
    },
    {
      title: "Trabalho que não para",
      description: "Fluxos inteligentes funcionando 24/7 — enquanto você dorme, seu negócio continua produzindo.",
      icon: "zap",
    },
    {
      title: "Atendimento que encanta",
      description: "Chatbots e assistentes que resolvem problemas com agilidade digital e toque humano.",
      icon: "message-circle",
    },
    {
      title: "Decisões mais seguras",
      description: "Insights extraídos dos seus dados pra você decidir com mais confiança.",
      icon: "bar-chart",
    },
    {
      title: "Segurança que acompanha o crescimento",
      description: "Infraestrutura protegida que se adapta ao tamanho do seu negócio. Sem sustos.",
      icon: "shield",
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
      description: "Pra profissionais liberais, pequenos negócios e sites institucionais que precisam de estabilidade sem complicação.",
      popular: false,
      features: [
        "1 site",
        "20 GB SSD NVMe",
        "Domínio .com.br grátis (1 ano)",
        "Certificado SSL grátis",
        "10 contas de e-mail",
        "Backup semanal",
        "Migração gratuita",
        "Suporte humanizado por e-mail",
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
      description: "Pra empresas que vivem online e precisam de performance de verdade, com suporte próximo e acompanhamento técnico.",
      popular: true,
      features: [
        "Até 5 sites",
        "100 GB SSD NVMe",
        "50 contas de e-mail",
        "Backup diário",
        "Monitoramento contínuo",
        "Migração assistida",
        "Suporte prioritário por e-mail",
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
      description: "Solução completa pra empresas que exigem alta disponibilidade, suporte de verdade e acompanhamento estratégico.",
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
      cta: "Solicitar Proposta",
    },
  ],
  differentials: [
    {
      title: "Atendimento Humano de Verdade",
      description: "Você fala direto com quem faz. Sem robô, sem menu de opções, sem esperar.",
      icon: "headset",
    },
    {
      title: "Hospedagem Gerenciada",
      description: "A gente cuida de tudo: atualizações, segurança e performance. Você só precisa cuidar do seu negócio.",
      icon: "settings",
    },
    {
      title: "Segurança em Primeiro Lugar",
      description: "Monitoramento ativo, boas práticas de proteção e orientação especializada pro seu ambiente ficar seguro.",
      icon: "shield",
    },
    {
      title: "Suporte Técnico de Verdade",
      description: "Ajuda real com DNS, e-mail, sites, WordPress, VPS — resposta rápida de quem entende.",
      icon: "headset",
    },
    {
      title: "Migração Sem Complicação",
      description: "Passamos seu projeto de lugar sem dor de cabeça. Planejamos, executamos, validamos — você só acompanha.",
      icon: "zap",
    },
    {
      title: "Parceiro Tecnológico",
      description: "Mais que hospedagem: desenvolvimento, automação, inteligência artificial e segurança tudo num lugar só.",
      icon: "star",
    },
  ],
  portfolio: [
    {
      title: "Mendez Tech",
      desc: "Site institucional com blog e presença digital profissional",
      tags: ["Next.js", "Tailwind", "Vercel"],
    },
    {
      title: "Barcelos Studio",
      desc: "Landing page que transmitiu a personalidade do estúdio",
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
        "O site ficou muito mais profissional e a diferença apareceu nas conversas com clientes. Recomendo.",
      author: "Carlos Mendes",
      role: "CEO, Mendez Tech",
    },
    {
      quote:
        "Atendimento direto, sem burocracia. Em uma semana meu site estava no ar com uma cara de agência grande.",
      author: "Ana Barcelos",
      role: "Fundadora, Barcelos Studio",
    },
    {
      quote:
        "Infraestrutura, segurança e hospedagem resolvidos em um lugar só. Economizei tempo e dinheiro.",
      author: "Rafael Oliveira",
      role: "CTO, Oliva Digital",
    },
  ],
  consultoriaIAFaq: [
    {
      question: "O que é consultoria em IA?",
      answer: "Um serviço de diagnóstico e planejamento pra descobrir onde a inteligência artificial pode ajudar no seu negócio. Desde automatizar tarefas até criar agentes inteligentes.",
    },
    {
      question: "Preciso ter time de tecnologia pra contratar?",
      answer: "Nem pensar. A gente faz o diagnóstico, o planejamento e a implementação. Você só precisa contar seus desafios.",
    },
    {
      question: "Quanto tempo leva uma implementação de IA?",
      answer: "Depende. Projetos mais simples saem em dias. Os mais complexos podem levar algumas semanas. Isso fica claro no diagnóstico inicial.",
    },
    {
      question: "Quais tipos de IA vocês implementam?",
      answer: "Agentes de IA, chatbots inteligentes, sistemas de busca em documentos (RAG), automação de processos e integrações com OpenAI e outras plataformas.",
    },
    {
      question: "Como funciona o diagnóstico gratuito?",
      answer: "A gente marca uma conversa rápida pra entender seu negócio e mapear desafios e oportunidades. Depois devolvemos um plano com as melhores soluções pro seu caso.",
    },
  ],
  agentesIAFaq: [
    {
      question: "O que são agentes de IA?",
      answer: "Sistemas inteligentes que executam tarefas de forma autônoma: atendem clientes, processam dados, integram sistemas e automatizam fluxos de trabalho.",
    },
    {
      question: "Qual a diferença entre chatbot e agente de IA?",
      answer: "Chatbot foca em conversa. Agente de IA vai além: executa ações, toma decisões, acessa sistemas e orquestra processos completos.",
    },
    {
      question: "Meus dados ficam seguros?",
      answer: "Sim. Trabalhamos com criptografia, controle de acesso e boas práticas de segurança. Os dados podem ficar em estrutura própria ou nuvem, como você preferir.",
    },
    {
      question: "Os agentes integram com meus sistemas atuais?",
      answer: "Sim. Integramos com APIs, CRMs, ERPs, bancos de dados, e-mail e praticamente qualquer sistema com interface aberta.",
    },
    {
      question: "Preciso treinar o agente?",
      answer: "A gente treina com seus dados e processos. Você só valida os resultados. E oferecemos suporte contínuo pra ajustes e melhorias.",
    },
  ],
  faq: [
    {
      question: "Quanto tempo leva pra criar ou migrar um site?",
      answer:
        "Landing pages simples ficam prontas entre 3 a 7 dias úteis. Projetos mais completos, como sites institucionais ou com integrações, levam de 2 a 4 semanas. Migrações de hospedagem são feitas em até 48h sem parar o site.",
    },
    {
      question: "Preciso ter conhecimento técnico pra contratar?",
      answer:
        "Não. A hospedagem é gerenciada — a gente cuida da infraestrutura, segurança, atualizações e backups. Você foca no seu negócio.",
    },
    {
      question: "O que torna a Oráculo AI diferente de uma hospedagem comum?",
      answer:
        "Não somos só hospedagem. Somos parceiros: criamos sites, gerenciamos infraestrutura em nuvem, oferecemos consultoria em IA e cibersegurança. E o atendimento é direto com quem entende.",
    },
    {
      question: "Como funciona o suporte técnico?",
      answer:
        "Suporte por e-mail com resposta rápida. Planos Business e Enterprise incluem horas de suporte técnico dedicadas por mês pra resolver problemas e fazer ajustes.",
    },
    {
      question: "Fazem só sites ou também segurança e IA?",
      answer:
        "Fazemos tudo: criação de sites, hospedagem gerenciada, revenda de VPS, consultoria em inteligência artificial e cibersegurança. Tudo no mesmo lugar com o mesmo responsável técnico.",
    },
  ],
} as const;
