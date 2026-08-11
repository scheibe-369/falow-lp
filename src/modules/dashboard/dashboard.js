import './dashboard.css';
import { dashboardData } from './dashboard.data.js';
import { sparkline } from './sparkline.js';

export default {
  id: 'dashboard',
  render() {
    const el = document.createElement('section');
    el.id = 'dashboard';
    el.dataset.theme = 'light';
    el.innerHTML = `
      <div class="mx-auto w-full max-w-[73.5rem] px-5 py-20 md:px-8 md:py-28">
        <p class="section-eyebrow">${dashboardData.eyebrow}</p>
        <h2 class="section-title" data-reveal-blur>${dashboardData.title}</h2>
        <p class="section-sub" data-reveal>${dashboardData.sub}</p>
        <div class="db-card" data-reveal-img>
          <div class="db-kpis">
            ${dashboardData.kpis
              .map(
                (k) => `
              <div class="db-kpi">
                <p class="db-kpi-label">${k.label}</p>
                <p class="db-kpi-value" data-count="${k.value}" data-suffix="${k.suffix || ''}">${k.value}${k.suffix || ''}</p>
                <p class="db-kpi-hint">${k.hint}</p>
              </div>`
              )
              .join('')}
          </div>
          <div class="db-spark" aria-hidden="true">${sparkline(dashboardData.spark)}</div>
          <ul class="db-logs">
            ${dashboardData.logs
              .map(
                (l) => `
              <li class="db-log">
                <span class="db-log-text">${l.text}</span>
                <span class="badge badge-${l.tone}">${l.badge}</span>
                <span class="db-log-time">${l.time}</span>
              </li>`
              )
              .join('')}
          </ul>
        </div>
      </div>
    `;
    return el;
  },
  init({ gsap, reduced }) {
    if (reduced) return;
    const card = document.querySelector('#dashboard .db-card');
    const values = [...card.querySelectorAll('.db-kpi-value')];
    const spark = card.querySelector('.spark-line');

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();

        for (const el of values) {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: 0.9,
            ease: 'power2.out',
            onUpdate: () => (el.textContent = Math.round(state.v) + suffix),
          });
        }

        if (spark) {
          const len = spark.getTotalLength();
          spark.style.strokeDasharray = String(len);
          spark.style.strokeDashoffset = String(len);
          gsap.to(spark, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', delay: 0.2 });
        }

        gsap.from(card.querySelectorAll('.db-log'), {
          opacity: 0,
          y: 10,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.09,
          delay: 0.35,
        });
      },
      { rootMargin: '0px 0px -25% 0px' }
    );
    io.observe(card);
    return () => io.disconnect();
  },
};
