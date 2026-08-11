// Wipe de âncora (conceito da svg-page-transition): um traço que desenha e
// engorda até cobrir a tela em preto, o scroll acontece coberto, e o traço
// se apaga do início. Verde fino desenha por cima como assinatura de fluxo.
import { gsap } from '../../app/motion.js';
import './svgWipe.css';

let overlay = null;
let busy = false;

function build() {
  overlay = document.createElement('div');
  overlay.className = 'wipe-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <svg viewBox="0 0 1316 664" preserveAspectRatio="xMidYMid slice">
      <path class="wipe-fill" d="M -60 80 C 300 180, 200 420, 560 380 C 900 340, 820 120, 1380 240" />
      <path class="wipe-line" d="M -60 80 C 300 180, 200 420, 560 380 C 900 340, 820 120, 1380 240" />
    </svg>
  `;
  document.body.appendChild(overlay);
}

export function svgWipe(onCovered) {
  if (busy) return;
  busy = true;
  if (!overlay) build();

  const fill = overlay.querySelector('.wipe-fill');
  const line = overlay.querySelector('.wipe-line');
  const len = fill.getTotalLength();
  for (const p of [fill, line]) {
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
  }
  gsap.set(fill, { attr: { 'stroke-width': 60 } });
  overlay.classList.add('is-active');

  const tl = gsap.timeline({
    onComplete() {
      overlay.classList.remove('is-active');
      busy = false;
    },
  });

  tl.to([fill, line], { strokeDashoffset: 0, duration: 0.55, ease: 'power2.in' })
    .to(fill, { attr: { 'stroke-width': 1600 }, duration: 0.4, ease: 'power3.in' }, '-=0.35')
    .add(() => onCovered && onCovered())
    // Apaga do início (dashoffset negativo) enquanto o traço afina
    .to([fill, line], { strokeDashoffset: -len, duration: 0.5, ease: 'power2.out' }, '+=0.08')
    .to(fill, { attr: { 'stroke-width': 60 }, duration: 0.45, ease: 'power2.out' }, '<');
}

// Liga o wipe em todos os links de âncora internos.
export function initAnchorWipes({ reduced }) {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.classList.contains('skip-link')) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (reduced) {
      target.scrollIntoView({ behavior: 'auto' });
      history.pushState(null, '', a.getAttribute('href'));
      return;
    }
    svgWipe(() => {
      target.scrollIntoView({ behavior: 'auto' });
      history.pushState(null, '', a.getAttribute('href'));
    });
  });
}
