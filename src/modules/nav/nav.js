import './nav.css';
import { navData } from './nav.data.js';
import { ctaButton } from '../../shared/ui/ctaButton.js';
import { falowWordmark } from '../../shared/ui/falowWordmark.js';

export default {
  id: 'nav',
  render() {
    const el = document.createElement('header');
    el.className = 'site-nav';
    el.dataset.theme = 'dark';
    el.innerHTML = `
      <div class="nav-bar mx-auto flex w-full max-w-[73.5rem] items-center justify-between px-5 py-4 md:px-8">
        <a class="nav-brand" href="#hero" aria-label="Falow, início">
          <img class="nav-symbol" src="/brand/falow-icone.webp" alt=""
               width="128" height="128" fetchpriority="high" decoding="async">
          <span class="nav-wordmark">${falowWordmark()}</span>
        </a>
        <nav aria-label="Principal" class="nav-links-inline">
          <ul class="hidden gap-8 md:flex">
            ${navData.links
              .map((l) => `<li><a class="nav-link" href="${l.href}">${l.label}</a></li>`)
              .join('')}
          </ul>
        </nav>
        <div class="flex items-center gap-3">
          ${ctaButton({ ...navData.cta, size: 'cta-sm' })}
          <button class="nav-toggle md:hidden" aria-label="Abrir menu" aria-expanded="false" aria-controls="ink-menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
    return el;
  },
  init() {
    // Tema do nav segue a seção sob ele (IO puro, funciona sem motion).
    const header = document.querySelector('.site-nav');
    const themed = document.querySelectorAll('main [data-theme], footer[data-theme]');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) header.dataset.theme = e.target.dataset.theme;
        }
      },
      { rootMargin: '0px 0px -92% 0px' }
    );
    themed.forEach((s) => io.observe(s));

    // As letras do wordmark recolhem no primeiro scroll, por menor que seja.
    // Sentinela de 4px no topo do documento em vez de listener de scroll:
    // o observer só dispara na travessia, sem trabalho por frame.
    const sentinela = document.createElement('div');
    sentinela.className = 'nav-sentinela';
    sentinela.setAttribute('aria-hidden', 'true');
    document.getElementById('app').prepend(sentinela);

    const ioCompacta = new IntersectionObserver(
      ([e]) => {
        header.dataset.compacta = e.isIntersecting ? 'nao' : 'sim';
      },
      { threshold: 0 }
    );
    ioCompacta.observe(sentinela);

    return () => {
      io.disconnect();
      ioCompacta.disconnect();
      sentinela.remove();
    };
  },
};
