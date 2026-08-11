import nav from '../modules/nav/nav.js';
import hero from '../modules/hero/hero.js';
import problema from '../modules/problema/problema.js';
import comoFunciona from '../modules/como-funciona/comoFunciona.js';
import builder from '../modules/builder/builder.js';
import dashboard from '../modules/dashboard/dashboard.js';
import casos from '../modules/casos-de-uso/casos.js';
import diferenciais from '../modules/diferenciais/diferenciais.js';
import pricingCta from '../modules/pricing-cta/pricingCta.js';
import faq from '../modules/faq/faq.js';
import ctaFinal from '../modules/cta-final/ctaFinal.js';
import footer from '../modules/footer/footer.js';

// Ordem única da página. Prova social entra aqui quando existir dado real.
const SECTIONS = [hero, problema, comoFunciona, builder, dashboard, casos, diferenciais, pricingCta, faq, ctaFinal];

export function buildPage(ctx) {
  const app = document.getElementById('app');
  const main = document.getElementById('main');

  app.prepend(nav.render());
  for (const section of SECTIONS) main.appendChild(section.render());
  app.appendChild(footer.render());

  const cleanups = [nav, ...SECTIONS, footer]
    .map((m) => m.init(ctx))
    .filter((fn) => typeof fn === 'function');
  return () => cleanups.forEach((fn) => fn());
}
