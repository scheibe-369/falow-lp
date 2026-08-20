import './builder.css';
import { builderData } from './builder.data.js';
import { mockupSequencia } from './mockupSequencia.js';

export default {
  id: 'builder',
  render() {
    const el = document.createElement('section');
    el.id = 'builder';
    el.dataset.theme = 'light';
    el.innerHTML = `
      <div class="bd-sticky">
        <div class="container-pagina grid gap-10 py-20 md:grid-cols-[2fr_3fr] md:py-28">
          <div class="bd-copy">
            <p class="section-eyebrow">${builderData.eyebrow}</p>
            <h2 class="section-title" data-reveal-blur>${builderData.title}</h2>
            <p class="section-sub" data-reveal>${builderData.sub}</p>
            <ol class="bd-stages">
              ${builderData.stages
                .map(
                  (s, i) => `
                <li class="bd-stage" data-stage="${i}">
                  <h3>${s.title}</h3>
                  <p>${s.body}</p>
                </li>`
                )
                .join('')}
            </ol>
          </div>
          <div class="bd-mockup" data-reveal-img>
            ${mockupSequencia({ blocks: builderData.blocks })}
          </div>
        </div>
      </div>
    `;
    return el;
  },
  init({ gsap, ScrollTrigger, mm, reduced }) {
    if (reduced) return;
    const section = document.getElementById('builder');
    const mockup = section.querySelector('.bd-mockup');
    const nodes = [...section.querySelectorAll('.sq-node')];
    const wires = [...section.querySelectorAll('.sq-wire')];
    const sparks = [...section.querySelectorAll('.sq-spark')];
    const stages = [...section.querySelectorAll('.bd-stage')];
    const toggle = section.querySelector('.sq-active');

    mm.add('(min-width: 768px)', () => {
      section.classList.add('is-cine');
      mockup.removeAttribute('data-reveal-img');
      gsap.set(mockup, { clearProps: 'opacity,transform' });

      // Estados iniciais da montagem
      gsap.set(nodes, { opacity: 0, y: 18, scale: 0.96 });
      gsap.set(sparks, { opacity: 0, scale: 0.4, transformOrigin: 'center' });
      gsap.set(toggle, { opacity: 0.35 });
      const lens = wires.map((w) => w.getTotalLength());
      wires.forEach((w, i) => {
        w.style.strokeDasharray = String(lens[i]);
        w.style.strokeDashoffset = String(lens[i]);
      });

      const stageAt = (i) => () =>
        stages.forEach((s, j) => s.classList.toggle('is-active', i === j));

      const nodeIn = (i) => [nodes[i], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }];
      const wireDraw = (i) => [wires[i], { strokeDashoffset: 0, duration: 0.65, ease: 'none' }];

      const tl = gsap.timeline({
        defaults: { overwrite: 'auto' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      tl.add(stageAt(0))
        .to(...nodeIn(0))
        .to(sparks[0], { opacity: 1, scale: 1, duration: 0.3 }, '<+=0.3')
        .to(...wireDraw(0))
        .to(...nodeIn(1), '<+=0.1')
        .add(stageAt(1), '<')
        .to(...wireDraw(1))
        .to(sparks[1], { opacity: 1, scale: 1, duration: 0.3 }, '<+=0.4')
        .to(...nodeIn(2))
        .to(...wireDraw(2))
        .to(...nodeIn(3), '<+=0.1')
        .add(stageAt(2), '<')
        .to(toggle, { opacity: 1, duration: 0.4 })
        .to({}, { duration: 0.3 });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        section.classList.remove('is-cine');
        gsap.set([...nodes, ...sparks, toggle, mockup], { clearProps: 'all' });
        wires.forEach((w) => {
          w.style.strokeDasharray = '';
          w.style.strokeDashoffset = '';
        });
        stages.forEach((s) => s.classList.remove('is-active'));
        mockup.setAttribute('data-reveal-img', '');
      };
    });
  },
};
