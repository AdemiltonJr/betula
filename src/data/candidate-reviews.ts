// Textos e links enviados pelo usuário em 10/09/2026. Sem notas ou datas inferidas.
export const candidateReviews = [
  {
    name: 'Thiago Vicente',
    url: 'https://www.google.com/maps/contrib/110585516189283899013/reviews?hl=pt-BR',
    excerpt: 'Fui aprovado no processo seletivo e acredito que isso também mostra o quanto a consultoria é comprometida em fazer boas conexões.',
    paragraphs: [
      'Quero deixar aqui minha avaliação super positiva sobre o trabalho realizado, sempre com muito zelo.',
      'Desde o começo, o processo foi bem organizado, claro e tranquilo de acompanhar, o que fez toda a diferença. Quero destacar especialmente a Vanessa, que foi muito atenciosa, cuidadosa e sempre disponível. Dá pra perceber o carinho e a dedicação dela em cada etapa, o que deixou tudo mais leve e até mais seguro pra quem está participando.',
      'Fui aprovado no processo seletivo e acredito que isso também mostra o quanto a consultoria é comprometida em fazer boas conexões.',
      'Só tenho a agradecer pela experiência e pelo ótimo trabalho!',
    ],
  },
  {
    name: 'Luiz Fernando Alcântara',
    url: 'https://www.google.com/maps/contrib/114157382869470388566/reviews?hl=pt-BR',
    excerpt: 'Sempre trouxe feedbacks relevantes e manteve um acompanhamento próximo, o que fez toda a diferença.',
    paragraphs: [
      'Tive uma excelente experiência com a Bétula Recrutamento e Seleção.',
      'Desde o início do processo, a condução foi muito profissional, transparente e ágil. A comunicação foi clara em todas as etapas, o que trouxe bastante segurança e confiança ao longo do processo.',
      'Gostaria de destacar especialmente a atuação da Elaine, que foi extremamente atenciosa, disponível e conduzindo todo o processo com muita empatia e profissionalismo. Sempre trouxe feedbacks relevantes e manteve um acompanhamento próximo, o que fez toda a diferença.',
      'Foi, sem dúvida, uma das melhores experiências que já tive em processos seletivos.',
      'Recomendo fortemente a Bétula tanto para empresas quanto para profissionais que buscam um processo sério, estruturado e de qualidade.',
    ],
  },
  {
    name: 'Thomas Campassi',
    url: 'https://www.google.com/maps/contrib/117354254640562118733/reviews?hl=pt-BR',
    excerpt: 'Ela foi extremamente empática, atenciosa e demonstrou uma sensibilidade admirável ao conduzir a entrevista.',
    paragraphs: [
      'Tive uma experiência excelente durante o processo seletivo com a Julyanna. Ela foi extremamente empática, atenciosa e demonstrou uma sensibilidade admirável ao conduzir a entrevista. Me senti muito confortável durante toda a conversa, o que fez toda a diferença. Profissional incrível, que realmente se preocupa com as pessoas. Parabéns pelo trabalho!',
      'Por mais profissionais como ela.',
    ],
  },
  {
    name: 'Camila Brasil',
    url: 'https://www.google.com/maps/contrib/108088163587068248496/reviews?hl=pt-BR',
    excerpt: 'Cada etapa foi conduzida com profissionalismo e cuidado, o que fez toda a diferença na minha experiência.',
    paragraphs: [
      'Gostaria de deixar registrado meu agradecimento à Bétula RH por todo o processo de recrutamento e seleção.',
      'Desde o primeiro contato, fui muito bem acolhida, com um atendimento extremamente humano, transparente e respeitoso. Cada etapa foi conduzida com profissionalismo e cuidado, o que fez toda a diferença na minha experiência.',
      'Fico muito feliz em compartilhar que, através desse processo, conquistei uma oportunidade maravilhosa, que com certeza será muito importante para o meu crescimento profissional.',
      'Parabéns à equipe pelo excelente trabalho! Vocês realmente fazem a diferença na vida das pessoas.',
      'Gratidão por tudo!',
    ],
  },
  {
    name: 'Adôni Mathias',
    url: 'https://www.google.com/maps/contrib/114876680254059496399/reviews?hl=pt-BR',
    excerpt: 'No mais, o contato é rápido e o retorno é certo, seja ele negativo ou positivo, respeitando o tempo que o candidato dedicou a determinada vaga.',
    paragraphs: [
      'Gostaria de fazer uma menção à Julyanna, a quem conduziu o processo seletivo que participei em sua etapa inicial. Excelente profissional, simpática e com uma abordagem que até então eu não havia tido experiência: Deu 100% de suporte e no dia da entrevista entrou em contato novamente para desejar boa sorte, o que não era sua obrigação (sua parte já havia sido feita), mas a torna diferente dos demais!!',
      'No mais, o contato é rápido e o retorno é certo, seja ele negativo ou positivo, respeitando o tempo que o candidato dedicou a determinada vaga.',
      'Certamente indicaria para alguém que necessitasse de empresas de recrutamento!!',
    ],
  },
] as const;

// Split mantém o texto literal: apenas adicionamos ênfase, sem reescrever a fala.
export function reviewSegments(text: string) {
  return text.split(/(profissionalismo|transparência|transparente|empatia|empática|cuidado|clareza|clara|boas conexões)/gi)
    .map((text, index) => ({ text, emphasized: index % 2 === 1 }));
}
