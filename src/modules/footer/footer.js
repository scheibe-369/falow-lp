import './footer.css';
import { footerData } from './footer.data.js';
import { brandMark } from '../../shared/ui/brandMark.js';

export default {
  id: 'footer',
  render() {
    const el = document.createElement('footer');
    el.dataset.theme = 'dark';
    el.innerHTML = `
      <div class="mx-auto flex w-full max-w-[73.5rem] flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div class="footer-brand" aria-label="Falow">${brandMark({ size: 24 })}</div>
        <nav aria-label="Rodapé">
          <ul class="flex flex-wrap gap-6">
            ${footerData.links
              .map((l) => `<li><a class="footer-link" href="${l.href}">${l.label}</a></li>`)
              .join('')}
          </ul>
        </nav>
      </div>
      <div class="mx-auto w-full max-w-[73.5rem] border-t border-white/10 px-5 py-6 md:px-8">
        <p class="footer-credit">
          © ${new Date().getFullYear()} Falow ·
          <a href="${footerData.credit.href}" target="_blank" rel="noopener">${footerData.credit.label}</a>
        </p>
      </div>
    `;
    return el;
  },
  init() {},
};
