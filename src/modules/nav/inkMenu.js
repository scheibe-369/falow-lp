// Menu fullscreen "ink-blot" (ref tipo de menu): mancha escura cresce do
// centro do botão via clip-path circle dirigido por proxy GSAP. Correções
// sobre a referência: focus trap, Escape, aria, overflow só enquanto aberto,
// reduced-motion vira crossfade.
import './inkMenu.css';
import { navData } from './nav.data.js';
import { ctaButton } from '../../shared/ui/ctaButton.js';

export function initInkMenu({ gsap, reduced }) {
  const toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;

  const menu = document.createElement('div');
  menu.id = 'ink-menu';
  menu.className = 'ink-menu';
  menu.setAttribute('aria-hidden', 'true');
  menu.inert = true;
  menu.innerHTML = `
    <nav aria-label="Menu">
      <ul>
        ${navData.links
          .map(
            (l, i) => `
          <li><a class="ink-link" href="${l.href}">
            <span class="ink-num">0${i + 1}</span>${l.label}
          </a></li>`
          )
          .join('')}
      </ul>
      ${ctaButton(navData.cta)}
    </nav>
  `;
  document.body.appendChild(menu);

  const clip = { r: 0 };
  let open = false;

  function circle() {
    const r = toggle.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const maxR = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + 24;
    return { cx, cy, maxR };
  }

  function apply(cx, cy, r) {
    menu.style.clipPath = `circle(${r}px at ${cx}px ${cy}px)`;
  }

  function setOpen(next) {
    open = next;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    menu.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    document.body.classList.toggle('ink-lock', open);

    const { cx, cy, maxR } = circle();
    if (reduced) {
      menu.style.clipPath = 'none';
      menu.style.opacity = open ? '1' : '0';
    } else {
      gsap.killTweensOf(clip);
      gsap.to(clip, {
        r: open ? maxR : 0,
        duration: open ? 0.9 : 0.65,
        ease: 'power3.inOut',
        onUpdate: () => apply(cx, cy, clip.r),
      });
      if (open) {
        gsap.fromTo(
          menu.querySelectorAll('.ink-link, .cta-primary'),
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06, delay: 0.3 }
        );
      }
    }
    if (open) menu.querySelector('.ink-link')?.focus();
    else toggle.focus();
  }

  toggle.addEventListener('click', () => setOpen(!open));

  document.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') return setOpen(false);
    if (e.key === 'Tab') {
      // Focus trap simples dentro do menu + botão
      const focusables = [toggle, ...menu.querySelectorAll('a')];
      const i = focusables.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        focusables[focusables.length - 1].focus();
      } else if (!e.shiftKey && i === focusables.length - 1) {
        e.preventDefault();
        focusables[0].focus();
      }
    }
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (open) {
      const { cx, cy, maxR } = circle();
      apply(cx, cy, (clip.r = maxR));
    }
  });
}
