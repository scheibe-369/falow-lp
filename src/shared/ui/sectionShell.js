// Primitivo agnóstico: casca padrão de seção (tema + container + cabeçalho).
// Zero conhecimento de domínio; módulos passam conteúdo pronto.
export function sectionShell({ id, theme = 'light', eyebrow, title, sub, children = '' }) {
  const section = document.createElement('section');
  section.id = id;
  section.dataset.theme = theme;
  section.className = 'section-shell';
  section.innerHTML = `
    <div class="mx-auto w-full max-w-[73.5rem] px-5 py-20 md:px-8 md:py-28">
      ${eyebrow ? `<p class="section-eyebrow" data-reveal>${eyebrow}</p>` : ''}
      ${title ? `<h2 class="section-title" data-reveal-blur>${title}</h2>` : ''}
      ${sub ? `<p class="section-sub" data-reveal>${sub}</p>` : ''}
      <div class="section-body">${children}</div>
    </div>
  `;
  return section;
}
