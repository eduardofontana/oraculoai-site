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

Este projeto inclui um widget de chatbot simples (respostas pré-definidas) que pode ser integrado ao site.

### Arquivos
- `static/chatbot-widget.js` – lógica do widget
- `static/chatbot-widget.css` – estilos do widget

### Integração
Antes do fechamento da tag `</body>` nas páginas onde deseja o chatbot, adicione:

```html
<script>
  window.ChatbotConfig = {
    triggerSelector: 'a[aria-label="Falar no WhatsApp"]', // ajuste se necessário
    apiBase: '' // mesma origem se o widget e API estiverem no mesmo domínio; caso contrário, informe a URL base da API
  };
</script>
<script src="/static/chatbot-widget.js"></script>
```

O widget detecta automaticamente o botão flutuante existente (por padrão, o link com `aria-label="Falar no WhatsApp"`) e anexa um evento de clique para abrir a janela de chat.

### Configuração da API (backend)
O backend do chatbot está hospedado separadamente (por exemplo, em uma VPS). Certifique‑se de que o CORS esteja configurado para permitir a origem do seu site Vercel.
