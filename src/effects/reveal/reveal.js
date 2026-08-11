// Motor de scroll reveal. Arquitetura upmind (IO one-shot em batch + gate
// espelhado no CSS via html.reveal-on) com receitas do genovas (blurIn).
// Estados iniciais ocultos vivem em reveal.css, NUNCA aqui: JS off ou
// reduced-motion jamais escondem conteúdo.
import { gsap, mm, MOTION_OK } from '../../app/motion.js';
import './reveal.css';

function observe(els, animate, rootMargin = '0px 0px -10% 0px') {
  const io = new IntersectionObserver(
    (entries) => {
      const hit = entries.filter((e) => e.isIntersecting).map((e) => e.target);
      if (hit.length) {
        animate(hit);
        hit.forEach((el) => io.unobserve(el));
      }
    },
    { rootMargin, threshold: 0 }
  );
  els.forEach((el) => io.observe(el));
  return io;
}

export function initReveals() {
  mm.add(MOTION_OK, () => {
    const $$ = (sel) => [...document.querySelectorAll(sel)];
    const ios = [
      observe($$('[data-reveal]'), (els) =>
        gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: 'power4.out', stagger: 0.08, overwrite: 'auto' })
      ),
      observe($$('[data-reveal-blur]'), (els) =>
        gsap.to(els, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: 'auto' })
      ),
      observe($$('[data-reveal-img]'), (els) =>
        gsap.to(els, { opacity: 1, scale: 1, duration: 1, ease: 'power4.out', overwrite: 'auto' })
      ),
    ];
    return () => ios.forEach((io) => io.disconnect());
  });
}
