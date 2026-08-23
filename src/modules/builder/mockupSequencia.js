// Réplica HTML/CSS do canvas de sequências do produto (referência:
// tasks/research/product-screens/falow-sequencias-nova.png). Dados fictícios,
// nada de handle ou conversa real. Nós e conectores carregam data-attrs
// pra F4 animar a montagem do fluxo (scrub).

function node({ id, kind, icon, title, body, badges = [], x, y, w = 30 }) {
  return `
    <div class="sq-node" data-node="${id}" data-kind="${kind}" style="--x:${x}%;--y:${y}%;--w:${w}%">
      <div class="sq-node-head">
        <span class="sq-node-icon" data-kind="${kind}" aria-hidden="true">${icon}</span>
        <div>
          <span class="sq-node-kind">${title}</span>
          ${body ? `<p class="sq-node-body">${body}</p>` : ''}
        </div>
        <span class="sq-node-handle" aria-hidden="true"></span>
      </div>
      ${badges.length ? `<div class="sq-node-badges">${badges.map((b) => `<span class="sq-chip">${b}</span>`).join('')}</div>` : ''}
    </div>
  `;
}

const ZAP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>`;
const MSG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;
const BTN = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="8" rx="3"/></svg>`;

export function mockupSequencia({ blocks }) {
  return `
    <div class="sq-frame" role="img" aria-label="Builder de sequências do Falow: fluxo com gatilho, mensagem e botões ramificando">
      <div class="sq-toolbar">
        <span class="sq-toolbar-label">Adicionar bloco:</span>
        ${blocks.map((b) => `<span class="sq-tool">+ ${b}</span>`).join('')}
        <span class="sq-active"><span class="sq-active-dot"></span> Ativa</span>
      </div>
      <div class="sq-canvas">
        <!-- Este "d" é o traçado original desenhado à mão e serve de fallback
             sem JS. Com JS, builder.js reescreve os mesmos arcos a partir da
             caixa medida de cada card, pra o fio encaixar em qualquer largura.
             As frações de ancoragem lá saíram exatamente destas coordenadas:
             mudou o desenho aqui, reconferir os specs de lá. -->
        <svg class="sq-wires" viewBox="0 0 640 320" preserveAspectRatio="none" aria-hidden="true">
          <path class="sq-wire" data-wire="0" d="M 118 160 C 170 160, 180 96, 232 96"/>
          <path class="sq-wire" data-wire="1" d="M 366 96 C 410 96, 414 150, 452 150"/>
          <path class="sq-wire" data-wire="2" d="M 517 189 C 517 224, 438 200, 438 235"/>
          <circle class="sq-spark" data-spark="0" cx="118" cy="160" r="5"/>
          <circle class="sq-spark" data-spark="1" cx="452" cy="150" r="5"/>
        </svg>
        ${node({ id: 0, kind: 'gatilho', icon: ZAP, title: 'Gatilho', body: 'palavra-chave: "quero"', x: 3, y: 38, w: 26 })}
        ${node({ id: 1, kind: 'mensagem', icon: MSG, title: 'Mensagem', body: 'Chegou! Te mando o link?', x: 36, y: 18, w: 30 })}
        ${node({ id: 2, kind: 'botoes', icon: BTN, title: 'Botões', body: null, badges: ['Sim, quero', 'Depois'], x: 70, y: 36, w: 27 })}
        ${node({ id: 3, kind: 'mensagem', icon: MSG, title: 'Mensagem', body: 'Aqui está 👉', x: 56, y: 72, w: 26 })}
      </div>
    </div>
  `;
}
