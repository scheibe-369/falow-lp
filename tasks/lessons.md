# Lições (Falow LP)

Padrões que já deram problema aqui. Reler no começo da sessão.

## 1. Marca não se desenha de olho

**O que aconteceu (14/08/2026):** o símbolo do Falow (anel + ponto) tinha sido
escrito à mão como `M 24.8 11.9 A 21.5 21.5 ...` num viewBox 64. Passou por
"parecido o bastante" e ficou meses no preloader, no rodapé e no CTA final. Não
era: a lacuna estava no topo em vez do canto superior esquerdo, o traço era 51%
do raio contra 35% do real, e o ponto encostava na ponta do arco. O usuário
apontou.

**Regra:** quando existe vetor oficial da marca no repositório, a geometria sai
dele, medida. Nunca aproximada no olho, nem "só pra prototipar" (protótipo vira
produção).

**Como medir um traço do potrace** (o `svg.svg` é um traço invertido: retângulo
do tamanho da tela com o logo como furo):
1. Separar os subpaths e achatar as béziers em pontos (amostrar cada curva).
2. Ajuste de círculo por mínimos quadrados (Kasa) nos pontos, iterando pra
   separar arco externo de arco interno. Daí saem centro, raio e espessura.
3. A lacuna se mede no raio externo: as pontas do arco externo caem exatamente
   nos ângulos das extremidades da linha de centro (a tampa redonda tangencia
   ali), então o maior buraco angular entre pontos externos é a abertura real.
4. **Conferir sobrepondo** o vetor reconstruído no arquivo original, em cor
   contrastante. Se sobrar franja, a medida está errada.

## 2. GSAP + SVG: três armadilhas

Todas custaram um ciclo de depuração no preloader.

- **`xPercent` não funciona em `<svg>` raiz.** Ele mede `offsetWidth`, que
  `SVGSVGElement` não tem. O valor sai errado sem lançar erro. Solução: o
  transform mora numa `div` que embrulha o SVG.
- **`xPercent` soma com o `x` lido do CSS.** Se o CSS crítico já deixou
  `transform: translateX(38%)`, o GSAP converte pra px e guarda em `x`. Um
  `gsap.set({ xPercent: 38 })` depois disso **dobra** o deslocamento. Sempre
  passar `x: 0` explícito junto.
- **Não esconder por `transform: scale(0)` no CSS.** Ao rebasear a origem
  (`transformOrigin`), o GSAP tenta preservar o transform que já estava lá, e
  `scale(0)` não tem inversa: o resultado é um deslocamento lixo. Esconder por
  opacidade e deixar o GSAP zerar a escala já com a origem certa.

## 3. Valor de função em tween congela no primeiro render

`.to(obj, { r: () => valor })` avalia a função no primeiro render do tween, não
a cada play. Se `valor` é calculado por um callback anterior na timeline, e a
timeline for buscada (`seek`) antes, o tween grava o valor velho (normalmente 0)
e nunca mais corrige. Quando a medida depende do estado da tela na hora,
animar um `{ v: 0 }` de 0 a 1, medir no `onStart` e calcular o valor real no
`onUpdate`.

## 4. Eixo Y invertido dentro do wordmark

O `<g>` do wordmark tem `transform="translate(0,1695) scale(0.1,-0.1)"`. Dentro
dele **`translateY` positivo sobe na tela**. Conferir direção em coordenadas de
tela antes de dar como pronto; já subiu letra que era pra descer.

## 5. CSS de módulo não estiliza classe compartilhada

`.wm-letra` ganhou `transition` solta no `nav.css`. A mesma classe aparece no
preloader e no rodapé, onde quem anima é o GSAP: a transição do CSS briga com
os valores inline do GSAP. Transição de comportamento de um módulo fica
escopada nele (`.site-nav .wm-letra`); só o que é do primitivo (aqui,
`transform-box: fill-box`) vai pro `shared/ui/ui.css`.

## 6. O preloader não deve esperar antes de animar

A versão antiga travava a timeline inteira em `fonts.ready` (teto de 1.2s): tela
preta parada, depois a animação. A espera vai no **fim** (uma pausa antes da
revelação), não no começo. E a marcação do primeiro quadro mora no
`index.html`, não no bundle, senão o preloader só pinta quando o JS chega.

## 7. Traçado que já existe se remede, não se redesenha

Os fios do mockup de sequências desencaixavam dos cards em telas diferentes
porque o `d` era fixo no viewBox. A primeira tentativa trocou o desenho por
uma fórmula genérica de bezier: encaixou, mas matou a curva (a fórmula
escolhia o eixo da tangente pelo maior delta, então fio que sai pela lateral
do card saía subindo reto, virava gancho). O usuário reclamou do formato, não
do encaixe.

Regra: quando o problema é **posicionamento** de algo que já foi desenhado à
mão e aprovado, a saída é converter aquele desenho em fração da caixa real
(medida) e manter os mesmos números. Não substituir por algoritmo genérico.
As frações de `wireSpecs` em `builder.js` saíram literalmente do `d` de
`mockupSequencia.js`; conferir uma coisa contra a outra ao mexer.

Dois detalhes que vieram junto:
- A tangente do bezier é a do **lado** de onde o fio nasce, nunca deduzida de
  dx/dy.
- O fio começa dentro do card de origem de propósito (o SVG fica atrás dos
  nodes): o começo some sob o card e o que aparece já é o meio da curva. Isso
  também garante que ele nunca boie longe da borda.

## 8. Fio de fluxo precisa de vão e de desvio, não só de fórmula

O terceiro fio do mockup (Botões -> Mensagem) saía uma reta vertical perfeita.
Motivo medido no navegador, não no olho: as duas âncoras resolviam pro **mesmo
x** (`dx = 0.2` num `dy` de 46). Bezier com controles alinhados no eixo é
segmento de reta, por definição. Nenhum ajuste de `BOW` conserta isso.

Regra: ao ancorar conector por fração de caixa, medir o `dx`/`dy` que aquelas
frações produzem de fato. Fração diferente (`0.64` vs `0.82`) não garante
coordenada diferente quando os cards têm origem e largura diferentes.

E o arco só existe se houver espaço pros dois lados:
- **Desvio lateral**: veio de mover o card de destino no eixo x (`66% -> 56%`).
- **Vão vertical**: é o que encolhe sozinho em tela estreita (card cresce em px
  quando o texto quebra, canvas escala em %). Por isso o braço vertical do
  bezier passou a crescer junto com o desvio lateral
  (`max(|dy| * 0.55, |dx| * 0.45)`): com vão curto a curva vira rampa
  diagonal se o braço só olhar pro `dy`.

Armadilha achada no caminho: **`min-height` em elemento com `aspect-ratio`
também é piso de largura.** Subir `min-height` do `.sq-canvas` de 18rem pra
22rem forçou 704px de largura mínima e estourou o grid. Não é caminho pra
ganhar altura.
