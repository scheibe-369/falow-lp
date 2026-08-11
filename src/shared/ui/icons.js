// Subset Lucide inline (stroke 2, cantos arredondados, DS §17).
const ICONS = {
  workflow: `<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><path d="M10 6.5h4a2 2 0 0 1 2 2V14"/>`,
  zap: `<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/>`,
  chart: `<path d="M3 3v18h18"/><path d="M7 15v-4m5 4V8m5 7v-6"/>`,
};

export function icon(name, { size = 22 } = {}) {
  const paths = ICONS[name];
  if (!paths) return '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${paths}</svg>`;
}
