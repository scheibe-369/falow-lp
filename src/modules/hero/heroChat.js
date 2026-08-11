// Pilha de mensagens do hero: cada bolha fica ancorada no rodapé da pilha
// e as anteriores sobem quando uma nova entra (mecânica da LP do ManyChat,
// medida no site: empurrão = altura da nova bolha + gap).
// A direção é explícita: quem escreve fica na esquerda com foto, o Falow
// responde na direita em verde, e cada bolha entra deslizando do seu lado.
// Só decoração: o container leva aria-hidden no hero.js.

function bubble(msg) {
  const btn = msg.button ? `<span class="msg-btn">${msg.button}</span>` : '';
  const avatar = msg.avatar
    ? `<img class="msg-avatar" src="${msg.avatar}" alt="" width="36" height="36" decoding="async">`
    : '';
  return `
    <div class="hero-msg hero-msg-${msg.side}">
      ${avatar}
      <div class="msg-bubble">
        <p class="msg-text">${msg.text}</p>
        ${btn}
      </div>
    </div>
  `;
}

export function heroChat(chat) {
  return `<div class="hero-chat" aria-hidden="true">${chat.map(bubble).join('')}</div>`;
}
