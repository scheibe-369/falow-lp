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
    const section = document.getElementById('builder');
    const mockup = section.querySelector('.bd-mockup');
    const canvas = section.querySelector('.sq-canvas');
    const nodes = [...section.querySelectorAll('.sq-node')];
    const wires = [...section.querySelectorAll('.sq-wire')];
    const sparks = [...section.querySelectorAll('.sq-spark')];
    const stages = [...section.querySelectorAll('.bd-stage')];
    const toggle = section.querySelector('.sq-active');

    const VB_W = 640;
    const VB_H = 320;
    const SPARK_R = 5;

    // O "d" dos fios era fixo no viewBox (mockupSequencia.js), calibrado
    // olhando pra UMA largura de tela. O card tem altura em px mas o canvas
    // escala em % com o container da página, então em outro monitor a
    // proporção card/canvas muda e o fio descola (o terceiro chegou a ficar
    // boiando no vazio). Aqui a geometria daquele desenho virou fração da
    // caixa REAL de cada card, remedida a cada sync: mesma curva de sempre,
    // colada em qualquer largura. offsetLeft/Top/Width/Height ignoram o
    // transform do GSAP de propósito, senão a medida sairia deslocada no
    // meio da animação de entrada dos cards.
    const box = (el) => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      return {
        x: (el.offsetLeft / cw) * VB_W,
        y: (el.offsetTop / ch) * VB_H,
        w: (el.offsetWidth / cw) * VB_W,
        h: (el.offsetHeight / ch) * VB_H,
      };
    };

    const anchor = (i, fx, fy) => {
      const b = box(nodes[i]);
      return { x: b.x + b.w * fx, y: b.y + b.h * fy };
    };

    // Tangente fixa por eixo, nunca deduzida de dx/dy: fio que sai pela
    // lateral do card sai na horizontal mesmo quando o desnível vertical é
    // maior que o vão (o caso dos dois primeiros, que sobem/descem mais do
    // que andam). Escolher o eixo pelo maior delta jogava a tangente pra
    // vertical, o traço saía da borda direita subindo reto e virava gancho
    // curto, não curva. O braço longo (BOW do vão) é o que abre o arco.
    // Bow maior no eixo vertical que no horizontal: o vao entre os cards
    // empilhados e curto, e so com braco mais longo o S abre o suficiente pra
    // ler como fio de workflow em vez de queda reta.
    const BOW = { h: 0.45, v: 0.55, vLateral: 0.45 };
    const curve = (p0, p1, axis) => {
      if (axis === 'h') {
        const a = (p1.x - p0.x) * BOW.h;
        return `M ${p0.x} ${p0.y} C ${p0.x + a} ${p0.y}, ${p1.x - a} ${p1.y}, ${p1.x} ${p1.y}`;
      }
      // O braco vertical cresce junto com o desvio lateral. Sem isso a curva
      // vira rampa diagonal quando o vao entre os cards encolhe: em tela
      // estreita o texto quebra, o card cresce em px e o canvas escala em %,
      // entao sobra pouca altura e so o dy nao da arco nenhum.
      const dy = p1.y - p0.y;
      const a =
        Math.sign(dy || 1) *
        Math.max(Math.abs(dy) * BOW.v, Math.abs(p1.x - p0.x) * BOW.vLateral);
      return `M ${p0.x} ${p0.y} C ${p0.x} ${p0.y + a}, ${p1.x} ${p1.y - a}, ${p1.x} ${p1.y}`;
    };

    // O "from" cai DENTRO do card de origem de propósito: o SVG fica atrás
    // dos nodes, então esse começo some sob o card e o que aparece já é o
    // meio da curva, aberto e inclinado. Fio ancorado na borda exata nasce
    // como um toco colado no card. As frações saíram do "d" desenhado à mão.
    const wireSpecs = [
      { from: [0, 0.6, 0.5], to: [1, 0, 0.5], axis: 'h' },
      { from: [1, 0.7, 0.5], to: [2, 0, 0.43], axis: 'h' },
      { from: [2, 0.4, 0.92], to: [3, 0.48, 0.08], axis: 'v' },
    ];

    // O ponto amarelo é gatilho na linguagem da marca, então mora SOBRE o
    // fio: no anchor cru ficaria escondido atrás do card, e na borda exata o
    // card cortaria o círculo ao meio. Anda pelo traço até limpar a caixa do
    // card (mais o raio) e para ali, encostado mas inteiro.
    const sparkSpots = [
      { wire: 0, node: 0, fromEnd: false },
      { wire: 1, node: 2, fromEnd: true },
    ];
    const clearPoint = (wire, node, fromEnd) => {
      const total = wire.getTotalLength();
      const b = box(node);
      const pad = SPARK_R + 1.5;
      const steps = 64;
      for (let i = 0; i <= steps; i += 1) {
        const t = fromEnd ? 1 - i / steps : i / steps;
        const p = wire.getPointAtLength(total * t);
        const out =
          p.x < b.x - pad || p.x > b.x + b.w + pad || p.y < b.y - pad || p.y > b.y + b.h + pad;
        if (out) return p;
      }
      return wire.getPointAtLength(fromEnd ? total : 0);
    };

    // strokeDashoffset em px vira valor velho assim que o "d" muda (resize).
    // Tween num proxy 0..1, com a conversão pro offset no onUpdate, deixa o
    // redesenho seguro: o progresso continua valendo com o fio novo.
    const draw = wires.map(() => ({ p: 0 }));
    const lens = wires.map(() => 0);
    const paint = (i) => {
      wires[i].style.strokeDashoffset = String(lens[i] * (1 - draw[i].p));
    };

    const syncWires = () => {
      wireSpecs.forEach((s, i) => {
        wires[i].setAttribute('d', curve(anchor(...s.from), anchor(...s.to), s.axis));
        lens[i] = wires[i].getTotalLength();
      });
      sparkSpots.forEach((s, i) => {
        const p = clearPoint(wires[s.wire], nodes[s.node], s.fromEnd);
        sparks[i].setAttribute('cx', p.x);
        sparks[i].setAttribute('cy', p.y);
      });
    };

    // Fora do mm: com prefers-reduced-motion a montagem nunca roda, mas o
    // mockup continua na tela e os fios precisam estar no lugar do mesmo
    // jeito. Idem no refresh do ScrollTrigger, que é o gancho de resize.
    syncWires();
    ScrollTrigger.addEventListener('refresh', () => {
      syncWires();
      wires.forEach((w, i) => {
        if (w.style.strokeDasharray) {
          w.style.strokeDasharray = String(lens[i]);
          paint(i);
        }
      });
    });

    if (reduced) return;

    mm.add('(min-width: 768px)', () => {
      section.classList.add('is-cine');
      mockup.removeAttribute('data-reveal-img');
      gsap.set(mockup, { clearProps: 'opacity,transform' });
      syncWires();

      // Estados iniciais da montagem
      gsap.set(nodes, { opacity: 0, y: 18, scale: 0.96 });
      gsap.set(sparks, { opacity: 0, scale: 0.4, transformOrigin: 'center' });
      gsap.set(toggle, { opacity: 0.35 });
      wires.forEach((w, i) => {
        draw[i].p = 0;
        w.style.strokeDasharray = String(lens[i]);
        paint(i);
      });

      const stageAt = (i) => () =>
        stages.forEach((s, j) => s.classList.toggle('is-active', i === j));

      const nodeIn = (i) => [nodes[i], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }];
      const wireDraw = (i) => [
        draw[i],
        { p: 1, duration: 0.65, ease: 'none', onUpdate: () => paint(i) },
      ];

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
        draw.forEach((d) => {
          d.p = 0;
        });
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
