# Oráculo AI

Presença digital premium para empresas. Criamos sites institucionais, gerenciamos hospedagem cloud, oferecemos consultoria em inteligência artificial e cibersegurança — com atendimento humano direto via WhatsApp.

## Serviços

- **Criação de Sites** — Landing pages e sites institucionais com estética premium e foco em conversão.
- **Hospedagem Gerenciada** — Infraestrutura cloud, VPS, domínio e e-mail profissional com suporte técnico.
- **Consultoria em IA e Segurança** — Automação, chatbots, análise de dados, hardening e auditoria de vulnerabilidades.
- **Ferramentas Online** — Conjunto de utilitários gratuitos (CPF, CNPJ, QR Code, Pix, JSON, etc) em `/ferramentas`.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Desenvolvimento

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # produção
npm run lint    # verificação de código
```

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sim | Número do WhatsApp (com DDD e país) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Não | Email de contato |

> `NEXT_PUBLIC_*` são expostas ao cliente.
