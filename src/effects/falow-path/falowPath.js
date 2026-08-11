/*
 * Falow Path: traço verde desenhado pelo scroll + pontos de gatilho amarelos.
 * Port de scroll-draw-ribbon.js (MIT) adaptado à marca (DS §16):
 *  - stroke #32E875 fino, sem glow neon;
 *  - `triggers`: frações do comprimento onde nasce um ponto amarelo
 *    (getPointAtLength) com callback onTrigger(i) pra sincronizar conteúdo;
 *  - `head`: ponto amarelo que lidera a ponta do traço;
 *  - reduced-motion REAL: desenha completo, estático, sem listeners.
 */
import './falowPath.css';

const clamp01 = (n) => Math.min(1, Math.max(0, n));
const NS = 'http://www.w3.org/2000/svg';

export function createFalowPath(opts = {}) {
  const noop = { setProgress() {}, refresh() {}, destroy() {}, element: null };
  if (typeof document === 'undefined') return noop;

  const {
    target,
    mount,
    stroke = '#32E875',
    width = 8,
    height = 100, // vh do SVG
    travel = 0, // vh que o SVG sobe ao longo do curso (0 = fixo no mount)
    path: pathFn,
    triggers = [],
    head = true,
    progress: mode = 'auto',
    reduced = false,
    onProgress,
    onTrigger,
  } = opts;

  const targetEl = typeof target === 'string' ? document.querySelector(target) : target;
  const mountEl = typeof mount === 'string' ? document.querySelector(mount) : mount;
  if (!targetEl || !mountEl || typeof pathFn !== 'function') return noop;

  if (getComputedStyle(mountEl).position === 'static') mountEl.style.position = 'relative';

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'fp-svg');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.height = height + 'vh';

  const path = document.createElementNS(NS, 'path');
  path.setAttribute('class', 'fp-line');
  path.style.stroke = stroke;
  path.style.strokeWidth = String(width);
  svg.appendChild(path);

  const dots = triggers.map(() => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('class', 'fp-trigger');
    c.setAttribute('r', '7');
    svg.appendChild(c);
    return c;
  });

  let headDot = null;
  if (head) {
    headDot = document.createElementNS(NS, 'circle');
    headDot.setAttribute('class', 'fp-head');
    headDot.setAttribute('r', '8');
    svg.appendChild(headDot);
  }

  mountEl.insertBefore(svg, mountEl.firstChild);

  let length = 1;
  let queued = false;
  let lastP = -1;
  const fired = triggers.map(() => false);

  function refresh() {
    const r = svg.getBoundingClientRect();
    const W = r.width || window.innerWidth;
    const H = r.height || window.innerHeight * (height / 100);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    path.setAttribute('d', pathFn(W, H));
    length = path.getTotalLength() || 1;
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length * (1 - Math.max(0, lastP)));
    triggers.forEach((t, i) => {
      const pt = path.getPointAtLength(length * t);
      dots[i].setAttribute('cx', pt.x);
      dots[i].setAttribute('cy', pt.y);
    });
    if (headDot && lastP >= 0) {
      const pt = path.getPointAtLength(length * clamp01(lastP));
      headDot.setAttribute('cx', pt.x);
      headDot.setAttribute('cy', pt.y);
    }
  }

  function setProgress(p) {
    const v = clamp01(p);
    if (v === lastP) return;
    lastP = v;
    path.style.strokeDashoffset = String(length * (1 - v));
    if (travel) svg.style.transform = `translateY(${-v * travel}vh)`;
    if (headDot) {
      const pt = path.getPointAtLength(length * v);
      headDot.setAttribute('cx', pt.x);
      headDot.setAttribute('cy', pt.y);
      headDot.style.opacity = v > 0.005 && v < 0.995 ? '1' : '0';
    }
    triggers.forEach((t, i) => {
      const on = v >= t;
      if (on !== fired[i]) {
        fired[i] = on;
        dots[i].classList.toggle('is-on', on);
        if (on && onTrigger) onTrigger(i);
      }
    });
    if (onProgress) onProgress(v);
  }

  function readScroll() {
    queued = false;
    const rect = targetEl.getBoundingClientRect();
    const course = targetEl.offsetHeight - window.innerHeight;
    setProgress(course > 0 ? -rect.top / course : 0);
  }

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(readScroll);
  };

  const onResize = () => {
    refresh();
    if (!reduced && mode === 'auto') schedule();
  };

  refresh();

  if (reduced) {
    // Sem animação: traço completo e gatilhos visíveis, estáticos.
    setProgress(1);
    if (headDot) headDot.style.opacity = '0';
    window.addEventListener('resize', () => refresh());
    return { setProgress: noop.setProgress, refresh, destroy: () => svg.remove(), element: svg };
  }

  setProgress(0);
  if (mode === 'auto') {
    readScroll();
    window.addEventListener('scroll', schedule, { passive: true });
  }
  window.addEventListener('resize', onResize);

  const ro = new ResizeObserver(() => onResize());
  ro.observe(mountEl);

  return {
    setProgress,
    refresh,
    element: svg,
    destroy() {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      svg.remove();
    },
  };
}
