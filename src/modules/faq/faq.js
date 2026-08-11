import './faq.css';
import { faqData } from './faq.data.js';

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
  init() {},
};
