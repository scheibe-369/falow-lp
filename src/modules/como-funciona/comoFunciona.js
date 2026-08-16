import './comoFunciona.css';
import { comoFuncionaData } from './comoFunciona.data.js';
import { createFalowPath } from '../../effects/falow-path/falowPath.js';
import { cfPathDesktop, CF_TRIGGERS } from './paths.js';

export default {
  id: 'como-funciona',
  render() {
    const el = document.createElement('section');
    el.id = 'como-funciona';
    el.dataset.theme = 'light';
    el.innerHTML = `
      <div class="cf-sticky">
        <div class="container-pagina py-20 md:py-28">
          <p class="section-eyebrow">${comoFuncionaData.eyebrow}</p>
          <h2 class="section-title" data-reveal-blur>${comoFuncionaData.title}</h2>
          <p class="section-sub" data-reveal>${comoFuncionaData.sub}</p>
          <div class="cf-path-mount" aria-hidden="true"></div>
          <ol class="cf-steps">
            ${comoFuncionaData.steps
              .map(
                (s, i) => `
              <li class="cf-step ${i % 2 ? 'cf-step-right' : 'cf-step-left'}" data-step="${i}">
                <span class="cf-step-n">${s.n}</span>
                <h3>${s.title}</h3>
                <p>${s.body}</p>
                ${s.badge ? `<span class="badge-trigger">${s.badge}</span>` : ''}
              </li>`
              )
              .join('')}
          </ol>
        </div>
      </div>
    `;
    return el;
  },
  init({ gsap, mm, reduced }) {
    const section = document.getElementById('como-funciona');
    const mountPoint = section.querySelector('.cf-path-mount');
    const steps = [...section.querySelectorAll('.cf-step')];
    let fp = null;

    mm.add('(min-width: 768px)', () => {
      section.classList.add('is-cine');

      if (!reduced) {
        // Em modo cine os cards são regidos pelos gatilhos do path,
        // não pelo motor de reveal.
        steps.forEach((s) => gsap.set(s, { opacity: 0, y: 24 }));
      }

      fp = createFalowPath({
        target: section,
        mount: mountPoint,
        width: 8,
        height: 100,
        reduced,
        path: cfPathDesktop,
        triggers: CF_TRIGGERS,
        head: true,
        progress: 'auto',
        onTrigger(i) {
          if (!reduced && steps[i]) {
            gsap.to(steps[i], { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', overwrite: 'auto' });
          }
        },
      });
      if (reduced) steps.forEach((s) => gsap.set(s, { clearProps: 'all' }));

      return () => {
        section.classList.remove('is-cine');
        steps.forEach((s) => gsap.set(s, { clearProps: 'all' }));
        fp?.destroy();
        fp = null;
      };
    });

    return () => fp?.destroy();
  },
};
