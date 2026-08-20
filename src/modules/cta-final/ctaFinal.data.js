import { OFERTA, destinoCta } from '../../shared/config/oferta.js';

export const ctaFinalData = {
  tagline: 'Conversas que viram vendas.',
  sub: 'Comentário vira DM. DM vira conversa. Conversa vira venda. A próxima pode estar rolando agora.',
  cta: { label: OFERTA.ctaTeste, href: destinoCta },
  nota: `Você usa o Falow por ${OFERTA.dias} dias. Os planos ficam dentro da plataforma, escolhe depois.`,
};
