# OraculoAI Mailkit-Inspired Redesign Design

> **For Hermes:** Use subagent-driven-development skill to implement this design section-by-section after the spec is reviewed and approved.

**Goal:** transformar a home atual em uma landing page premium editorial dark, inspirada na lógica visual do Mailkit, com mais percepção de valor, mais autoridade e mais conversão para WhatsApp.

**Architecture:** manter a base em Next.js App Router e evoluir principalmente a camada de UI. A mudança é visual e narrativa, não estrutural: mesma navegação curta, mesma proposta de serviços, porém com hero mais forte, tipografia mais expressiva, seções mais ritmadas e blocos de prova/conversão que levem o visitante para contato rápido. O site deve parecer um estúdio/consultoria premium, não um template de agência.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, App Router, componentes compartilhados, metadata estática.

---

## 1) Contexto e intenção do redesign

O site atual já cumpre o básico: comunica os serviços, tem CTA para WhatsApp e rotas essenciais. O problema é percepção: hoje ele parece funcional, porém genérico. O redesign precisa elevar a marca OraculoAI para uma posição mais premium e memorável sem sacrificar clareza ou velocidade de decisão.

A referência principal é a lógica do Mailkit:
- hero direto e forte;
- poucas ideias por tela;
- grande foco em hierarquia;
- sensação de produto/estúdio premium;
- UI limpa, com personalidade e contraste.

A referência da Awwwards entra como repertório de linguagem visual, não como cópia literal. O resultado precisa ser original, mas com a mesma intenção: site que prende atenção, parece sofisticado e dá vontade de continuar lendo.

---

## 2) Objetivos de produto

1. Aumentar a percepção de valor da marca.
2. Melhorar a taxa de clique no WhatsApp.
3. Fazer o visitante entender a oferta em menos de 10 segundos.
4. Passar autoridade para serviços de web, cybersecurity e infraestrutura.
5. Manter o escopo enxuto para não virar “site bonito porém inútil”.

---

## 3) Princípios de design

### 3.1 Visual
- Dark premium como base.
- Alto contraste entre fundo e texto.
- Títulos grandes, com respiro e peso editorial.
- Mais espaço negativo.
- Borda fina, glow discreto, blur leve, sem excesso de efeitos.
- Menos blocos “corporativos” e mais composição com cara de estúdio.

### 3.2 Narrativa
- Primeiro: promessa.
- Depois: prova/autoridade.
- Depois: serviços.
- Depois: processo simples.
- Depois: CTA final.

### 3.3 Conversão
- WhatsApp continua sendo o CTA principal.
- Email é secundário.
- O site deve vender conversa, não informação infinita.
- Cada seção precisa empurrar para o contato, não dispersar.

### 3.4 Clareza
- linguagem curta;
- frases diretas;
- nenhuma seção longa demais;
- cada bloco com uma única função.

---

## 4) Estrutura da nova home

### 4.1 Hero principal
Conteúdo esperado:
- marca pequena no topo;
- headline grande e curta;
- subtítulo com promessa clara;
- dois CTAs: WhatsApp primário e ver serviços secundário;
- uma faixa de prova curta ou micro-métricas logo abaixo.

Função:
- causar impacto visual imediato;
- explicar o valor do negócio;
- direcionar para contato sem fricção.

### 4.2 Prova / autoridade
Depois do hero, inserir um bloco curto com 3 a 4 pontos que expliquem por que a OraculoAI é confiável:
- foco em resultado;
- web + cyber + infraestrutura;
- atendimento direto;
- postura consultiva/premium.

### 4.3 Serviços
Manter três frentes principais, mas apresentadas com mais sofisticação:
- Desenvolvimento Web
- Cybersecurity
- Domínios e Hospedagem

Cada card deve transmitir:
- o que resolve;
- para quem serve;
- benefício principal;
- CTA ou link para conversa.

### 4.4 Processo
Uma seção curta, em 3 passos, explicando como funciona a contratação:
1. você chama no WhatsApp;
2. alinhamos escopo e prioridade;
3. entregamos a solução.

A intenção é reduzir ansiedade e acelerar decisão.

### 4.5 Diferenciais / confiança
Lista curta de diferenciais reais, sem exagero de marketing:
- resposta direta;
- escopo claro;
- foco em performance e segurança;
- solução sob medida;
- visão técnica e comercial ao mesmo tempo.

### 4.6 CTA final
Fechamento forte com repetição da proposta e botão WhatsApp destacado.

---

## 5) Direção de arte e sistema visual

### 5.1 Paleta
- Fundo principal: preto/zinc quase absoluto.
- Superfícies: cinzas escuros com transparência leve.
- Texto principal: branco quase puro.
- Texto secundário: cinza claro.
- Accent: ciano ou azul elétrico contido, usado apenas para CTA e detalhes-chave.

### 5.2 Tipografia
- Título de hero com escala maior e tracking ajustado.
- Títulos de seção com presença editorial.
- Corpo com leitura confortável e largura controlada.
- Evitar visual “corporate default”; buscar mais personalidade.

### 5.3 Componentes visuais
- cards com borda sutil e fundo translúcido;
- sombras mínimas;
- gradientes discretos;
- chips/labels pequenos para confiança;
- separadores visuais limpos;
- evitar ícones demais.

### 5.4 Layout
- largura máxima controlada;
- hero com bastante altura;
- seções com espaçamento generoso;
- blocos em grid simples;
- mobile-first sem perder presença visual.

---

## 6) Conteúdo e copy

### 6.1 Tom de voz
- técnico, direto, confiante;
- sem floreio desnecessário;
- sem linguagem genérica de agência;
- com foco em resultado e clareza.

### 6.2 Posicionamento
A marca deve soar como:
- estúdio premium;
- consultoria digital;
- operação que cria, protege e escala presença digital.

### 6.3 Regras de copy
- uma ideia principal por bloco;
- verbos fortes;
- frases curtas;
- evitar parágrafos longos;
- reforçar ação em todo CTA.

---

## 7) Componentes que provavelmente mudam

### Frontend
- `src/app/page.tsx`
- `src/components/WhatsAppButton.tsx`
- `src/components/ServiceCard.tsx`
- `src/components/Section.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`

### Potenciais ajustes de conteúdo/config
- `src/lib/site.ts`
- metadata do layout
- textos das páginas de serviço, sobre e contato para manter coerência com a nova estética

### Possível expansão visual futura
- hero visual com grid/layer decorativo
- métricas de prova
- bloco de depoimento ou mini-case
- animações sutis de entrada/hover

---

## 8) Escopo da primeira implementação

### Entra agora
- redesenho da home;
- refinamento visual global;
- ajuste de copy para tom premium;
- ajuste de CTAs;
- preservação do fluxo de WhatsApp;
- coerência visual nas páginas de serviço principais.

### Fica para depois
- blog;
- CMS;
- multi-idioma;
- animações pesadas;
- cases complexos;
- automações de CRM;
- portfolio profundo.

---

## 9) Critérios de aceite

O redesign só é considerado pronto quando:
- a home parece claramente mais premium do que a versão atual;
- a leitura da proposta é instantânea;
- o CTA principal continua evidente em desktop e mobile;
- o site continua rápido e simples;
- `npm run lint` passa;
- `npm run build` passa;
- a experiência mobile continua boa;
- os links de WhatsApp seguem funcionando.

---

## 10) Riscos e trade-offs

### Risco: exagerar no visual e perder conversão
Mitigação: limitar efeitos a detalhes e manter CTA sempre visível.

### Risco: copiar demais a referência
Mitigação: usar a lógica do Mailkit, não o layout literal.

### Risco: site virar “landing bonita” sem objetivo comercial
Mitigação: cada seção precisa contribuir para lead ou autoridade.

### Risco: overengineering
Mitigação: manter componentes pequenos e reaproveitar o que já existe.

---

## 11) Validação esperada antes de implementar

Antes de codar, revisar:
- promessa principal da home;
- ordem das seções;
- tom da copy;
- composição visual;
- CTA principal;
- pontos de confiança.

Se algo não ajudar a gerar lead ou vender, sai do escopo.

---

## 12) Próximo passo

Depois da revisão deste spec, a implementação deve seguir em pequenas etapas, com foco em:
1. atualizar base visual;
2. redesenhar hero;
3. refinar cards e seções;
4. testar mobile e build;
5. publicar a nova versão.
