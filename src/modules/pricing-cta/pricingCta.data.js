import { OFERTA, destinoCta } from '../../shared/config/oferta.js';

// Seção de oferta. Não é tabela de planos de propósito: preço só dentro da
// plataforma (ver src/shared/config/oferta.js).
export const pricingCtaData = {
  title: `Teste ${OFERTA.dias} dias e coloque o seu Instagram no automático.`,
  sub: 'Planos e preços você vê dentro da plataforma, depois de rodar as suas primeiras automações.',
  cta: { label: OFERTA.ctaTeste, href: destinoCta },
  trust: [OFERTA.selo, 'Ativa no mesmo dia', 'Sem instalação', 'Cancela quando quiser'],
};
