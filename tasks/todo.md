# Falow LP · plano e progresso

Plano completo aprovado em 08/08/2026 (arquitetura em 3 atos, efeitos adaptados
das referências de `efeitos-seções-botoes que quero usar/`). Stack: Vite +
Tailwind v4 + JS vanilla modular (Feature-Sliced) + GSAP npm.

## Fases

- [x] **F0 Scaffold**: Vite + tokens do DS em @theme + 10 seções montadas por
      módulos verticais (`src/modules/*`) com copy real nos `.data.js`.
- [x] **F1 Identidade estática**: anel SVG próprio, botão sweep, badges, temas
      claro/escuro por seção, nav fixa com troca de tema por IO, footer com
      crédito Method Growth Hub.
- [x] **F2 Mockups**: builder de sequências (Gatilho→Mensagem→Botões ramificando,
      fios verdes + gatilhos amarelos) e dashboard dark (KPIs, sparkline, logs
      com pills). Réplicas HTML/CSS, sem dados pessoais dos prints.
- [x] **F3 Reveal + micro**: motor IO anti-FOUC (`html.reveal-on` + gate
      reduced-motion), split de chars no hero, countUp, sparkline por
      dashoffset, tabs ARIA com stagger, marquee CSS -33.333%.
- [x] **F4 Falow Paths**: `effects/falow-path` (port do scroll-draw-ribbon com
      pontos-gatilho via getPointAtLength + ponto-cabeça + reduced-motion real).
      "Como funciona" 300vh sticky com path serpenteando entre 4 cards;
      "Builder" 250vh com fluxo se montando por scrub (ScrollTrigger).
- [x] **F5 Preloader + menu + wipes**: preloader com barra fake ancorada em
      fonts.ready, anel desenhando e íris abrindo (skip por sessionStorage);
      ink menu com clip-path do centro do botão, focus trap e Escape; wipe de
      âncora (traço engorda até cobrir, scroll coberto).
- [x] **F6 Polimento**: OG/meta/JSON-LD, favicons gerados, greps de QA
      (travessão zero na copy, amarelo só em gatilho), Lighthouse.

- [x] **F7 Hero com foto + conversa (10/08/2026)**: hero refeito sobre a foto
      `fundo.png` (convertida pra `public/hero-bg.webp` 1920x1024 54 KB +
      variante 960 de 21 KB, srcset; 1764 KB -> 54 KB). LCP eager com
      `fetchpriority="high"`, véu em gradiente pro texto ler na esquerda.
      Conversa em loop no canto direito (mecânica copiada da LP do ManyChat,
      medida no site com Playwright): bolhas ancoradas no rodapé da pilha, a
      nova entra por opacidade e as anteriores sobem exatamente
      `altura da nova + gap`. Ritmo replicado: fade 0.65s ease-out, empurrão
      0.65s, atraso de 0.25s entre empurrão e fade, hold 0.9s, saída subindo
      50px com stagger 0.25s, 0.35s de tela limpa, loop. Copy: e-book +
      "Baixar ebook" -> pergunta do usuário -> link + "Vamos lá!".
      Módulo: `hero.js` + `heroChat.js` + `hero.css` + `hero.data.js`.
      Diferença consciente do ManyChat: as 3 bolhas ficam visíveis no clímax
      (o ManyChat some com a 1a por falta de espaço), pra conversa ser lida
      inteira. Loop pausa fora da tela (IO) e remonta no resize.
      Verificado em 1440/1280/1024/768/390/360: hero = 100svh no desktop,
      folga horizontal de 71 a 152px entre texto e conversa, abaixo de 1024px
      a conversa entra no fluxo (altura via `--stack-h`) e nunca cobre os
      CTAs, reduced-motion mostra a conversa montada e parada, 0 erro de
      console, build ok.

- [x] **F8 Padrão de enquadramento (10/08/2026)**: escala responsiva
      revisada como sistema, não por ajuste pontual. Tokens novos em
      `global.css` (`--fs-display/title/body-lg/body/label`, `--gutter`,
      `--space-*`). Regra central: **display escala pela MENOR dimensão da
      tela** (`min(vw, vh)`), porque escalar só por largura quebra em tela
      baixa (notebook 1366x768, 1024x600, celular deitado têm largura de
      desktop e altura de celular). Padrão adotado: rótulo + título +
      subtítulo + CTA primário sempre acima da dobra; conversa inteira
      visível quando a altura permite.
      Corrigidos: scroll horizontal real vindo do `#dashboard` (coluna de
      grid tem `min-width: auto`, resolvido com `minmax(0, 1fr)`); celular
      deitado, que era o pior caso (hero 523px maior que a tela e conversa
      cobrindo o título), agora é layout de 2 colunas com bolha compacta;
      texto de leitura subiu de 14,7-15,2px pra 16-17px em 6 seções
      (problema, como-funciona, builder, casos, diferenciais, faq).
      Removidas as utilities do Tailwind do `.hero-inner`: `w-full` vencia
      o `width` das media queries na cascata.
      Verificado em 15 viewports de 320x568 a 2560x1440, incluindo
      740x360 / 844x390 / 932x430 (deitado) e 1024x600 / 1366x768
      (notebook baixo): 0 overflow horizontal, CTA na dobra em todos,
      folga de 74 a 357px entre texto e conversa, 0 reveal preso,
      0 erro de console, build ok.

- [x] **F9 Direção das mensagens + foto no avatar (10/08/2026)**: a conversa
      do hero agora deixa explícito de que lado veio cada mensagem, como no
      ManyChat. Pessoa alinhada à esquerda (com foto), Falow à direita em
      verde; bolha faz hug no conteúdo em vez de esticar (`flex: 0 1 auto`),
      rabinho no canto do lado de origem, e a bolha da pessoa é mais estreita
      (74% contra 82%) pra borda direita ficar visivelmente curta. A entrada
      desliza 20px do próprio lado (`x` por lado no `buildLoop`), reforçando
      a direção. Avatar: retrato da Unsplash (licença de uso comercial sem
      atribuição), recortado no rosto, 192px WebP de 3,6 KB em
      `public/avatars/cliente.webp`, caminho no `hero.data.js` pra trocar por
      foto própria depois. Verificado em 390x844, 844x390 e 1440x900: avatar
      carrega, 0 overflow, 0 erro de console, build ok.

- [x] **F10 Descendente cortado + hover do CTA (10/08/2026)**:
      1. O "g" de "segundos" (e todo descendente) aparecia cortado: a máscara
      do split de caracteres (`.st-mask`) tem `overflow: clip` e a caixa do
      inline-block tem a altura do `line-height`, que no título apertado
      (1.04) é menor que o alcance do glifo. Resolvido com
      `padding-bottom: .22em` + `margin-bottom: -.22em` (aumenta só a área de
      recorte, layout não se move) e `translateY(135%)` no char, pra ele
      continuar totalmente escondido antes da entrada.
      2. O hover do CTA primário varria PRETO, e sobre o hero escuro o botão
      principal sumia no fundo, virando gêmeo do secundário: hierarquia
      invertida bem na hora que o usuário mira. Passou a varrer verde claro
      (`--color-green-bright #7ef2a9`, tint nova derivada da marca), texto
      preto nos dois estados, mais glow verde e elevação de 1px. Decisão
      confirmada com o usuário entre 3 alternativas. Adicionado
      `@media (hover: none)` pra o sweep não ficar preso aceso depois do tap
      no celular, e `:focus-visible` recebendo o mesmo estado do hover.
      Nota de método: verificação em headless exige forçar frames com
      screenshots, senão o rAF fica congelado e a medição pega um estado
      parado no meio da animação (foi o que gerou 2 diagnósticos falsos).

- [x] **F11 CTA com rolagem de rótulo (10/08/2026)**: efeito do `a.cta` da
      damascenafilms.com.br portado (CSS lido do bundle deles), com os tokens
      do Falow. Mecânica: rótulo duplicado, o de cima sobe `translateY(-110%)`
      e a cópia entra de `110%`, curva `cubic-bezier(.65,.05,0,1)` em 0.5s,
      mais a seta deslizando 4px em 0.3s. Nada da paleta de origem veio junto
      (eles usam azul #1568fb sobre #111); cores e textos seguem os nossos.
      Virou primitivo compartilhado `shared/ui/ctaButton.js` em vez de repetir
      a marcação nos 6 pontos (hero x2, nav, ink menu, pricing, cta final).
      Seta só nos CTAs de conversão, não no compacto da nav.
      Tratados os casos que a origem não cobre: `@media (hover: none)` pro
      rótulo não ficar rolado pela metade depois do tap, e `:focus-visible`
      recebendo o mesmo estado do hover. Reduced-motion copiado da origem.
      Verificado em 1440x900 e 390x844: 6 CTAs, todos com rolagem, nenhum
      rótulo vazio, alvo mínimo de 40px, 0 overflow, 0 reveal preso,
      0 erro de console, build ok.
      Ajuste (mesma data): seta removida de todos os CTAs e o sweep
      direcional saiu de vez. A cor agora só troca por fade
      (`transition: background-color .5s ease`), igual à referência, sem
      camada `::before` varrendo de lado. Caiu junto o `isolation: isolate`
      e o `overflow: hidden` do botão, que só existiam pro sweep.
      Ajuste 2 (mesma data): a rolagem ficou só no CTA primário. O
      secundário (`cta-ghost`, "Ver como funciona") sai do `ctaButton()` com
      rótulo simples, sem a marcação duplicada, e no hover só acende a borda
      verde. Com os dois girando, o movimento parava de sinalizar qual é a
      ação principal.

## Verificações executadas (Playwright headless)

- Todas as seções montam, zero erros de console em todos os cenários.
- Reveal: 0 elementos ocultos após scroll completo; reduced-motion nunca
  esconde nada; countUp chega nos valores.
- Cine: path 47% desenhado = 2 gatilhos acesos = 2 cards visíveis (sincronia);
  builder monta os 4 nós até o fim do scrub.
- Preloader: 1a visita roda e é removido; reload pula; scroll destravado.
- Ink menu: abre em mancha do botão, aria correto, Escape fecha.
- Wipe: cobre, aterrissa na âncora, descobre.

## Deploy

- [x] **09/08/2026 · no ar**: Cloudflare Pages, projeto `falow-lp`,
      https://falow-lp.pages.dev (deploy `21e033b8`). Sem domínio custom
      (decisão: fica no `.pages.dev`). Publicado do `dist/` local, o repo
      ainda não tem commit, então não há build automático por push.
- Verificado no ar: 200 · 10 seções montam · 0 erro/warning de console ·
  0 reveal preso · preloader removido · crédito Method Growth Hub com
  `rel="noopener"` · favicon, og-cover e bundle JS respondendo 200.

- [x] **F12 Logo oficial na navbar (10/08/2026)**: `logocompleta.png`
      (4096x1692) entrou no lugar do `brandMark()` na nav. Recorte pela caixa
      real do conteúdo (medida via canvas: 624,476 2922x689, o arquivo tinha
      muita margem transparente), redimensionado pra 475x112 (4x da altura de
      exibição) e exportado em WebP: 13,3 KB.
      O wordmark do arquivo é branco e a nav vira clara sobre as seções
      claras, então ele sumiria. Gerada uma segunda variante (12,3 KB) que
      troca só o branco pelo preto da marca (critério por saturação e
      luminância, 15.550 pixels), preservando anel verde e ponto amarelo; as
      duas alternam por `[data-theme]` no CSS, sem JS.
      Verificado: as duas carregam, altura 28px no desktop e 22px no celular,
      folga de 42px pro CTA da nav, 0 overflow, 0 erro de console, build ok.
      `brandMark()` continua no rodapé e `ringSvg()` no preloader e no CTA
      final, que não foram alvo deste pedido.

- [x] **F13 Wordmark vetorial + nav que encolhe (11/08/2026)**: `svg.svg`
      (traço invertido: retângulo do tamanho da tela com o logo como furo)
      processado pra extrair só a palavra. Parser de subpaths escrito na mão
      pra separar os 10 subpaths, descartando o retângulo, o anel e o ponto,
      e remontando **1 path por letra** (f, a, l, o, w) com os miolos do "a"
      e do "o" reanexados como furo via `fill-rule: evenodd`.
      Em `shared/ui/falowWordmark.js`, com `currentColor`: acompanha o tema
      do nav sozinho, o que aposentou as 2 variantes raster do F12.
      Animação (nav do ManyChat): ao sair do hero as letras **descem** uma a
      uma (50ms de atraso entre elas), começando pelo "w" e terminando no
      "f", de modo que a palavra recolhe na direção do ícone em vez de fugir
      dele. O espaço só fecha depois que a última cai.
      Gatilho: sentinela de 4px no topo do documento observada por
      IntersectionObserver, então recolhe já no primeiro scroll (medido:
      dispara a partir de 6px) e volta ao normal no topo. Sem listener de
      scroll, sem trabalho por frame.
      Ícone segue sendo o oficial (`icone.png` -> WebP
      4,2 KB), a barra não muda de forma.
      Favicons refeitos do `icone.png`: 32px e 192px transparentes, e
      apple-touch-icon sobre o preto da marca (iOS ignora transparência).
      Erros cometidos no caminho, registrados pra não repetir: (1) troquei o
      ícone oficial pela aproximação `ringSvg` sem ninguém pedir, quando o
      pedido era só a palavra; (2) o `<g>` do wordmark tem `scale(0.1,-0.1)`,
      então `translateY` positivo sobe na tela, e as letras subiram em vez de
      descer. Direção conferida em coordenadas de tela (topo 0 -> 24px).

- [x] **F14 Símbolo medido no vetor oficial + preloader é a logo se montando
      (14/08/2026)**: o usuário apontou que a marca do preloader era inventada.
      Era mesmo: o `ringSvg` tinha sido desenhado de olho, com a lacuna no topo
      (em vez do canto superior esquerdo) e o traço quase 50% mais grosso que o
      real.
      Geometria refeita **por medição**, não por desenho: os subpaths do
      `svg.svg` foram achatados (béziers amostradas) e o anel e o ponto
      passaram por ajuste de círculo por mínimos quadrados, iterando pra separar
      arco externo de arco interno. Saiu centro (974.27, 820.07), raio de linha
      de centro 292.79, espessura 103.07, lacuna de 52.02° centrada em 222.4°,
      ponto r=77.30 a 1.179 raio de distância. Conferido sobrepondo o arco
      reconstruído no arquivo original: fecha sem folga.
      Preloader reescrito: a pílula com barra de progresso saiu, quem indica
      progresso agora é o próprio anel (a marca já tem forma de barra circular).
      Ordem: ponto amarelo dispara (o gatilho) -> o anel corre em volta e fecha
      o ciclo -> o símbolo recua e as 5 letras sobem uma a uma, completando a
      assinatura -> a íris abre a partir do **furo do anel**.
      Símbolo e palavra vivem no MESMO `<svg>`, com a viewBox no bbox da
      assinatura oficial: espaçamento e alinhamento saem de graça, sem medir
      nada em runtime. Só o símbolo vem no `index.html` (pinta no 1º quadro);
      o path grande da palavra entra por JS. A espera de `fonts.ready` saiu do
      começo (tela preta parada por até 1.2s) e virou uma pausa antes da íris.
      Rodapé passou a usar o wordmark vetorial, nas proporções da assinatura
      oficial (palavra 0.903 do diâmetro do anel, respiro 0.2065).
      Três armadilhas do GSAP no caminho, registradas: (1) `xPercent` não mede
      `<svg>` raiz (não tem `offsetWidth`), por isso o transform mora numa div;
      (2) o GSAP lê o `translateX(%)` que o CSS crítico deixou e guarda como px,
      então `xPercent` **soma** em cima: precisa de `x: 0` explícito;
      (3) `transform: scale(0)` no CSS é degenerado, e ao rebasear a origem o
      GSAP gera um deslocamento lixo: o estado inicial escondido tem que ser por
      opacidade. Verificado em 1440 e 375, dev e build.

## Oferta: 14 dias grátis, preço só na plataforma
- [x] `src/shared/config/oferta.js`: fonte única do teste (dias, rótulos) e do
      destino de todo CTA de conversão. Nav, ink-menu, hero, seção de oferta,
      FAQ e CTA final leem daqui, ninguém repete o número.
- [x] Teste só no fecho da página: título e chip da seção de oferta, item de
      FAQ, botão "Testar 14 dias grátis" + nota no CTA final. Nav e hero ficam
      com "Começar agora" (`ctaPadrao`), sem microcopy de teste no topo:
      decisão do usuário, o teste é argumento de quem desceu a página inteira.
- [x] Preço fora da landing: nada de tabela. A seção de oferta diz onde o valor
      mora ("planos e preços você vê dentro da plataforma") e o FAQ ganhou um
      "Quanto custa?" que aponta pro mesmo lugar. `pricing-cta` é seção de
      oferta, não de precificação (decisão registrada no CLAUDE.md).
- [x] Sem promessa de "sem cartão": o teste pede cartão na entrada, então o
      redutor de risco continua sendo "cancela quando quiser".
- [x] Meta description e og:description com o teste.
- [x] Verificado em 1440 e 375 no build (`npm run preview`): o botão da faixa de
      oferta ganhou `flex: none` + `nowrap` (o rótulo mais longo quebrava em
      três linhas no layout em linha), sem overflow horizontal.

## Pendências (com o usuário)
- [ ] **URL de cadastro da plataforma.** Enquanto `cadastroUrl` for `null`, os
      CTAs rolam pra seção de oferta. Chegou a URL, muda uma linha em
      `src/shared/config/oferta.js` e a página inteira aponta pro app.
- [ ] Links de Termos/Privacidade do footer.
- [ ] Domínio de deploy (Cloudflare Pages, conta padrão) e aprovação pra
      primeiro commit (regra: nunca commitar sem aprovação explícita).
- [ ] Confirmar se "Inbox unificada" entra no roadmap da LP (hoje fora, seção
      Dashboard no lugar).
