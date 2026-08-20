// Preloader: a assinatura do Falow se montando, e a montagem É o indicador de
// progresso (o anel aberto da marca já tem forma de barra circular, então não
// precisa de barra nenhuma ao lado).
//
// Ordem: o ponto amarelo dispara (é o gatilho, na linguagem da marca), o anel
// corre em volta e fecha o ciclo, a palavra completa a assinatura e a íris abre
// a partir do furo do anel, revelando o hero.
//
// A marcação do símbolo já vem no index.html pra pintar no primeiro quadro; o
// wordmark, que é um path grande, entra aqui por JS dentro do mesmo <svg>.
// Gate no index.html: html[data-preloader='on'] só existe na 1a visita da
// sessão com motion ok.
import { gsap } from '../../app/motion.js';
import { ASSINATURA } from '../../shared/ui/brandMark.js';
import { wordmarkGrupo } from '../../shared/ui/falowWordmark.js';

const DONE_EVENT = 'falow:preloader-done';

function finish(el) {
  document.documentElement.removeAttribute('data-preloader');
  el.remove();
  document.dispatchEvent(new CustomEvent(DONE_EVENT));
}

export function initPreloader() {
  const el = document.getElementById('preloader');
  if (!el) return Promise.resolve();

  if (document.documentElement.dataset.preloader !== 'on') {
    finish(el);
    return Promise.resolve();
  }

  try {
    sessionStorage.setItem('falow-preloaded', '1');
  } catch {
    /* storage bloqueado: preloader roda de novo, sem quebrar */
  }

  const caixa = el.querySelector('#pl-lockup');
  const svg = el.querySelector('#pl-logo');
  const arco = el.querySelector('#pl-arc');
  const ponto = el.querySelector('#pl-dot');
  const tagline = el.querySelector('.pl-tagline');
  const iris = document.getElementById('pl-iris');

  // A palavra entra no MESMO svg do símbolo: espaçamento e alinhamento saem
  // da viewBox oficial, sem medir nada. Vai antes do arco no DOM pra ficar
  // atrás dele durante o recuo.
  svg.insertAdjacentHTML('afterbegin', wordmarkGrupo());
  const letras = svg.querySelectorAll('.wm-letra');

  const compr = arco.getTotalLength();
  gsap.set(arco, { strokeDasharray: compr, strokeDashoffset: compr });
  gsap.set(ponto, { scale: 0, opacity: 1, transformOrigin: '50% 50%' });
  // yPercent negativo sobe na tela: dentro do <g> do wordmark o eixo Y está
  // invertido por causa do scale(0.1,-0.1).
  gsap.set(letras, { opacity: 0, yPercent: -55 });
  gsap.set(tagline, { opacity: 0, y: 8 });
  // x: 0 explícito: o GSAP lê o translateX(%) que o CSS crítico já deixou e
  // guarda como px. Sem zerar, o xPercent daqui soma em cima e dobra o desvio.
  gsap.set(caixa, {
    x: 0,
    xPercent: ASSINATURA.deslocaSimbolo,
    scale: 1.75,
    transformOrigin: ASSINATURA.origemSimbolo,
  });

  // A íris só abre quando as fontes resolverem (teto de 1.2s). A animação em
  // si começa na hora: a espera fica no fim, não numa tela preta no começo.
  const fontesProntas = Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => setTimeout(r, 1200)),
  ]);
  let liberado = false;

  let concluir;
  const fim = new Promise((r) => {
    concluir = r;
  });

  // A íris nasce do furo do anel e cresce até cobrir o canto mais distante.
  // As medidas saem do arco já desenhado, no momento em que a abertura começa.
  // O raio anima direto no atributo do <circle> da máscara SVG (mask.css em
  // index.html): o navegador só recalcula uma geometria simples por frame,
  // bem mais barato que reconstruir um radial-gradient em CSS a cada tick.
  const irisGeo = { cx: 0, cy: 0, r0: 0, rMax: 0 };

  function medirIris() {
    const r = arco.getBoundingClientRect();
    irisGeo.cx = r.left + r.width / 2;
    irisGeo.cy = r.top + r.height / 2;
    irisGeo.r0 = (r.width / 2) * ASSINATURA.razaoFuro;
    const { innerWidth: w, innerHeight: h } = window;
    irisGeo.rMax =
      Math.max(
        Math.hypot(irisGeo.cx, irisGeo.cy),
        Math.hypot(w - irisGeo.cx, irisGeo.cy),
        Math.hypot(irisGeo.cx, h - irisGeo.cy),
        Math.hypot(w - irisGeo.cx, h - irisGeo.cy)
      ) + 40;
    if (iris) {
      iris.setAttribute('cx', irisGeo.cx);
      iris.setAttribute('cy', irisGeo.cy);
      iris.setAttribute('r', irisGeo.r0);
    }
  }

  const tl = gsap.timeline({
    onComplete() {
      finish(el);
      concluir();
    },
  });

  tl
    // 1. o gatilho dispara
    .to(ponto, { scale: 1, duration: 0.44, ease: 'back.out(2.4)' })
    // 2. o ciclo corre em volta dele e fecha: este traço é o progresso
    .to(arco, { strokeDashoffset: 0, duration: 1.05, ease: 'power2.inOut' }, 0.18)
    // 3. a assinatura se completa: o símbolo recua e a palavra sobe letra a letra
    .to(caixa, { xPercent: 0, scale: 1, duration: 0.95, ease: 'power3.inOut' }, 0.98)
    .to(
      letras,
      { opacity: 1, yPercent: 0, duration: 0.44, stagger: 0.055, ease: 'power3.out' },
      1.12
    )
    .to(tagline, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.45)
    // segura aqui se o resto ainda não carregou
    .addPause('+=0.25', () => {
      if (liberado) tl.play();
    })
    .addLabel('iris')
    // 4. a íris abre de dentro do furo do anel
    .to(caixa, { opacity: 0, scale: 1.08, duration: 0.5, ease: 'power2.in' }, 'iris')
    .to(tagline, { opacity: 0, duration: 0.32, ease: 'power2.in' }, 'iris')
    // As medidas (cx/cy/r0/rMax) só podem ser tiradas quando a abertura
    // começa (onStart), daí o raio anima direto no atributo do <circle> da
    // máscara: sem onUpdate, sem string, o GSAP tickeia só o atributo.
    .call(medirIris, null, 'iris+=0.12')
    .to(
      iris,
      { attr: { r: () => irisGeo.rMax }, duration: 0.85, ease: 'power3.inOut' },
      'iris+=0.12'
    );

  fontesProntas.then(() => {
    liberado = true;
    tl.play();
  });

  return fim;
}

export { DONE_EVENT };
