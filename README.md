# Oráculo AI

Site institucional com foco em criação de sites, hospedagem gerenciada, consultoria em IA, cibersegurança e ferramentas online.

## Serviços

- **Criação de Sites** — Landing pages e sites institucionais com foco em clareza, desempenho e conversão.
- **Hospedagem Gerenciada** — Infraestrutura cloud, VPS, domínio e e-mail profissional com suporte técnico.
- **Consultoria em IA e Cibersegurança** — Automação, análise de dados e proteção digital.
- **Ferramentas Online** — Utilitários pra CPF, CNPJ, QR Code, Pix, JSON e mais em `/ferramentas`.

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
| `NEXT_PUBLIC_CONTACT_EMAIL` | Não | Email de contato |

> Variáveis `NEXT_PUBLIC_*` ficam expostas ao cliente.
