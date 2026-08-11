import './hero.css';
import { heroData } from './hero.data.js';
import { heroChat } from './heroChat.js';
import { ctaButton } from '../../shared/ui/ctaButton.js';
import { splitChars } from '../../effects/split-text/splitText.js';

// Ritmo medido na LP do ManyChat (transform+opacity por bolha, sem CSS transition).
const GAP = 10; // espaço entre bolhas, px
const ENTER = 0.65; // fade-in de uma bolha
const PUSH = 0.65; // subida das bolhas antigas
const LAG = 0.25; // atraso do fade-in em relação ao empurrão
const HOLD = 0.9; // pausa depois que a bolha assenta
const EXIT = 0.65; // saída (sobe e some)
const EXIT_STAGGER = 0.25;
const EXIT_RISE = 50; // px que a pilha sobe ao sair
const BLANK = 0.35; // tela limpa antes de recomeçar
const DRIFT = 20; // px de onde a bolha entra, pro lado dela ficar explícito

export default {
  id: 'hero',
  render() {
    const el = document.createElement('section');
    el.id = 'hero';
    el.dataset.theme = 'dark';
    const { bg } = heroData;
    el.innerHTML = `
      <img class="hero-bg" src="${bg.src}" srcset="${bg.srcset}" sizes="100vw"
           width="${bg.width}" height="${bg.height}" alt="" fetchpriority="high" decoding="async">
      <div class="hero-scrim" aria-hidden="true"></div>
      <div class="hero-inner">
        <p class="hero-eyebrow">${heroData.eyebrow}</p>
        <h1 class="hero-title">${heroData.title}</h1>
        <p class="hero-sub">${heroData.sub}</p>
        <div class="hero-ctas">
          ${ctaButton(heroData.ctaPrimary)}
          ${ctaButton({ ...heroData.ctaGhost, variant: 'ghost' })}
        </div>
      </div>
      ${heroChat(heroData.chat)}
    `;
    return el;
  },

  init({ gsap, reduced }) {
    const root = document.querySelector('#hero');
    const msgs = [...root.querySelectorAll('.hero-msg')];

    measureStack(msgs);

    // Sem motion: conversa inteira montada e parada.
    if (reduced) {
      stack(msgs).forEach(({ el, y }) => gsap.set(el, { y, x: 0, opacity: 1 }));
      return;
    }

    const h1 = root.querySelector('.hero-title');
    const chars = splitChars(h1);

    const intro = gsap.timeline({ paused: true });
    intro.to(chars, { y: 0, duration: 0.8, ease: 'power4.out', stagger: 0.016 });
    intro.from(
      ['#hero .hero-eyebrow', '#hero .hero-sub', '#hero .hero-ctas'],
      { opacity: 0, y: 14, duration: 0.6, ease: 'power4.out', stagger: 0.1 },
      '-=0.45'
    );
    intro.from('#hero .hero-bg', { scale: 1.06, duration: 1.6, ease: 'power2.out' }, 0);

    let loop = buildLoop(gsap, msgs);

    // Só roda enquanto o hero está na tela.
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? loop.play() : loop.pause()),
      { threshold: 0.05 }
    );
    io.observe(root);

    // Alturas mudam quando o texto reflui: remonta a timeline.
    let t = null;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        loop.kill();
        gsap.set(msgs, { clearProps: 'transform,opacity' });
        measureStack(msgs);
        loop = buildLoop(gsap, msgs);
        loop.play();
      }, 200);
    };
    window.addEventListener('resize', onResize);

    const start = () => intro.delay(0.1).play();
    if (document.documentElement.dataset.preloader === 'on') {
      document.addEventListener('falow:preloader-done', start, { once: true });
    } else {
      start();
    }

    return () => {
      intro.kill();
      loop.kill();
      io.disconnect();
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  },
};

// Posição final de cada bolha quando a conversa está inteira na tela.
function stack(msgs) {
  let offset = 0;
  const out = [];
  for (let i = msgs.length - 1; i >= 0; i--) {
    out.unshift({ el: msgs[i], y: -offset });
    offset += msgs[i].offsetHeight + GAP;
  }
  return out;
}

// As bolhas são absolutas, então a pilha não ocupa espaço sozinha. No mobile
// ela entra no fluxo (pra nunca cobrir os CTAs) e precisa da altura real.
function measureStack(msgs) {
  const total = msgs.reduce((s, m) => s + m.offsetHeight, 0) + (msgs.length - 1) * GAP;
  msgs[0].parentElement.style.setProperty('--stack-h', `${total}px`);
}

// De que lado a bolha nasce: a pessoa vem da esquerda, o Falow da direita.
const driftDe = (msg) => (msg.classList.contains('hero-msg-in') ? -DRIFT : DRIFT);

function buildLoop(gsap, msgs) {
  const heights = msgs.map((m) => m.offsetHeight);
  const tl = gsap.timeline({ repeat: -1, paused: true });

  const zerar = () => msgs.forEach((m) => gsap.set(m, { y: 0, x: driftDe(m), opacity: 0 }));
  zerar();

  let t = BLANK;
  msgs.forEach((msg, i) => {
    if (i > 0) {
      // As anteriores abrem espaço subindo a altura da bolha que está entrando.
      const shift = heights[i] + GAP;
      for (let j = 0; j < i; j++) {
        tl.to(msgs[j], { y: `-=${shift}`, duration: PUSH, ease: 'power2.out' }, t);
      }
      t += LAG;
    }
    // entra deslizando do próprio lado, o que deixa a direção explícita
    tl.to(msg, { opacity: 1, x: 0, duration: ENTER, ease: 'power2.out' }, t);
    t += ENTER + HOLD;
  });

  // Saída: a conversa inteira sobe um pouco e some, de baixo pra cima.
  msgs.forEach((msg, i) => {
    tl.to(
      msg,
      { y: `-=${EXIT_RISE}`, opacity: 0, duration: EXIT, ease: 'power2.in' },
      t + (msgs.length - 1 - i) * EXIT_STAGGER
    );
  });
  t += EXIT + (msgs.length - 1) * EXIT_STAGGER;

  // volta pro estado inicial (inclusive o x de origem) pro loop repetir igual
  msgs.forEach((msg) => tl.set(msg, { y: 0, x: driftDe(msg) }, t));
  return tl;
}
