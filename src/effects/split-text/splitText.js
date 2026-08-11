// Split de texto sem plugin pago (port dos helpers do preloader de referência).
// Palavras ficam em wrappers white-space:nowrap pra não quebrar no meio.
import './splitText.css';

export function splitChars(el) {
  const words = el.textContent.split(/(\s+)/);
  el.textContent = '';
  const chars = [];
  for (const word of words) {
    if (/^\s+$/.test(word)) {
      el.appendChild(document.createTextNode(' '));
      continue;
    }
    const w = document.createElement('span');
    w.className = 'st-word';
    for (const ch of word) {
      const mask = document.createElement('span');
      mask.className = 'st-mask';
      const c = document.createElement('span');
      c.className = 'st-char';
      c.textContent = ch;
      mask.appendChild(c);
      w.appendChild(mask);
      chars.push(c);
    }
    el.appendChild(w);
  }
  return chars;
}
