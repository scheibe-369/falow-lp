export const dashboardData = {
  eyebrow: 'Dashboard',
  title: 'Você vê o que está funcionando, e faz mais disso.',
  sub: 'Mensagens recebidas, respostas enviadas, taxa de match e contatos únicos. Atividade dos últimos 14 dias, sem planilha.',
  kpis: [
    { label: 'Mensagens recebidas', value: 742, hint: 'DMs processadas' },
    { label: 'Respostas enviadas', value: 318, hint: 'Automações disparadas' },
    { label: 'Taxa de match', value: 43, suffix: '%', hint: 'Mensagens que casaram com regras' },
    { label: 'Contatos únicos', value: 296, hint: 'Pessoas que enviaram DM' },
  ],
  logs: [
    { text: 'promo', badge: 'Respondida', tone: 'success', time: 'há 2 min' },
    { text: 'quero saber o preço', badge: 'Respondida', tone: 'success', time: 'há 9 min' },
    { text: 'oi, tudo bem?', badge: 'Sem match', tone: 'neutral', time: 'há 14 min' },
  ],
  spark: [12, 18, 15, 22, 19, 26, 24, 31, 28, 35, 30, 42, 55, 71],
};
