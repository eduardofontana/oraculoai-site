# implement.md — Implementação do OraculoAI Cloud dentro de um site existente

## Contexto do projeto

Este documento substitui a ideia de criar um site totalmente novo do zero.

O usuário já possui um site principal em funcionamento e deseja adicionar nele um botão, menu ou chamada visual que leve para uma nova área de ferramentas online chamada:

```txt
OraculoAI Cloud
```

Portanto, a IA que executar este documento **não deve recriar o site principal do zero**.

A tarefa correta é:

1. Preservar o site atual.
2. Identificar a estrutura existente do projeto.
3. Adicionar um botão ou link de navegação no site atual.
4. Criar uma página/rota dedicada para as ferramentas.
5. Implementar as ferramentas dentro dessa nova área.
6. Manter o estilo visual compatível com o site existente.

---

# Objetivo

Adicionar ao site atual uma seção de ferramentas online, no estilo 4Devs, acessível por um botão visível no site principal.

A nova área deve funcionar como um módulo independente dentro do projeto atual.

Exemplo de fluxo:

```txt
Site atual
  ↓ botão "Ferramentas"
Página /ferramentas
  ↓ lista de ferramentas
Página /ferramentas/gerador-cpf
Página /ferramentas/validador-cpf
Página /ferramentas/gerador-pix
etc.
```

---

# Regra principal para a IA

A IA deve seguir esta regra antes de qualquer implementação:

```txt
NÃO criar um novo site do zero.
NÃO substituir a homepage atual.
NÃO apagar layout, páginas, rotas, componentes ou estilos existentes.
NÃO alterar a identidade principal do site sem necessidade.
```

A IA deve apenas adicionar o módulo de ferramentas e o botão de acesso.

---

# O que deve ser implementado no site existente

## 1. Botão de acesso às ferramentas

Adicionar no site atual um botão com texto:

```txt
Ferramentas
```

ou, se fizer sentido pelo design:

```txt
Acessar ferramentas
```

Sugestões de locais para o botão:

- Header principal.
- Menu de navegação.
- Hero section da página inicial.
- Área de cards/chamadas da homepage.
- Footer, como link secundário.

Prioridade recomendada:

```txt
1. Header/menu principal
2. Hero da homepage
3. Footer
```

O botão deve levar para:

```txt
/ferramentas
```

Exemplo de HTML:

```html
<a href="/ferramentas" class="btn-primary">
  Ferramentas
</a>
```

Se o projeto usar React:

```tsx
<a href="/ferramentas" className="btn-primary">
  Ferramentas
</a>
```

Se o projeto usar componente Button:

```tsx
<Button asChild>
  <a href="/ferramentas">Ferramentas</a>
</Button>
```

---

# 2. Página central das ferramentas

Criar a rota:

```txt
/ferramentas
```

Essa página será o catálogo das ferramentas.

Ela deve conter:

- Título.
- Descrição curta.
- Campo de busca local.
- Categorias.
- Cards com todas as ferramentas.
- Links para cada ferramenta.
- Layout responsivo.
- SEO básico.

Título sugerido:

```txt
Ferramentas online grátis
```

Descrição sugerida:

```txt
Use ferramentas rápidas para documentos, Pix, QR Code, texto, desenvolvimento, imagem e PDF. Tudo simples, leve e gratuito.
```

---

# 3. Rotas individuais das ferramentas

Cada ferramenta deve ter sua própria página dentro de:

```txt
/ferramentas/[slug]
```

Exemplos:

```txt
/ferramentas/gerador-cpf
/ferramentas/validador-cpf
/ferramentas/gerador-cnpj
/ferramentas/validador-cnpj
/ferramentas/gerador-qr-code
/ferramentas/gerador-pix
/ferramentas/formatador-json
/ferramentas/base64
/ferramentas/url-encode-decode
/ferramentas/gerador-uuid
/ferramentas/gerador-hash
/ferramentas/contador-caracteres
/ferramentas/maiusculas-minusculas
/ferramentas/texto-para-slug
/ferramentas/imagem-para-pdf
```

Cada página deve conter:

```txt
H1 da ferramenta
Descrição curta
Card principal da ferramenta
Resultado
Botão copiar quando fizer sentido
Como usar
FAQ simples
Ferramentas relacionadas
```

---

# 4. Stack recomendada

Se o projeto atual já usa uma stack, a IA deve respeitar a stack existente.

Não migrar o projeto sem necessidade.

Usar a stack abaixo apenas se ela já for compatível com o projeto atual ou se o usuário autorizar:

```txt
Astro
React Islands
Tailwind CSS
Shadcn/UI ou componentes próprios
TypeScript
Docker
Nginx ou Caddy
Cloudflare gratuito
```

Se o site atual for feito em Next.js, Astro, React, Vue, Laravel, WordPress ou outro framework, adaptar o módulo para a tecnologia atual.

A prioridade é integração, não reescrita.

---

# 5. Regras técnicas do MVP

O MVP deve ser simples.

Requisitos:

```txt
Não usar banco de dados.
Não usar login.
Não criar backend se não for necessário.
Processar tudo client-side quando possível.
Evitar APIs pagas.
Evitar uploads pesados.
Não usar OCR.
Não usar vídeo.
Não usar áudio.
Não usar LibreOffice.
```

O projeto deve rodar bem em uma VPS simples:

```txt
1 vCPU
4 GB RAM
50 GB SSD
```

---

# MVP — 15 ferramentas iniciais

## 1. Gerador de CPF

Rota:

```txt
/ferramentas/gerador-cpf
```

Funções:

- Gerar CPF válido.
- Opção com pontuação.
- Opção sem pontuação.
- Botão copiar.
- Botão gerar novamente.

## 2. Validador de CPF

Rota:

```txt
/ferramentas/validador-cpf
```

Funções:

- Receber CPF com ou sem pontuação.
- Validar dígitos verificadores.
- Exibir resultado claro: válido ou inválido.
- Rejeitar sequências como 00000000000 e 11111111111.
- Não enviar dados para servidor.

## 3. Gerador de CNPJ

Rota:

```txt
/ferramentas/gerador-cnpj
```

Funções:

- Gerar CNPJ válido.
- Opção com pontuação.
- Opção sem pontuação.
- Botão copiar.

## 4. Validador de CNPJ

Rota:

```txt
/ferramentas/validador-cnpj
```

Funções:

- Receber CNPJ com ou sem pontuação.
- Validar dígitos verificadores.
- Rejeitar sequências repetidas.
- Mostrar resultado claro.

## 5. Gerador de QR Code

Rota:

```txt
/ferramentas/gerador-qr-code
```

Funções:

- Campo de texto ou URL.
- Gerar QR Code no navegador.
- Baixar QR Code em PNG.
- Copiar conteúdo original.

Biblioteca sugerida:

```txt
qrcode
```

## 6. Gerador de Pix Copia e Cola

Rota:

```txt
/ferramentas/gerador-pix
```

Campos:

```txt
Chave Pix
Nome do recebedor
Cidade
Valor opcional
Descrição opcional
```

Funções:

- Gerar código Pix copia e cola.
- Gerar QR Code Pix.
- Botão copiar.
- Aviso: ferramenta local, sem intermediação de pagamento.

## 7. Formatador de JSON

Rota:

```txt
/ferramentas/formatador-json
```

Funções:

- Colar JSON.
- Validar JSON.
- Formatar com indentação.
- Minificar.
- Copiar resultado.
- Mostrar erro amigável se o JSON estiver inválido.

## 8. Base64 Encode/Decode

Rota:

```txt
/ferramentas/base64
```

Funções:

- Codificar texto para Base64.
- Decodificar Base64 para texto.
- Copiar resultado.

## 9. URL Encode/Decode

Rota:

```txt
/ferramentas/url-encode-decode
```

Funções:

- Codificar URL.
- Decodificar URL.
- Copiar resultado.

## 10. Gerador de UUID

Rota:

```txt
/ferramentas/gerador-uuid
```

Funções:

- Gerar UUID v4.
- Gerar múltiplos UUIDs.
- Copiar individualmente.
- Copiar todos.

## 11. Gerador de Hash

Rota:

```txt
/ferramentas/gerador-hash
```

Funções:

- Gerar MD5.
- Gerar SHA-1.
- Gerar SHA-256.
- Copiar resultado.

Observação:

- Usar Web Crypto API quando possível.
- Para MD5, usar biblioteca leve, pois Web Crypto API não suporta MD5 nativamente.

## 12. Contador de Caracteres

Rota:

```txt
/ferramentas/contador-caracteres
```

Funções:

- Contar caracteres.
- Contar caracteres sem espaços.
- Contar palavras.
- Contar linhas.
- Contar parágrafos.

## 13. Conversor Maiúsculas/Minúsculas

Rota:

```txt
/ferramentas/maiusculas-minusculas
```

Funções:

- Converter para MAIÚSCULAS.
- Converter para minúsculas.
- Capitalizar palavras.
- Formato título.
- Copiar resultado.

## 14. Texto para Slug

Rota:

```txt
/ferramentas/texto-para-slug
```

Funções:

- Converter texto em slug.
- Remover acentos.
- Remover caracteres especiais.
- Opção com hífen.
- Opção com underline.

## 15. Conversor PNG/JPG para PDF

Rota:

```txt
/ferramentas/imagem-para-pdf
```

Funções:

- Aceitar PNG e JPG.
- Gerar PDF no navegador.
- Permitir múltiplas imagens.
- Ordenar imagens antes de gerar.
- Baixar PDF.

Bibliotecas sugeridas:

```txt
jspdf
browser-image-compression opcional
```

Limites recomendados:

```txt
Máximo de 10 imagens
Máximo de 5 MB por imagem
Processamento client-side
```

---

# Estrutura sugerida dentro do site atual

A IA deve adaptar a estrutura abaixo ao projeto existente.

Não usar esta estrutura como obrigação absoluta se o projeto atual tiver outro padrão.

```txt
src/
├── components/
│   ├── tools/
│   │   ├── ToolCard.tsx
│   │   ├── ToolLayout.tsx
│   │   ├── CopyButton.tsx
│   │   ├── CpfGenerator.tsx
│   │   ├── CpfValidator.tsx
│   │   ├── CnpjGenerator.tsx
│   │   ├── CnpjValidator.tsx
│   │   ├── QrCodeGenerator.tsx
│   │   ├── PixGenerator.tsx
│   │   ├── JsonFormatter.tsx
│   │   ├── Base64Tool.tsx
│   │   ├── UrlEncodeDecode.tsx
│   │   ├── UuidGenerator.tsx
│   │   ├── HashGenerator.tsx
│   │   ├── CharacterCounter.tsx
│   │   ├── CaseConverter.tsx
│   │   ├── SlugGenerator.tsx
│   │   └── ImageToPdf.tsx
│   │
├── data/
│   └── tools.ts
│
├── lib/
│   ├── cpf.ts
│   ├── cnpj.ts
│   ├── pix.ts
│   ├── slug.ts
│   ├── hash.ts
│   └── validators.ts
│
├── pages ou app/
│   └── ferramentas/
│       ├── index
│       ├── gerador-cpf
│       ├── validador-cpf
│       ├── gerador-cnpj
│       ├── validador-cnpj
│       ├── gerador-qr-code
│       ├── gerador-pix
│       ├── formatador-json
│       ├── base64
│       ├── url-encode-decode
│       ├── gerador-uuid
│       ├── gerador-hash
│       ├── contador-caracteres
│       ├── maiusculas-minusculas
│       ├── texto-para-slug
│       └── imagem-para-pdf
```

---

# Catálogo central de ferramentas

Criar ou adaptar o arquivo:

```txt
src/data/tools.ts
```

Exemplo:

```ts
export const tools = [
  {
    title: "Gerador de CPF",
    slug: "gerador-cpf",
    category: "Documentos Brasil",
    description: "Gere CPFs válidos para testes de sistemas.",
    keywords: ["cpf", "gerador cpf", "documentos"],
  },
  {
    title: "Validador de CPF",
    slug: "validador-cpf",
    category: "Documentos Brasil",
    description: "Valide se um CPF é matematicamente válido.",
    keywords: ["cpf", "validador cpf"],
  },
];
```

Esse catálogo deve alimentar:

- Página `/ferramentas`.
- Busca local.
- Cards de ferramentas.
- Links internos.
- SEO das páginas.
- Ferramentas relacionadas.

---

# Design e integração visual

A área de ferramentas deve parecer parte do site atual.

A IA deve:

1. Reutilizar componentes existentes quando possível.
2. Reutilizar cores, fonte, espaçamento e padrão visual do site atual.
3. Evitar criar uma identidade visual conflitante.
4. Criar cards e botões compatíveis com o design já existente.
5. Garantir responsividade mobile.

Caso o site atual não tenha um design claro, usar este estilo como base:

```txt
Moderno
Limpo
Rápido
Responsivo
Escuro ou neutro
Inspirado em Vercel, Raycast, Linear, 4Devs e IT-Tools
```

Cores sugeridas apenas se não houver paleta existente:

```txt
Fundo: #0B0F19
Cards: #111827
Primária: #7C3AED
Texto: #F9FAFB
Texto secundário: #9CA3AF
Borda: #1F2937
```

---

# SEO

A IA deve criar SEO básico para:

```txt
/ferramentas
/ferramentas/[slug]
```

Exemplo para a página central:

```txt
Title: Ferramentas Online Grátis | OraculoAI Cloud
Description: Use ferramentas gratuitas para CPF, CNPJ, Pix, QR Code, JSON, Base64, UUID, hash, texto, imagem e PDF.
```

Exemplo para ferramenta:

```txt
Title: Gerador de CPF Online Grátis | OraculoAI Cloud
Description: Gere CPF válido para testes de sistemas. Ferramenta gratuita, rápida e segura, sem enviar dados para servidor.
```

Importante:

- Não alterar o SEO da homepage atual sem necessidade.
- Não substituir metatags globais existentes de forma destrutiva.
- Apenas adicionar SEO nas novas páginas.

---

# Bibliotecas permitidas

Instalar somente se ainda não existirem no projeto:

```txt
qrcode
jspdf
uuid
crypto-js
lucide-react
clsx
tailwind-merge
```

Não instalar dependências pesadas sem necessidade.

---

# Roadmap de execução para IA

## Fase 0 — Inspeção do projeto existente

Antes de codar, a IA deve:

1. Identificar o framework usado no site atual.
2. Identificar onde fica o header/menu.
3. Identificar onde ficam as rotas/páginas.
4. Identificar o padrão de componentes.
5. Identificar o sistema de estilos.
6. Verificar se já existe Tailwind, React, Astro, Next.js ou outro framework.
7. Verificar scripts de build e dev no package.json.

Critério de aceite:

```txt
A IA deve preservar a estrutura atual e implementar o módulo de ferramentas de forma compatível.
```

## Fase 1 — Botão de acesso

A IA deve:

1. Adicionar botão/link "Ferramentas" no header/menu principal, se existir.
2. Se não houver header claro, adicionar uma chamada na homepage.
3. O botão deve apontar para `/ferramentas`.
4. O botão deve seguir o estilo visual do site atual.

Critério de aceite:

```txt
O site atual continua funcionando e agora possui acesso visível para /ferramentas.
```

## Fase 2 — Página /ferramentas

A IA deve:

1. Criar página de catálogo das ferramentas.
2. Criar busca local.
3. Criar categorias.
4. Criar cards com nome, descrição e link.
5. Usar o catálogo central `tools.ts`.

Critério de aceite:

```txt
/ferramentas deve listar todas as 15 ferramentas e permitir acessar cada uma.
```

## Fase 3 — Base técnica das ferramentas

A IA deve:

1. Criar componentes reutilizáveis.
2. Criar `CopyButton`.
3. Criar layout padrão de ferramenta.
4. Criar utilitários em `lib/` para CPF, CNPJ, Pix, slug e hash.

Critério de aceite:

```txt
Cada ferramenta deve ter layout consistente e lógica isolada.
```

## Fase 4 — Ferramentas de documentos

Criar:

```txt
Gerador de CPF
Validador de CPF
Gerador de CNPJ
Validador de CNPJ
```

Critério de aceite:

```txt
Todos os documentos gerados devem passar nos validadores.
Validadores devem rejeitar sequências repetidas.
Tudo deve rodar localmente no navegador.
```

## Fase 5 — Ferramentas de texto e dev

Criar:

```txt
Formatador JSON
Base64
URL Encode/Decode
UUID
Hash
Contador de caracteres
Maiúsculas/minúsculas
Texto para slug
```

Critério de aceite:

```txt
Todas as ferramentas devem funcionar sem backend e com botão copiar.
```

## Fase 6 — QR Code, Pix e PDF

Criar:

```txt
Gerador de QR Code
Gerador de Pix Copia e Cola
Imagem para PDF
```

Critério de aceite:

```txt
QR Code deve permitir download.
Pix deve gerar código copia e cola e QR Code.
Imagem para PDF deve gerar arquivo localmente no navegador.
```

## Fase 7 — Build e validação

A IA deve:

1. Rodar lint, se existir.
2. Rodar testes, se existirem.
3. Rodar build.
4. Corrigir erros.
5. Garantir que o site atual não foi quebrado.
6. Garantir que `/ferramentas` e todas as rotas individuais funcionam.

Critério de aceite:

```txt
npm install deve funcionar.
npm run dev deve abrir o projeto.
npm run build deve gerar build sem erros.
Todas as 15 ferramentas devem funcionar no navegador.
```

---

# Prompt principal para IA de programação

Use este prompt em uma IA de programação como Codex, Cursor, Cline, Claude Code ou Lovable:

```txt
Você é um engenheiro sênior full-stack.

Este projeto já possui um site existente. Não recrie o site do zero.

Sua tarefa é implementar uma área de ferramentas chamada OraculoAI Cloud dentro do projeto atual.

Antes de codar:
1. Inspecione a estrutura do projeto.
2. Identifique o framework usado.
3. Identifique onde ficam o header/menu, rotas, páginas, componentes e estilos.
4. Preserve o site atual.

Implemente:
1. Um botão/link "Ferramentas" no header/menu principal, apontando para /ferramentas.
2. Se não houver header claro, adicione uma chamada visual na homepage apontando para /ferramentas.
3. A página /ferramentas com busca local, categorias e cards de ferramentas.
4. Uma página para cada ferramenta em /ferramentas/[slug].
5. Um catálogo central de ferramentas em src/data/tools.ts ou local equivalente.
6. Componentes reutilizáveis para cards, botão copiar e layout de ferramenta.
7. SEO básico apenas nas novas páginas, sem alterar a homepage atual de forma destrutiva.

MVP com 15 ferramentas:
1. Gerador de CPF
2. Validador de CPF
3. Gerador de CNPJ
4. Validador de CNPJ
5. Gerador de QR Code
6. Gerador de Pix Copia e Cola
7. Formatador de JSON
8. Base64 Encode/Decode
9. URL Encode/Decode
10. Gerador de UUID
11. Gerador de Hash
12. Contador de Caracteres
13. Conversor Maiúsculas/Minúsculas
14. Texto para Slug
15. Conversor PNG/JPG para PDF

Requisitos:
- Não usar banco de dados no MVP.
- Não usar login.
- Não criar backend se não for necessário.
- Processar tudo client-side quando possível.
- Não substituir a homepage atual.
- Não apagar páginas, componentes ou estilos existentes.
- Não mudar a identidade visual principal sem necessidade.
- Reutilizar componentes e estilos existentes quando possível.
- Criar layout moderno, responsivo e limpo.
- Todas as ferramentas devem ter botão copiar quando fizer sentido.
- O site deve funcionar bem em mobile.

Bibliotecas permitidas, apenas se ainda não existirem:
- qrcode
- jspdf
- uuid
- crypto-js
- lucide-react
- clsx
- tailwind-merge

Critérios de aceite:
- O site atual continua funcionando.
- Existe um botão "Ferramentas" apontando para /ferramentas.
- /ferramentas lista todas as 15 ferramentas.
- Cada ferramenta possui rota própria.
- Todas as ferramentas rodam no navegador.
- npm install deve funcionar.
- npm run dev deve abrir o projeto.
- npm run build deve gerar build sem erros.
```

---

# Prompt curto para Lovable

```txt
Este projeto já possui um site existente. Não recrie o site do zero.

Adicione uma área chamada OraculoAI Cloud como módulo de ferramentas dentro do site atual.

Implemente um botão/link "Ferramentas" no header/menu ou na homepage, apontando para /ferramentas.

Crie a página /ferramentas com busca, categorias e cards. Crie páginas individuais em /ferramentas/[slug].

MVP com 15 ferramentas: gerador/validador de CPF, gerador/validador de CNPJ, QR Code, Pix copia e cola, formatador JSON, Base64, URL encode/decode, UUID, hash, contador de caracteres, conversor maiúsculas/minúsculas, texto para slug e imagem PNG/JPG para PDF.

Não use banco, login ou backend no MVP. Tudo deve rodar client-side quando possível.

Preserve o site atual, a homepage, os componentes e estilos existentes. Apenas integre o novo módulo e o botão de acesso.

Garanta responsividade, botão copiar quando fizer sentido, SEO básico nas novas páginas e build sem erros.
```

---

# Checklist final

Antes de finalizar, a IA deve confirmar:

```txt
[ ] Site atual preservado.
[ ] Botão "Ferramentas" criado.
[ ] Botão aponta para /ferramentas.
[ ] Página /ferramentas criada.
[ ] Catálogo tools.ts criado ou adaptado.
[ ] 15 ferramentas listadas.
[ ] 15 ferramentas implementadas.
[ ] Cada ferramenta tem rota própria.
[ ] Ferramentas funcionam client-side.
[ ] Botões copiar funcionando.
[ ] Layout responsivo.
[ ] SEO básico nas novas páginas.
[ ] npm run build sem erros.
[ ] Nenhum recurso pesado adicionado.
```

---

# Observações importantes

Este módulo deve ser pensado como uma expansão do site atual, não como um novo produto separado.

O MVP deve ser leve, barato e simples de manter.

Evitar complexidade prematura.

Não adicionar agora:

```txt
Banco de dados
Login
Painel admin
Fila
Workers
OCR
IA
Upload pesado
Conversão de vídeo
Conversão de áudio
```

Esses recursos podem ser adicionados depois, quando houver tráfego e necessidade real.
