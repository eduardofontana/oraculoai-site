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

## Chatbot Widget

Widget de chatbot integrado ao botão flutuante do WhatsApp. As respostas são pré-definidas (state machine) e os dados de lead são enviados para o backend na VPS via API routes do Next.js (proxy), eliminando problemas de CORS.

### Arquivos
- `public/chatbot-widget.js` – lógica do widget (servido estaticamente pelo Next.js)
- `src/app/api/chatbot/[...path]/route.ts` – proxy API route para o backend na VPS

### Fluxo
1. Usuário clica no botão flutuante → abre o chat
2. Escolhe opção → preenche nome/telefone/email/mensagem
3. Widget envia POST `/api/chatbot/leads` → API route do Next.js proxy para `CHATBOT_API_URL`
4. Widget também envia POST `/api/chatbot/message` para logging (mesmo proxy)

### Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sim | Número do WhatsApp (5500000000000) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Não | Email de contato |
| `CHATBOT_API_URL` | Sim | URL do backend na VPS (ex: http://0.0.0.0) |

> `NEXT_PUBLIC_*` são expostas ao cliente. `CHATBOT_API_URL` é apenas server-side (usada pelas API routes).

### Widget incluso no `layout.tsx`
O widget já está embutido no root layout via `next/script`. Não é necessário adicionar tags manuais.
