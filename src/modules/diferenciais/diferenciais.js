import './diferenciais.css';
import { diferenciaisData } from './diferenciais.data.js';
import { icon } from '../../shared/ui/icons.js';

export default {
  id: 'diferenciais',
  render() {
    const el = document.createElement('section');
    el.id = 'diferenciais';
    el.dataset.theme = 'light';
    el.innerHTML = `
      <div class="container-pagina py-20 md:py-28">
        <p class="section-eyebrow">${diferenciaisData.eyebrow}</p>
        <h2 class="section-title" data-reveal-blur>${diferenciaisData.title}</h2>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          ${diferenciaisData.cards
            .map(
              (c) => `
            <article class="diff-card" data-accent="${c.accent}" data-reveal>
              <span class="diff-icon" aria-hidden="true">${icon(c.icon)}</span>
              <h3>${c.title}</h3>
              <p>${c.body}</p>
            </article>`
            )
            .join('')}
        </div>
      </div>
    `;
    return el;
  },
  init() {},
};
