import './faq.css';
import { faqData } from './faq.data.js';

const DURATION = 220;
const EASING = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

export default {
  id: 'faq',
  render() {
    const el = document.createElement('section');
    el.id = 'faq';
    el.dataset.theme = 'light';
    el.innerHTML = `
      <div class="mx-auto w-full max-w-[48rem] px-5 py-20 md:px-8 md:py-28">
        <p class="section-eyebrow">${faqData.eyebrow}</p>
        <h2 class="section-title" data-reveal-blur>${faqData.title}</h2>
        <div class="faq-list">
          ${faqData.items
            .map(
              (item) => `
            <details class="faq-item" data-reveal>
              <summary>${item.q}</summary>
              <div class="faq-answer"><p>${item.a}</p></div>
            </details>`
            )
            .join('')}
        </div>
      </div>
    `;
    return el;
  },

  // Web Animations API em vez de CSS transition: os keyframes são declarados
  // direto, sem depender de o navegador ter "pintado" um estado intermediário
  // antes de aplicar o próximo (é isso que quebrava a transição via rAF+CSS).
  init() {
    const root = document.querySelector('#faq');
    const items = [...root.querySelectorAll('.faq-item')];
    const reduced = !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const running = new WeakMap();

    const animateHeight = (answer, from, to, onDone) => {
      running.get(answer)?.cancel();
      const anim = answer.animate([{ height: `${from}px` }, { height: `${to}px` }], {
        duration: DURATION,
        easing: EASING,
      });
      running.set(answer, anim);
      anim.onfinish = () => {
        running.delete(answer);
        onDone();
      };
    };

    const close = (details) => {
      details.classList.remove('is-open');
      const answer = details.querySelector('.faq-answer');
      if (reduced) {
        details.open = false;
        return;
      }
      animateHeight(answer, answer.scrollHeight, 0, () => {
        details.open = false;
        answer.style.height = '';
      });
    };

    const open = (details) => {
      details.open = true;
      details.classList.add('is-open');
      const answer = details.querySelector('.faq-answer');
      if (reduced) return;
      animateHeight(answer, 0, answer.scrollHeight, () => {
        answer.style.height = '';
      });
    };

    const onClick = (e) => {
      e.preventDefault();
      const details = e.currentTarget.parentElement;
      const wasOpen = details.open;

      items.forEach((item) => {
        if (item !== details && item.open) close(item);
      });

      if (wasOpen) close(details);
      else open(details);
    };

    items.forEach((item) => item.querySelector('summary').addEventListener('click', onClick));

    return () => {
      items.forEach((item) => item.querySelector('summary').removeEventListener('click', onClick));
    };
  },
};
