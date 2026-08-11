// Marca Falow: símbolo (anel + ponto, inline p/ animação) + wordmark.
// ATENÇÃO: o wordmark aqui é a APROXIMAÇÃO permitida pra protótipo
// (Manrope ExtraBold, DS §7.3). Pendência registrada: trocar pelo vetor
// oficial quando o usuário fornecer. Nunca considerar final.

export function ringSvg({ size = 64, strokeWidth = 11 } = {}) {
  return `
    <svg class="ring-symbol" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path class="ring-arc" d="M 24.8 11.9 A 21.5 21.5 0 1 0 40.5 12.1"
            stroke="#32E875" stroke-width="${strokeWidth}" stroke-linecap="round"/>
      <circle class="ring-dot" cx="15.5" cy="9.5" r="6.5" fill="#FFD43B"/>
    </svg>
  `;
}

export function brandMark({ size = 28 } = {}) {
  return `
    <span class="brand-mark" style="--brand-size:${size}px">
      ${ringSvg({ size })}
      <span class="brand-word">falow</span>
    </span>
  `;
}
