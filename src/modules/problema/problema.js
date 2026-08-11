import './problema.css';
import { problemaData } from './problema.data.js';

export default {
  id: 'problema',
  render() {
    const el = document.createElement('section');
    el.id = 'problema';
    el.dataset.theme = 'dark';
    el.innerHTML = `
      <div class="mx-auto w-full max-w-[73.5rem] px-5 py-20 md:px-8 md:py-28">
        <h2 class="section-title" data-reveal-blur>${problemaData.title}</h2>
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          ${problemaData.pains
            .map(
              (p) => `
            <article class="pain-card" data-reveal>
              <h3>${p.title}</h3>
              <p>${p.body}</p>
            </article>`
            )
            .join('')}
        </div>
      </div>
      <div class="marquee" aria-hidden="true">
        <div class="marquee-track">
          ${Array.from({ length: 3 })
            .map(
              () =>
                problemaData.marquee
                  .map((m) => `<span class="marquee-item">${m}</span><span class="marquee-dot"></span>`)
                  .join('')
            )
            .join('')}
        </div>
      </div>
    `;
    return el;
  },
  init() {},
};
