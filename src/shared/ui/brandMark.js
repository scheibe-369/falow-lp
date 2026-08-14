// Marca Falow: símbolo (anel aberto + ponto do gatilho) e assinatura completa.
//
// A geometria do símbolo NÃO é desenhada de olho. Ela saiu do vetor oficial
// (svg.svg, o traço da assinatura), medida por ajuste de círculo sobre o
// contorno do anel e do ponto. Conferida sobrepondo o arco reconstruído em
// cima do arquivo original: fecha sem folga.
//
// Medidas no espaço do vetor oficial (viewBox 4096x1695):
//   anel   centro (974.27, 820.07) · raio da linha de centro 292.79
//          espessura 103.07 · arco de 248.41° a 196.39° no sentido horário
//   ponto  centro (723.79, 582.65) · raio 77.30
//
// Razões que definem a marca (independem do tamanho):
//   espessura / raio        = 0.352
//   raio do ponto / raio    = 0.264
//   distância do ponto/raio = 1.179
//   abertura do anel        = 52.02°, centrada em 222.4° (canto superior esq.)

import { falowWordmark } from './falowWordmark.js';

// Mesmas razões acima levadas pro viewBox 64, com o raio externo em 30
// (2 unidades de folga pra borda não encostar no recorte).
export const SIMBOLO = {
  arco: 'M 22.617 8.289 A 25.5 25.5 0 1 1 7.536 24.805',
  espessura: 8.976,
  ponto: { cx: 10.187, cy: 11.322, r: 6.732 },
};

// A assinatura inteira no sistema de coordenadas do vetor original. A viewBox
// é o bbox exato de símbolo + palavra, então os dois já nascem na posição e no
// espaçamento oficiais: nada é medido em runtime. É o que o preloader anima.
// ATENÇÃO: estes números estão espelhados no <svg id="pl-lockup"> do
// index.html (marcação crítica, precisa pintar antes do bundle). Mexeu aqui,
// mexe lá.
export const ASSINATURA = {
  viewBox: '629.94 475.74 2912.06 688.66',
  arco: 'M 866.53 547.82 A 292.79 292.79 0 1 1 693.38 737.45',
  espessura: 103.07,
  ponto: { cx: 723.79, cy: 582.65, r: 77.3 },
  // centro do anel dentro da viewBox: é a origem dos transforms do preloader
  origemSimbolo: '11.824% 50%',
  // deslocamento (% da largura) que deixa só o símbolo centrado na tela
  deslocaSimbolo: 38.176,
  // raio interno / raio externo do anel: a íris abre a partir do furo
  razaoFuro: 241.26 / 344.33,
};

export function falowSymbol({ size = 64 } = {}) {
  return `
    <svg class="falow-symbol" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path class="fs-arc" d="${SIMBOLO.arco}"
            stroke="#32E875" stroke-width="${SIMBOLO.espessura}" stroke-linecap="round"/>
      <circle class="fs-dot" cx="${SIMBOLO.ponto.cx}" cy="${SIMBOLO.ponto.cy}" r="${SIMBOLO.ponto.r}"
              fill="#FFD43B"/>
    </svg>
  `;
}

// Assinatura horizontal: símbolo + wordmark, os dois em vetor oficial.
export function brandMark({ size = 28 } = {}) {
  return `
    <span class="brand-mark" style="--brand-size:${size}px">
      ${falowSymbol({ size })}
      ${falowWordmark()}
    </span>
  `;
}
