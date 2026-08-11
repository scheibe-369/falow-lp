import './pricingCta.css';
import { pricingCtaData } from './pricingCta.data.js';
import { ctaButton } from '../../shared/ui/ctaButton.js';

export default {
  id: 'pricing-cta',
  render() {
    const el = document.createElement('section');
    el.id = 'comecar';
    el.dataset.theme = 'light';
    el.innerHTML = `
      <div class="mx-auto w-full max-w-[73.5rem] px-5 py-16 md:px-8">
        <div class="pricing-band" data-reveal>
          <h2>${pricingCtaData.title}</h2>
          <p>${pricingCtaData.sub}</p>
          ${ctaButton(pricingCtaData.cta)}
        </div>
      </div>
    `;
    return el;
  },
  init() {},
};
