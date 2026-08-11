# Falow — Design System

> Documento extraído visualmente do brand board fornecido.  
> Os códigos de cor são explícitos na peça. Tipografia, espaçamentos e regras de interface foram inferidos a partir da composição e organizados para uso prático em site, landing page, dashboard e SaaS.

---

## 1. Essência da marca

**Nome:** Falow  
**Tagline:** Conversas que viram vendas.  
**Categoria:** Automação conversacional, atendimento, vendas e operações via mensagens.

### Atributos visuais

- Direta
- Tecnológica
- Leve
- Conversacional
- Modular
- Orientada a fluxo
- Comercial
- Amigável sem parecer infantil

### Conceito central

O sistema visual representa conversas em movimento.

O símbolo circular aberto funciona como:

- balão de conversa;
- ciclo de automação;
- fluxo contínuo;
- gatilho;
- acompanhamento de leads;
- transformação de conversa em venda.

O ponto amarelo representa o evento que inicia, conecta ou conclui uma ação.

---

## 2. Logotipo

### 2.1 Marca principal

Composição:

- símbolo verde à esquerda;
- ponto amarelo na região superior esquerda;
- wordmark `falow` em preto;
- tagline centralizada abaixo.

### Assinatura principal

```text
[SÍMBOLO] falow
Conversas que viram vendas.
```

### Regras

- Sempre preservar a proporção original.
- Não redesenhar o wordmark usando uma fonte comum.
- O lettering `falow` deve ser tratado como ativo vetorial próprio.
- Manter área de respiro equivalente a, no mínimo, a largura do ponto amarelo em todos os lados.
- Em aplicações pequenas, remover a tagline antes de reduzir excessivamente o conjunto.
- Evitar aplicar efeitos, sombras, contornos ou bevel.

---

## 3. Símbolo isolado

O símbolo pode ser usado como:

- ícone de aplicativo;
- favicon;
- avatar social;
- selo;
- loader;
- botão de automação;
- marcador de etapas;
- elemento decorativo.

### Estrutura

- anel incompleto verde;
- espessura alta e arredondada;
- ponto amarelo deslocado na parte superior esquerda;
- fundo preferencial preto em ícones de aplicativo;
- cantos externos fortemente arredondados.

### App icon

```text
Fundo: Falow Black
Símbolo: Falow Green
Ponto: Trigger Yellow
Formato: quadrado com raio entre 22% e 26%
```

### Favicon / avatar

- fundo circular preto;
- símbolo centralizado;
- manter margem interna mínima de 18%;
- não inserir texto.

---

## 4. Arquitetura de marca

### 4.1 Falow

Produto ou marca principal.

```text
[SÍMBOLO PRINCIPAL] falow
```

### 4.2 Falow Automations

Usa uma extensão ascendente no símbolo, sugerindo derivação, gatilho ou conexão.

```text
[SÍMBOLO AUTOMATIONS] falow — automations
```

### 4.3 Falow Inbox

Usa uma extensão inferior direita, sugerindo mensagem, entrada e continuidade.

```text
[SÍMBOLO INBOX] falow — inbox
```

### Regras das assinaturas

- `falow` permanece em peso alto.
- O nome do módulo usa peso regular.
- Separador recomendado: travessão longo `—`.
- O módulo deve ter menor contraste e menor hierarquia que a marca principal.
- O símbolo pode sofrer pequenas adaptações, desde que preserve:
  - espessura;
  - curvatura;
  - terminais arredondados;
  - ponto amarelo;
  - sensação de fluxo.

---

## 5. Paleta de cores

## 5.1 Cores oficiais

| Token | Nome | HEX | Uso |
|---|---|---:|---|
| `--falow-black` | Falow Black | `#0B0D0C` | fundos escuros, textos, app icon |
| `--clear-white` | Clear White | `#F7F8F3` | fundo principal claro |
| `--falow-green` | Falow Green | `#32E875` | marca, fluxos, ações positivas |
| `--trigger-yellow` | Trigger Yellow | `#FFD43B` | gatilhos, alertas, pontos de conexão |

## 5.2 Cores auxiliares derivadas

As cores abaixo não aparecem nomeadas no board, mas são úteis para construir a interface sem descaracterizar a marca.

| Token | HEX | Uso sugerido |
|---|---:|---|
| `--surface-white` | `#FFFFFF` | cards e superfícies elevadas |
| `--surface-soft` | `#F2F4EE` | áreas secundárias |
| `--border-light` | `#D9DDD5` | bordas claras |
| `--text-muted` | `#667068` | textos secundários |
| `--green-dark` | `#087A45` | texto sobre verde claro |
| `--green-soft` | `#DDFBE8` | badges e feedbacks positivos |
| `--yellow-soft` | `#FFF3BA` | avisos e gatilhos suaves |
| `--danger` | `#E5484D` | erros e ações destrutivas |
| `--danger-soft` | `#FFE5E5` | fundo de mensagens de erro |

## 5.3 Combinações aprovadas

### Fundo claro

```text
Fundo: #F7F8F3
Texto: #0B0D0C
Símbolo: #32E875
Ponto: #FFD43B
```

### Fundo preto

```text
Fundo: #0B0D0C
Texto: #F7F8F3
Símbolo: #32E875
Ponto: #FFD43B
```

### Fundo verde

```text
Fundo: #32E875
Texto: #0B0D0C
Símbolo: #0B0D0C ou variação monocromática
Ponto: #FFD43B
```

### Fundo amarelo

```text
Fundo: #FFD43B
Texto: #0B0D0C
Símbolo: #32E875 ou #0B0D0C
```

### Restrições

- Evitar texto branco sobre amarelo.
- Evitar texto verde sobre amarelo em tamanhos pequenos.
- Em fundos verdes, priorizar texto preto.
- Não criar novos tons saturados que concorram com verde e amarelo.
- Reservar o amarelo para gatilhos, destaques e pontos de atenção.

---

## 6. Gradientes

O board usa volumes leves e transições suaves, sem aparência neon exagerada.

### Gradiente verde

```css
background: linear-gradient(
  135deg,
  #23C966 0%,
  #32E875 55%,
  #62F29A 100%
);
```

### Gradiente amarelo

```css
background: linear-gradient(
  135deg,
  #FFC928 0%,
  #FFD43B 55%,
  #FFE47A 100%
);
```

### Gradiente escuro

```css
background: linear-gradient(
  145deg,
  #070908 0%,
  #0B0D0C 60%,
  #151A17 100%
);
```

### Regra

Usar gradiente apenas para:

- fundos institucionais;
- ícones;
- áreas hero;
- realces de marca;
- peças de comunicação.

Não usar gradiente em textos longos, tabelas ou controles essenciais.

---

## 7. Tipografia

A tipografia exata não está declarada no board. A recomendação abaixo reproduz a mesma personalidade visual com boa disponibilidade para web e produto.

## 7.1 Família principal — Manrope

**Uso:** títulos, hero, números, indicadores, destaques e comunicação institucional.

```css
font-family: "Manrope", "Inter", sans-serif;
```

Pesos recomendados:

- 400 — regular
- 500 — medium
- 600 — semibold
- 700 — bold
- 800 — extrabold

Características:

- geométrica;
- limpa;
- moderna;
- terminais suaves;
- boa legibilidade;
- combina com a construção arredondada da marca.

## 7.2 Família de interface — Inter

**Uso:** dashboard, formulários, labels, botões, tabelas, menus e textos longos.

```css
font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Pesos recomendados:

- 400 — corpo;
- 500 — labels;
- 600 — botões e destaques;
- 700 — números, títulos de cards e KPIs.

## 7.3 Wordmark

O lettering `falow` é customizado e não deve ser reconstruído automaticamente.

Para protótipos temporários, as aproximações mais seguras são:

1. Manrope ExtraBold;
2. Satoshi Black;
3. Helvetica Now Display Black;
4. Circular Std Black.

A versão final deve usar o arquivo vetorial oficial.

---

## 8. Escala tipográfica

### Desktop

| Token | Tamanho | Altura de linha | Peso | Uso |
|---|---:|---:|---:|---|
| `display-xl` | 72px | 0.98 | 700–800 | hero institucional |
| `display-lg` | 56px | 1.02 | 700–800 | chamadas principais |
| `heading-1` | 48px | 1.08 | 700 | títulos de página |
| `heading-2` | 36px | 1.12 | 700 | seções |
| `heading-3` | 28px | 1.18 | 650–700 | cards grandes |
| `heading-4` | 22px | 1.25 | 600–700 | subtítulos |
| `body-lg` | 18px | 1.55 | 400 | textos institucionais |
| `body-md` | 16px | 1.50 | 400 | padrão |
| `body-sm` | 14px | 1.45 | 400–500 | UI |
| `caption` | 12px | 1.35 | 500–600 | metadados |
| `micro` | 10px | 1.25 | 600–700 | labels muito pequenos |

### Mobile

```text
display-xl: 48px
display-lg: 42px
heading-1: 36px
heading-2: 30px
heading-3: 24px
heading-4: 20px
body-lg: 17px
body-md: 16px
body-sm: 14px
caption: 12px
```

### Tracking

- títulos grandes: `-0.03em`
- títulos médios: `-0.02em`
- corpo: `0`
- labels em caixa alta: `0.04em`
- números de KPI: `-0.025em`

---

## 9. Grid e espaçamento

### Base

Sistema de múltiplos de 4px.

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120
```

### Tokens

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Containers

```text
Desktop máximo: 1280px
Desktop confortável: 1180px
Tablet: padding lateral de 32px
Mobile: padding lateral de 20px
```

### Grid recomendado

```text
Desktop: 12 colunas
Tablet: 8 colunas
Mobile: 4 colunas
Gutter desktop: 24px
Gutter mobile: 16px
```

---

## 10. Bordas e raios

O sistema visual usa cantos arredondados, porém controlados.

```css
--radius-xs: 8px;
--radius-sm: 12px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
--radius-pill: 999px;
```

### Aplicação

- inputs: 10–12px;
- botões: 10–14px;
- cards: 16–24px;
- modais: 24px;
- app icons: 24–28%;
- badges: pill;
- avatar/favicons: circular.

### Bordas

```css
border: 1px solid #D9DDD5;
```

Em fundo escuro:

```css
border: 1px solid rgba(255, 255, 255, 0.12);
```

---

## 11. Sombras

As sombras são suaves e discretas.

```css
--shadow-sm:
  0 1px 2px rgba(11, 13, 12, 0.06),
  0 4px 12px rgba(11, 13, 12, 0.04);

--shadow-md:
  0 8px 24px rgba(11, 13, 12, 0.08),
  0 2px 6px rgba(11, 13, 12, 0.05);

--shadow-lg:
  0 20px 50px rgba(11, 13, 12, 0.12);
```

### Regra

Não usar sombra preta pesada. A separação deve acontecer por:

- contraste de superfície;
- borda fina;
- espaço;
- sombra suave.

---

## 12. Botões

## 12.1 Primário

```text
Fundo: Falow Green
Texto: Falow Black
Raio: 12px
Altura: 44–48px
Peso: 600
```

Hover:

```text
Escurecer entre 5% e 8%
Mover 1px para cima opcionalmente
```

## 12.2 Secundário

```text
Fundo: transparente ou branco
Texto: Falow Black
Borda: 1px solid #D9DDD5
```

## 12.3 Gatilho

```text
Fundo: Trigger Yellow
Texto: Falow Black
Ícone: raio, ponto ou gatilho
```

Uso:

- iniciar automação;
- criar regra;
- adicionar evento;
- chamar atenção para uma ação específica.

## 12.4 Destrutivo

```text
Fundo: #E5484D
Texto: #FFFFFF
```

---

## 13. Inputs e formulários

### Input padrão

```text
Altura: 44–48px
Fundo: #FFFFFF
Borda: #D9DDD5
Raio: 10–12px
Padding horizontal: 14–16px
Texto: #0B0D0C
Placeholder: #8A938C
```

### Focus

```css
border-color: #32E875;
box-shadow: 0 0 0 3px rgba(50, 232, 117, 0.18);
```

### Estados

- sucesso: verde;
- aviso: amarelo;
- erro: vermelho;
- desabilitado: cinza claro com opacidade reduzida.

---

## 14. Cards

### Card padrão

```text
Fundo: #FFFFFF
Borda: 1px solid #D9DDD5
Raio: 16px
Padding: 20–24px
```

### Card de KPI

Estrutura:

```text
Ícone
Label
Valor principal
Comparativo ou tendência
```

Valores devem usar:

- Manrope;
- peso 700;
- tracking negativo;
- contraste alto.

### Card escuro institucional

```text
Fundo: Falow Black
Título: Clear White
Detalhes: Falow Green
Pontos de destaque: Trigger Yellow
```

---

## 15. Status e badges

### Sucesso

```text
Fundo: #DDFBE8
Texto: #087A45
```

Exemplos:

- Enviado
- Aguardando
- Concluído

### Gatilho

```text
Fundo: #FFF3BA
Texto: #6B5600
```

### Neutro

```text
Fundo: #EEF1EC
Texto: #4D5750
```

### Erro

```text
Fundo: #FFE5E5
Texto: #A1282D
```

---

## 16. Linguagem visual de fluxos

Os caminhos verdes são um elemento proprietário importante da marca.

### Características

- traço grosso;
- curvas orgânicas;
- terminais arredondados;
- pontos amarelos nos gatilhos;
- setas simples;
- movimentos em loop;
- cruzamentos ocasionais;
- variação controlada.

### Usos

- background decorativo;
- onboarding;
- builder de automações;
- timelines;
- etapas de funil;
- conexões entre cards;
- loaders;
- divisores;
- ilustrações de produto.

### Regras

- usar no máximo um caminho dominante por área;
- não competir com textos;
- evitar excesso de curvas;
- manter consistência de espessura;
- usar amarelo apenas em eventos relevantes;
- o caminho deve ter propósito funcional ou narrativo.

### Exemplo CSS

```css
.flow-line {
  fill: none;
  stroke: #32E875;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

### Ponto de gatilho

```css
.flow-trigger {
  fill: #FFD43B;
  stroke: none;
}
```

---

## 17. Ícones

### Estilo

- outline ou duotone simples;
- stroke entre 1.75px e 2px;
- cantos arredondados;
- sem excesso de detalhes;
- alinhamento óptico;
- preferencialmente monocromáticos.

### Bibliotecas recomendadas

- Lucide Icons;
- Phosphor Icons;
- Remix Icon.

### Uso de cor

- preto para padrão;
- verde para ação positiva;
- amarelo para gatilho;
- vermelho apenas para erro.

---

## 18. Interface SaaS

### Estrutura visual

- fundo geral claro;
- cards brancos;
- bordas finas;
- verde guiando fluxos;
- amarelo marcando gatilhos;
- preto para hierarquia e contraste;
- indicadores de status em pills;
- dados em blocos compactos.

### Builder de automação

Estrutura recomendada:

```text
Gatilho
↓
Ação
↓
Espera
↓
Condição
↓
Resultado
```

Cada etapa deve conter:

- ícone;
- categoria;
- título;
- descrição curta;
- estado;
- menu de contexto;
- conectores visuais.

### Métricas

Exemplo:

```text
Leads gerados: 128
Conversão: 32%
Vendas: R$ 24.680
```

### Hierarquia

1. resultado;
2. ação atual;
3. fluxo;
4. detalhes;
5. metadados.

---

## 19. Movimento e animação

### Princípios

- rápido;
- suave;
- funcional;
- orientado a fluxo;
- sem efeitos excessivos.

### Durações

```css
--duration-fast: 120ms;
--duration-base: 180ms;
--duration-slow: 280ms;
```

### Easing

```css
--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

### Animações recomendadas

- desenho progressivo de path;
- pulso sutil do ponto amarelo;
- entrada de cards em sequência;
- feedback de conclusão;
- transição de estados de automação.

### Restrições

- respeitar `prefers-reduced-motion`;
- não usar loops agressivos;
- não piscar elementos;
- evitar bounce excessivo.

---

## 20. Acessibilidade

### Contraste

- texto principal: Falow Black sobre Clear White;
- texto branco sobre Falow Black;
- texto preto sobre Falow Green;
- texto preto sobre Trigger Yellow.

### Regras

- corpo mínimo: 14px em UI;
- alvo clicável mínimo: 44×44px;
- nunca depender apenas da cor;
- usar ícone + label para estados importantes;
- foco visível em todos os controles;
- labels persistentes em formulários;
- feedback de erro objetivo.

---

## 21. Direção de fotografia e ilustração

### Fotografia

- ambientes claros;
- tecnologia em contexto real;
- equipes, vendas e atendimento;
- enquadramento limpo;
- luz natural ou soft light;
- contraste moderado;
- pontos verdes e amarelos como acentos.

### Ilustração

- linhas contínuas;
- curvas;
- diagramas;
- balões;
- setas;
- ciclos;
- abstrações de conversa.

### Evitar

- cyberpunk;
- neon excessivo;
- 3D genérico;
- bancos de imagem artificiais;
- robôs humanoides;
- excesso de gradientes azuis e roxos.

---

## 22. Tom visual por contexto

### Institucional

```text
Fundo claro
Tipografia grande
Muito espaço
Símbolo em destaque
Mensagem curta
```

### Produto

```text
Cards
Bordas leves
Dados objetivos
Fluxos verdes
Estados em badges
```

### Campanha

```text
Fundo preto, verde ou amarelo
Headline grande
Poucos elementos
CTA direto
Ponto amarelo como gatilho
```

### Redes sociais

```text
Contraste alto
Título curto
Logo pequeno
Caminhos como moldura ou direção visual
```

---

## 23. Tokens CSS

```css
:root {
  /* Brand */
  --falow-black: #0B0D0C;
  --clear-white: #F7F8F3;
  --falow-green: #32E875;
  --trigger-yellow: #FFD43B;

  /* Surfaces */
  --surface-white: #FFFFFF;
  --surface-soft: #F2F4EE;
  --border-light: #D9DDD5;

  /* Text */
  --text-primary: #0B0D0C;
  --text-secondary: #667068;
  --text-inverse: #F7F8F3;

  /* Functional */
  --green-dark: #087A45;
  --green-soft: #DDFBE8;
  --yellow-soft: #FFF3BA;
  --danger: #E5484D;
  --danger-soft: #FFE5E5;

  /* Radius */
  --radius-xs: 8px;
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-pill: 999px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Shadows */
  --shadow-sm:
    0 1px 2px rgba(11, 13, 12, 0.06),
    0 4px 12px rgba(11, 13, 12, 0.04);

  --shadow-md:
    0 8px 24px rgba(11, 13, 12, 0.08),
    0 2px 6px rgba(11, 13, 12, 0.05);

  --shadow-lg:
    0 20px 50px rgba(11, 13, 12, 0.12);

  /* Motion */
  --duration-fast: 120ms;
  --duration-base: 180ms;
  --duration-slow: 280ms;
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 24. Configuração Tailwind sugerida

```js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        falow: {
          black: "#0B0D0C",
          white: "#F7F8F3",
          green: "#32E875",
          yellow: "#FFD43B",
          "green-dark": "#087A45",
          "green-soft": "#DDFBE8",
          "yellow-soft": "#FFF3BA",
          surface: "#F2F4EE",
          border: "#D9DDD5",
          muted: "#667068",
          danger: "#E5484D",
        },
      },
      fontFamily: {
        display: ["Manrope", "Inter", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(11,13,12,.06), 0 4px 12px rgba(11,13,12,.04)",
        md: "0 8px 24px rgba(11,13,12,.08), 0 2px 6px rgba(11,13,12,.05)",
        lg: "0 20px 50px rgba(11,13,12,.12)",
      },
    },
  },
};
```

---

## 25. Exemplo de componente

```html
<div class="flow-card">
  <div class="flow-card__header">
    <div class="flow-card__icon">⚡</div>

    <div>
      <span class="flow-card__eyebrow">Gatilho</span>
      <h3>Novo comentário</h3>
    </div>

    <button aria-label="Mais opções">•••</button>
  </div>

  <div class="flow-step">
    <strong>Enviar mensagem</strong>
    <span>Agradecer e qualificar</span>
    <span class="badge badge--success">Enviado</span>
  </div>
</div>
```

```css
.flow-card {
  background: #FFFFFF;
  border: 1px solid #D9DDD5;
  border-radius: 16px;
  padding: 20px;
  color: #0B0D0C;
  box-shadow: var(--shadow-sm);
}

.flow-card__header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
}

.flow-card__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #FFD43B;
}

.flow-card__eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: #667068;
}

.badge {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge--success {
  background: #DDFBE8;
  color: #087A45;
}
```

---

## 26. Boas práticas

### Fazer

- usar bastante espaço em branco;
- trabalhar com frases curtas;
- destacar resultados;
- usar curvas para conduzir o olhar;
- tratar o amarelo como evento;
- tratar o verde como fluxo;
- manter UI simples e objetiva;
- priorizar contraste e legibilidade;
- construir componentes reutilizáveis.

### Não fazer

- distorcer o logo;
- reconstruir o wordmark com fonte comum na versão final;
- usar sombras pesadas;
- adicionar azul ou roxo como cor dominante;
- usar cantos totalmente retos em cards;
- poluir o layout com caminhos em excesso;
- usar amarelo como fundo de grandes blocos de texto;
- colocar verde sobre verde sem contraste;
- criar ícones muito detalhados;
- usar efeitos futuristas genéricos.

---

## 27. Checklist de implementação

### Marca

- [ ] Logo vetorial disponível
- [ ] Símbolo isolado disponível
- [ ] Versões clara, escura, verde e amarela
- [ ] Favicon
- [ ] App icon
- [ ] Assinaturas Falow, Automations e Inbox

### Tipografia

- [ ] Manrope carregada
- [ ] Inter carregada
- [ ] Pesos limitados aos realmente usados
- [ ] Fallbacks definidos
- [ ] Escala responsiva configurada

### Interface

- [ ] Tokens centralizados
- [ ] Grid de 4px
- [ ] Foco acessível
- [ ] Estados de botão
- [ ] Cards
- [ ] Badges
- [ ] Inputs
- [ ] Modais
- [ ] Builder de fluxo
- [ ] KPIs

### Qualidade

- [ ] Contraste validado
- [ ] Responsividade validada
- [ ] `prefers-reduced-motion`
- [ ] Componentes documentados
- [ ] Logo sem distorção
- [ ] Cores oficiais preservadas
