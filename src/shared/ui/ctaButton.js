// CTA com rolagem de rótulo.
// Efeito portado da damascenafilms.com.br (a.cta): o rótulo é duplicado, o de
// cima sobe 110% e o debaixo entra de 110%, dando a volta como um rolo. Aqui
// vai com os tokens do Falow, sem trazer nada da paleta de origem.
// Estilos em ui.css (.cta-label / .cta-roll / .cta-roll-dup).
//
// Só o CTA primário rola. O secundário fica quieto: se os dois girassem, o
// movimento deixaria de sinalizar qual é a ação principal.

export function ctaButton({ label, href, variant = 'primary', size = '', attrs = '' }) {
  const ghost = variant === 'ghost';
  const classes = ['cta', ghost ? 'cta-ghost' : 'cta-primary', size].filter(Boolean).join(' ');
  const conteudo = ghost
    ? label
    : `<span class="cta-label">
        <span class="cta-roll">${label}</span>
        <span class="cta-roll cta-roll-dup" aria-hidden="true">${label}</span>
      </span>`;
  return `
    <a class="${classes}" href="${href}"${attrs ? ' ' + attrs : ''}>
      ${conteudo}
    </a>
  `;
}
