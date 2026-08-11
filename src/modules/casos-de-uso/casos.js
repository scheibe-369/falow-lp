import './casos.css';
import { casosData } from './casos.data.js';

export default {
  id: 'casos-de-uso',
  render() {
    const el = document.createElement('section');
    el.id = 'casos-de-uso';
    el.dataset.theme = 'light';
    el.innerHTML = `
      <div class="mx-auto w-full max-w-[73.5rem] px-5 py-20 md:px-8 md:py-28">
        <p class="section-eyebrow">${casosData.eyebrow}</p>
        <h2 class="section-title" data-reveal-blur>${casosData.title}</h2>
        <div class="tabs" role="tablist" aria-label="Casos de uso">
          ${casosData.tabs
            .map(
              (t, i) => `
            <button class="tab" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}"
              aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${t.label}</button>`
            )
            .join('')}
        </div>
        ${casosData.tabs
          .map(
            (t, i) => `
          <div class="tab-panel" role="tabpanel" id="panel-${t.id}" aria-labelledby="tab-${t.id}" ${i === 0 ? '' : 'hidden'}>
            <div class="grid gap-6 md:grid-cols-3">
              ${t.bullets
                .map(
                  (b) => `
                <article class="case-card">
                  <h3>${b.title}</h3>
                  <p>${b.body}</p>
                </article>`
                )
                .join('')}
            </div>
          </div>`
          )
          .join('')}
      </div>
    `;
    return el;
  },
  init({ gsap, reduced }) {
    const el = document.getElementById('casos-de-uso');
    const tabs = [...el.querySelectorAll('[role="tab"]')];
    const panels = [...el.querySelectorAll('[role="tabpanel"]')];

    function select(i) {
      tabs.forEach((t, j) => {
        t.setAttribute('aria-selected', String(i === j));
        t.tabIndex = i === j ? 0 : -1;
        panels[j].hidden = i !== j;
      });
      if (!reduced) {
        gsap.fromTo(
          panels[i].querySelectorAll('.case-card'),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', stagger: 0.06, overwrite: 'auto' }
        );
      }
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
        tabs[next].focus();
        select(next);
      });
    });
  },
};
