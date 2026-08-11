// Preloader "assinatura": barra de progresso fake ancorada em fonts.ready
// (teto de 1.2s), wordmark em mix-blend-difference, anel Falow desenhando e
// abertura em íris (mask radial) revelando o hero. Gate no index.html:
// html[data-preloader='on'] só existe na 1a visita da sessão com motion ok.
import { gsap } from '../../app/motion.js';
import { ringSvg } from '../../shared/ui/brandMark.js';

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

  const fontsReady = Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => setTimeout(r, 1200)),
  ]);

  return new Promise((resolve) => {
    const bar = el.querySelector('.pl-bar');
    const pill = el.querySelector('.pl-pill');
    const tagline = el.querySelector('.pl-tagline');

    const ringWrap = document.createElement('div');
    ringWrap.style.cssText =
      'position:absolute;inset:0;display:grid;place-items:center;opacity:0;';
    ringWrap.innerHTML = ringSvg({ size: 108 });
    el.appendChild(ringWrap);
    const arc = ringWrap.querySelector('.ring-arc');
    const arcLen = arc.getTotalLength();
    arc.style.strokeDasharray = String(arcLen);
    arc.style.strokeDashoffset = String(arcLen);

    fontsReady.then(() => {
      const tl = gsap.timeline({
        onComplete() {
          finish(el);
          resolve();
        },
      });

      // Barra em 3 saltos (progresso fake, ref capsule)
      tl.to(bar, { scaleX: 0.32 + Math.random() * 0.15, duration: 0.3, ease: 'power2.out' })
        .to(bar, { scaleX: 0.62 + Math.random() * 0.18, duration: 0.34, ease: 'power2.inOut' }, '+=0.08')
        .to(bar, { scaleX: 1, duration: 0.26, ease: 'power2.inOut' }, '+=0.06')
        // Pill sai, anel entra desenhando
        .to([pill, tagline], { opacity: 0, scale: 0.94, duration: 0.28, ease: 'power2.in' }, '+=0.08')
        .to(ringWrap, { opacity: 1, duration: 0.15 }, '<+=0.1')
        .to(arc, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, '<')
        // Íris abre a partir do centro do anel
        .add(() => {
          gsap.to(ringWrap, { opacity: 0, scale: 1.4, duration: 0.4, ease: 'power2.in' });
        })
        .to(
          { r: 0 },
          {
            r: Math.hypot(window.innerWidth, window.innerHeight) / 2 + 60,
            duration: 0.8,
            ease: 'power3.inOut',
            onUpdate() {
              const r = this.targets()[0].r;
              const m = `radial-gradient(circle at 50% 50%, transparent ${r}px, #000 ${r + 1}px)`;
              el.style.webkitMaskImage = m;
              el.style.maskImage = m;
            },
          },
          '<+=0.15'
        );
    });
  });
}

export { DONE_EVENT };
