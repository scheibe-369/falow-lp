import './ctaFinal.css';
import { ctaFinalData } from './ctaFinal.data.js';
import { falowSymbol } from '../../shared/ui/brandMark.js';
import { ctaButton } from '../../shared/ui/ctaButton.js';

export default {
  id: 'cta-final',
  render() {
    const el = document.createElement('section');
    el.id = 'cta-final';
    el.dataset.theme = 'dark';
    el.innerHTML = `
      <div class="container-pagina flex flex-col items-center py-28 text-center md:py-40">
        <div class="ctaf-symbol" aria-hidden="true">${falowSymbol({ size: 120 })}</div>
        <h2 class="ctaf-tagline" data-reveal-blur>${ctaFinalData.tagline}</h2>
        <p class="ctaf-sub" data-reveal>${ctaFinalData.sub}</p>
        ${ctaButton({ ...ctaFinalData.cta, size: 'cta-lg' })}
      </div>
    `;
    return el;
  },
  init() {},
};
