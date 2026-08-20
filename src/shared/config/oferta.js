// Oferta única da LP, num lugar só: os 14 dias grátis e o destino de todo CTA
// de conversão. Os módulos leem daqui pra não sair repetindo o número em
// vários lugares e desalinhar.
//
// Onde o teste aparece: só no fecho da página (seção de oferta, FAQ e CTA
// final). Topo (nav e hero) fica com o rótulo neutro de propósito: quem acabou
// de chegar ainda não sabe o que é o Falow, o teste é argumento de quem já
// desceu a página inteira.
//
// Regra de produto: planos e preços NÃO aparecem na landing. Quem quiser
// valor cria a conta e vê dentro da plataforma (mesmo modelo do ManyChat).
// Por isso a LP nunca mostra tabela, só o teste e o caminho pro cadastro.

export const OFERTA = {
  dias: 14,
  selo: '14 dias grátis',
  ctaPadrao: 'Começar agora', // nav, ink-menu e hero
  ctaTeste: 'Testar 14 dias grátis', // fecho da página

  // Cadastro na plataforma. TODO: trocar pela URL real do app quando existir.
  // Enquanto for null, os CTAs rolam pra seção de oferta em vez de apontar
  // pra lugar nenhum. Mudar aqui atualiza a página inteira.
  cadastroUrl: null,
};

// Destino de todo CTA de conversão.
export const destinoCta = OFERTA.cadastroUrl ?? '#comecar';
