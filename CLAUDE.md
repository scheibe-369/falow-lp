# CLAUDE.md — Falow (landing page)

Instrucoes do projeto Falow. Valem junto com o CLAUDE.md global do usuario.
Este workspace NAO tem relacao com a mentoria CIPHER (outro projeto no mesmo
diretorio pai) alem de compartilhar o mesmo usuario/operador. Nao misturar
identidade visual, copy ou paleta dos dois projetos.

## O que e o Falow

Falow e um **software de automacao conversacional** (categoria: mesmo terreno do
ManyChat), construido pelo usuario com o **Matheus Fonseca**. Este repositorio e
o workspace da **landing page / site** do produto, nao o produto em si.

### Escopo funcional que a LP precisa comunicar
- **Builder de automacao conversacional**: fluxos do tipo Gatilho -> Acao ->
  Espera -> Condicao -> Resultado (estrutura ja descrita no design system,
  secao 18).
- **Inbox unificada** (Falow Inbox): caixa de mensagens centralizada, um dos
  modulos da arquitetura de marca (design system, secao 4.3).

Fora de escopo por ora (nao mencionar como feature confirmada): multicanal
explicito (WhatsApp/Instagram/etc como lista fechada) e agentes de IA de
atendimento. Podem entrar depois, mas nao inventar capacidades no copy.

### Estagio e objetivo da LP
- **Produto no ar, venda direta.** CTA principal = comecar agora / assinar,
  nao lista de espera nem "fale com o time" institucional.
- **Publico-alvo prioritario:** agencias e freelancers de automacao (o mesmo
  publico que a mentoria CIPHER forma) e e-commerce/infoprodutores que querem
  vender por conversa.
- **Prova social: ainda nao existe.** Nao inventar numeros, depoimentos ou
  logos de clientes. Deixar a secao estruturada mas vazia/placeholder ate o
  usuario fornecer dados reais.

### Referencia direta
- **ManyChat** e a referencia funcional/categoria principal (builder de
  automacao, inbox, gatilhos). A landing do Falow deve se diferenciar sendo
  **mais criativa**: usar o simbolo (anel aberto + ponto amarelo) e os "Falow
  Paths" (curvas organicas verdes, ver design system secao 16) como
  linguagem visual de storytelling e transicao de scroll, algo que o ManyChat
  nao explora.

## Identidade visual (obrigatoria)

Fonte de verdade: `brand/design-system.md` (documento completo, 27 secoes:
paleta, tipografia, grid, componentes, tokens CSS, Tailwind config sugerida).
Assets em `brand/logo/` (logo master, variantes de fundo, icone/favicon).

Resumo rapido (nao substitui o documento completo):
- **Paleta:** Falow Black `#0B0D0C`, Clear White `#F7F8F3`, Falow Green
  `#32E875`, Trigger Yellow `#FFD43B` + auxiliares derivadas (secao 5).
- **Tipografia:** Manrope (titulos/hero/numeros) + Inter (UI/corpo). Wordmark
  `falow` e ativo vetorial proprio, nunca reconstruir com fonte comum na
  versao final (usar `brand/logo/falow-master.png` ou vetor equivalente).
- **Simbolo:** anel verde aberto + ponto amarelo deslocado. Representa
  conversa, ciclo de automacao, fluxo, gatilho. Usar como favicon, loader,
  marcador de etapas, elemento decorativo.
- **Falow Paths:** curvas verdes organicas com terminais arredondados e
  pontos de gatilho amarelos. Elemento proprietario forte da marca, usar
  como fio condutor visual da LP (linhas de scroll, conectores entre secoes,
  fundo decorativo). Maximo um caminho dominante por area, nunca competir
  com o texto.
- **Radius:** cantos arredondados controlados (8-32px conforme componente),
  nunca cantos totalmente retos em cards.
- **Sombras:** sempre suaves, nunca sombra preta pesada.
- **Motion:** rapido, suave, funcional, orientado a fluxo (120-280ms,
  easings padrao no design system secao 19). Sem bounce excessivo, respeitar
  `prefers-reduced-motion`.

## Copy (regra de estilo, obrigatoria)

- **NUNCA usar travessoes (— –)** em nenhuma copy (headlines, meta tags,
  botoes, e-mail). Reescrever com virgula, ponto, dois-pontos, parenteses ou
  ponto medio `·`.
- Tagline oficial: "Conversas que viram vendas." Usar como ancora de
  posicionamento, nao So como slogan decorativo.
- Tom: direto, tecnico mas acessivel, sem hype vazio. Falow e "amigavel sem
  parecer infantil" (atributo do brand board). Frases curtas, muito espaco
  em branco, resultado antes de feature.

## Credito de producao (obrigatorio)

Toda entrega leva **"Desenvolvida por Method Growth Hub"** com link para
https://methodgrowthhub.com.br (`target="_blank" rel="noopener"`), discreto
no rodape. Nunca omitir.

## Midia (obrigatorio, ver regra global completa)

- `loading="lazy" decoding="async"` em toda imagem abaixo da dobra.
- Hero/LCP fica eager, com `fetchpriority="high"` se for a maior imagem
  visivel no primeiro viewport.
- Assets novos convertidos pra WebP antes de entrar no projeto (os PNGs em
  `brand/logo/` sao fonte/master, nao precisam ser convertidos, mas qualquer
  export usado na LP final deve sair em WebP).
- Video: preferir embed externo (YouTube/Vimeo) com `loading="lazy"` no
  iframe. So autohospedar se for clipe curto/mudo tipo hero loop, em WebM.

## Stack e arquitetura (definidas, LP implementada)

- **Stack:** Vite + Tailwind v4 (plugin `@tailwindcss/vite`) + JS vanilla
  modular + GSAP (npm, so core + ScrollTrigger). CSS inline no build (plugin
  `inlineCss` no `vite.config.js`, espelhado do `proposta-cypher`). Fontes via
  `@fontsource` (Manrope 600/700/800, Inter 400/500/600, latin woff2).
- **Arquitetura Feature-Sliced:** cada secao e um modulo vertical em
  `src/modules/<secao>/` (`<nome>.js` + `.css` + `.data.js` com a copy).
  Contrato: `{ id, render(): HTMLElement, init(ctx): cleanup }`, com
  `ctx = { gsap, ScrollTrigger, mm, reduced }`. Ordem da pagina num array
  unico em `src/app/page.js`. GSAP so via `src/app/motion.js` (registro unico).
- **Efeitos compartilhados** em `src/effects/`: `falow-path` (traço verde por
  scroll + gatilhos amarelos, port do scroll-draw-ribbon), `reveal` (IO
  anti-FOUC gated por `html.reveal-on` + reduced-motion), `split-text`,
  `svg-wipe` (wipe de ancora). Preloader e ink-menu em `src/modules/`.
- **Narrativa em 3 atos:** hero+problema escuros -> miolo claro (2 secoes
  cinematograficas sticky: como-funciona 300vh com Falow Path, builder 250vh
  com fluxo se montando por scrub) -> CTA final escuro. So essas 2 secoes
  altas; scrub 1; amarelo SO em gatilho.
- **Rodar/buildar:** `npm run dev` (porta 5174) · `npm run build` ·
  `npm run preview`. Lighthouse atual: perf 94 · a11y 100 · bp 100 · seo 100.
- **Deploy:** Cloudflare Pages, projeto **falow-lp**, no ar em
  https://falow-lp.pages.dev (conta `dbcff9abde3df964100df4b1d3a41798`).
  Sem dominio custom por ora (decisao do usuario: fica no `.pages.dev`).
  Republicar:
  ```
  $env:CLOUDFLARE_API_TOKEN = "<TOKEN DEPLOY>"
  $env:CLOUDFLARE_ACCOUNT_ID = "dbcff9abde3df964100df4b1d3a41798"
  npm run build
  npx wrangler pages deploy dist --project-name falow-lp --branch main --commit-dirty=true
  ```

```
falow-lp/
  brand/               # design-system.md + logo/ (masters PNG)
  public/              # favicon.svg/png, apple-touch-icon, og-cover.webp, robots.txt, brand/
  src/
    app/               # page.js (ordem), motion.js (GSAP unico)
    modules/           # 1 modulo vertical por secao + preloader + nav
    effects/           # falow-path, reveal, split-text, svg-wipe
    shared/ui/         # primitivos agnosticos (button, badge, icons, brandMark)
    styles/global.css  # @theme com tokens do DS
  tasks/               # todo.md (progresso), research/ (prints do produto)
```

### Marca em vetor (nao redesenhar de olho)
- **Wordmark**: `src/shared/ui/falowWordmark.js`, extraido do `svg.svg` oficial
  (1 path por letra, miolos de "a" e "o" como furo via `fill-rule: evenodd`).
- **Simbolo (anel + ponto)**: `src/shared/ui/brandMark.js`. A geometria foi
  **medida** no `svg.svg` (ajuste de circulo sobre o tracado), nao desenhada:
  lacuna de 52.02° centrada em 222.4° (canto superior esquerdo), espessura
  0.352 do raio, ponto com raio 0.264 e distancia 1.179 do raio.
  `ASSINATURA` guarda a versao no espaco de coordenadas do vetor original, que
  o preloader anima; esses numeros estao espelhados no `<svg id="pl-lockup">`
  do `index.html` (marcacao critica). Mexeu num, mexe no outro.
- Qualquer novo uso da marca sai daqui. Nao remontar com fonte comum nem
  aproximar o anel no olho.

### Pendencias com o usuario
- Termos/Privacidade do footer; planos/precos (modulo pricing-cta vira tabela).
- Dominio de deploy + aprovacao para primeiro commit.

## Regras de trabalho

- Seguir o CLAUDE.md global (plan mode, verificacao antes de done, skill
  `modular-arch` pra qualquer codigo, simplicidade, pesquisar antes de
  editar).
- Nao inventar features, numeros ou prova social que o usuario nao confirmou.
- **Nunca commitar/pushar sem aprovacao explicita** do usuario em cada caso.
