// Sparkline SVG (14 dias). Path verde com área suave; F3 anima por dashoffset.
export function sparkline(values, { w = 560, h = 96, pad = 6 } = {}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const stepX = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => [
    pad + i * stepX,
    pad + (h - pad * 2) * (1 - (v - min) / span),
  ]);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${d} L ${pts[pts.length - 1][0].toFixed(1)} ${h - pad} L ${pad} ${h - pad} Z`;
  const [lx, ly] = pts[pts.length - 1];
  return `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
      <path d="${area}" fill="rgba(50, 232, 117, 0.09)"/>
      <path class="spark-line" d="${d}" fill="none" stroke="#32E875" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="4" fill="#FFD43B"/>
    </svg>
  `;
}
