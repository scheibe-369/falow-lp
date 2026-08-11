export const heroData = {
  eyebrow: 'Automação de DMs e comentários para Instagram',
  title: 'Seu Instagram responde em segundos. Você vende.',
  sub: 'Regras de palavra-chave e sequências visuais que transformam DMs e comentários em conversas, e conversas em vendas.',
  ctaPrimary: { label: 'Começar agora', href: '#comecar' },
  ctaGhost: { label: 'Ver como funciona', href: '#como-funciona' },

  bg: {
    src: '/hero-bg.webp',
    srcset: '/hero-bg-960.webp 960w, /hero-bg.webp 1920w',
    width: 1920,
    height: 1024,
  },

  // Conversa que roda em loop sobre a foto. Ordem = ordem de entrada.
  // side: 'out' = Falow respondendo (direita, verde) · 'in' = pessoa
  // escrevendo (esquerda, com foto).
  // A foto é da Unsplash (licença permite uso comercial sem atribuição).
  // Trocar por foto própria quando o usuário tiver uma.
  chat: [
    { side: 'out', text: 'Oi, aqui está o e-book que você queria!', button: 'Baixar ebook' },
    { side: 'in', text: 'Você tem um site pra eu conhecer melhor?', avatar: '/avatars/cliente.webp' },
    { side: 'out', text: 'Sim! Aqui está o link!', button: 'Vamos lá!' },
  ],
};
