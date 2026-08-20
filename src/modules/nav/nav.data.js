import { OFERTA, destinoCta } from '../../shared/config/oferta.js';

export const navData = {
  links: [
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Automação', href: '#builder' },
    { label: 'Recursos', href: '#diferenciais' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: OFERTA.ctaPadrao, href: destinoCta },
};
