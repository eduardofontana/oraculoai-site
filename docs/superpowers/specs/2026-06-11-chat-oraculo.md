# Conversar com o Oráculo — Chat Técnico com IA

**Data:** 2026-06-11
**Status:** Aprovado
**Stack:** Next.js 16.2.7 · React 19 · Tailwind CSS 4 · TypeScript · Vercel

---

## 1. Objetivo

Implementar um chat com IA técnica chamado **"Conversar com o Oráculo"** no site oraculo.cloud. O assistente é focado em segurança cibernética, IA, arquitetura de sistemas, Linux, cloud, DevOps e desenvolvimento web — **nada espiritual ou esotérico**.

## 2. Stack e Versões

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.2.7 |
| UI | React 19.2.4 + Tailwind CSS 4 |
| Linguagem | TypeScript |
| Backend IA | Hugging Face Inference API (Mistral-7B-Instruct-v0.3) |
| Deploy | Vercel (plano gratuito) |
| Fonte | Nunito Sans |

## 3. Arquitetura

```
Usuário (browser)
  → POST /api/oraculo/chat { message }
    → API Route (serverless, server-only)
      → Valida entrada (sanitize, limite 500ch)
      → Rate limit por IP (20 msg/sessão)
      → POST https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3
        → Bearer Token: process.env.HF_TOKEN
      → Retorna { reply: string }
  → Renderiza resposta no frontend
```

**Requisitos de infra:**
- Nenhum banco de dados (histórico em memória no cliente)
- Nenhum servidor persistent (serverless)
- A chave HF_TOKEN vive apenas no backend (variável de ambiente Vercel)

## 4. Componentes

### 4.1. `OraculoTrigger` (Botão Flutuante)
- Posição: fixed, bottom-5, right-20 (ao lado do WhatsApp)
- Ícone: chip/neural style (SVG inline)
- Tooltip "Conversar com o Oráculo" no hover
- Badge "IA" ou "Beta"
- Ao clicar: abre `OraculoChatPanel`
- Lazy load via `next/dynamic` (só carrega JS quando clica)

### 4.2. `OraculoChatPanel` (Painel de Chat)
- **Desktop (≥768px):** Painel lateral direito, 400px, altura total (100dvh), com backdrop
- **Mobile (<768px):** Modal fullscreen (100vw × 100dvh)
- Transição: slide-in da direita (desktop), fade-in (mobile)
- Cabeçalho: "Oráculo" + badge "IA" + botão fechar (×)
- Corpo: scroll reverso (última msg no final), lista de mensagens
- Input: textarea com auto-resize (max 4 linhas), botão enviar (ícone de seta)
- Submit: Enter envia (Shift+Enter = nova linha)

### 4.3. Mensagens (Bolhas)
- **Usuário:** direita, bg `--accent`, texto branco, sem borda, border-radius 16px
- **Oráculo:** esquerda, bg `--bg-card`, borda `--border`, texto `--text-primary`, avatar "O" estilizado
- **Sistema/Erro:** centro, bg `--accent-soft`, texto `--accent-text`, com action "Tentar novamente"
- **Boas-vindas:** primeira mensagem automática do Oráculo

## 5. API Route

**Rota:** `src/app/api/oraculo/chat/route.ts`

```
POST /api/oraculo/chat
Body: { message: string }
Response 200: { reply: string }
Response 400: { error: "Mensagem inválida" }
Response 429: { error: "Limite de mensagens excedido" }
Response 500: { error: "Erro interno" }
```

**Segurança:**
- Só aceita POST
- `message` sanitizado (trim, máximo 500 caracteres)
- Rate limit em Map<IP, count> (20 por IP, reseta a cada hora ou no deploy)
- HF_TOKEN lido exclusivamente de `process.env.HF_TOKEN`
- Timeout de 25s na chamada à HF API

## 6. Integração Hugging Face

**Modelo:** `mistralai/Mistral-7B-Instruct-v0.3`

**Prompt format (Mistral):**
```
<s>[INST] System instructions + context + user message [/INST]
```

**Parâmetros:**
```json
{
  "max_new_tokens": 512,
  "temperature": 0.3,
  "top_p": 0.9,
  "repetition_penalty": 1.1
}
```

**Headers:**
```
Authorization: Bearer <HF_TOKEN>
Content-Type: application/json
```

## 7. Estados e Tratamento de Erro

| Estado | UI | Ação |
|---|---|---|
| Carregando | 3 dots animados (typiong indicator) | — |
| Erro rede | Bolha vermelha "Falha na comunicação" | "Tentar novamente" reenvia |
| Erro API | Bolha "Erro no serviço de IA" | "Tentar novamente" |
| Limite | Banner no input "Limite de 20 msg" | Input desabilitado |
| Sucesso | Bolha verde com resposta | Scroll automático |

## 8. Variáveis de Ambiente

```bash
HF_TOKEN=hf_your_token_here
```

Adicionar no `.env.example` e instruir configuração no Vercel Dashboard (Settings → Environment Variables).

## 9. Atualizações no Verificadores de Segurança (CSP)

O `connect-src` no `vercel.json` precisa ser atualizado para incluir `https://api-inference.huggingface.co`.

## 10. Arquivos a Serem Criados/Modificados

| Arquivo | Tipo | Ação |
|---|---|---|
| `src/app/api/oraculo/chat/route.ts` | Novo | API route do chat |
| `src/components/OraculoChat/OraculoTrigger.tsx` | Novo | Botão flutuante |
| `src/components/OraculoChat/OraculoChatPanel.tsx` | Novo | Painel de chat |
| `src/components/OraculoChat/types.ts` | Novo | Tipos compartilhados |
| `src/components/OraculoChat/index.ts` | Novo | Barrel export |
| `src/app/layout.tsx` | Modificado | Adicionar OraculoTrigger |
| `.env.example` | Modificado | Adicionar HF_TOKEN |
| `vercel.json` | Modificado | Atualizar CSP connect-src |

## 11. Riscos

- **HF Inference API rate limit:** Modelos gratuitos têm limite de ~30 req/min. O rate limit de 20 msg/sessão mitiga.
- **Cold start Vercel:** Primeira requisição pode levar ~1-2s. Aceitável para chat.
- **CSP bloqueando chamada:** Necessário adicionar `connect-src` para HF.
- **Prompt injection:** Usuário pode tentar bypass. O system prompt é server-side, mas o histórico é client-side — limitamos danos validando no backend.

## 12. Próximos Passos

1. Criar API route
2. Criar componentes de chat
3. Integrar no layout
4. Testar localmente
5. Configurar HF_TOKEN no Vercel
6. Fazer deploy
