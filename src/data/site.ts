/**
 * Fonte central de conteúdo institucional.
 *
 * Os dados sensíveis abaixo reproduzem as fontes atuais aprovadas para a prévia.
 * Eles permanecem provisórios até a validação final da Bétula.
 */
export const contentValidation = {
  status: 'provisional',
  pending: [
    'equipe, cargos e correspondência das fotografias',
    'telefones e endereços de email',
    'endereço',
    'autorização e atualidade dos clientes',
    'fidelidade e autorização dos depoimentos',
  ],
} as const;

export const organization = {
  name: 'Bétula Recrutamento e Seleção',
  shortName: 'Bétula RH',
  url: 'https://betularh.com.br/',
  title: 'Recrutamento e Seleção em Campinas | Bétula RH',
  description:
    'Consultoria de recrutamento e seleção em Campinas, com atuação em todo o Brasil. Entendemos o contexto da empresa antes de iniciar a busca.',
  email: 'luciana@betularh.com.br',
  curriculumEmail: 'curriculo@betularh.com.br',
  address: 'Rua Paulo César Fidelis, 39, Sala 311, Villa Bella, Campinas/SP',
  instagram: 'https://www.instagram.com/betularh/',
  linkedin: 'https://www.linkedin.com/company/betularecrutamentoeselecao',
} as const;

const whatsappMessage =
  'Olá! Quero conversar sobre uma necessidade de contratação da minha empresa.';

export const contacts = {
  primary: {
    name: 'Luciana Alvim',
    display: '(19) 98138-9865',
    phone: '5519981389865',
  },
  secondary: {
    name: 'Vanessa Luiz',
    display: '(19) 98129-8401',
    phone: '5519981298401',
  },
} as const;

export function whatsappHref(phone: string = contacts.primary.phone, message = whatsappMessage) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const navigation = [
  { href: '#atuacao', label: 'Onde atuamos' },
  { href: '#processo', label: 'Como atuamos' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#equipe', label: 'Quem conduz' },
] as const;

export const processMoments = [
  {
    title: 'Compreensão',
    summary:
      'Antes da busca, entendemos o negócio, o momento e o que a contratação precisa transformar.',
    steps: [
      'Compreensão do segmento, momento e cultura do cliente, além da estratégia por trás da contratação.',
      'Identificação e alinhamento do perfil da vaga.',
    ],
  },
  {
    title: 'Busca',
    summary:
      'A estratégia de atração nasce do contexto, não de uma divulgação genérica.',
    steps: [
      'Recrutamento e hunting de candidatos.',
      'Análise e triagem de currículos.',
    ],
  },
  {
    title: 'Avaliação',
    summary:
      'Avaliamos trajetória, repertório, aspectos técnicos e aderência ao ambiente da empresa.',
    steps: [
      'Entrevistas sobre formação, trajetória, experiência, expectativas, motivações e aspectos comportamentais.',
      'Aplicação de provas técnicas e testes, quando necessários.',
      'Seleção dos candidatos a serem avaliados pelo cliente.',
      'Elaboração e envio de relatórios com informações e pareceres.',
      'Agendamento de entrevistas dos candidatos com o cliente.',
    ],
  },
  {
    title: 'Acompanhamento',
    summary:
      'O processo termina com retorno responsável e continua na adaptação de quem foi contratado.',
    steps: [
      'Fechamento e conclusão do processo com retorno aos candidatos participantes.',
      'Acompanhamento do candidato admitido.',
    ],
  },
] as const;

export const clients = [
  ['cli-isorecort.webp', 'Isorecort'],
  ['cli-ie-pescados.svg', 'IE Pescados'],
  ['cli-sitio-recanto.png', 'Sítio Recanto do Queijo'],
  ['cli-clinica-cidade.svg', 'Clínica da Cidade'],
  ['', 'Columbia Brasil'], // Logo depende da confirmação da empresa.
  ['cli-sao-vicente.png', 'Supermercados São Vicente'],
  ['cli-fyp.png', 'FYP Engenharia'],
  ['cli-aguajato.webp', 'Aguajato'],
  ['cli-casa-da-alma.svg', 'Casa da Alma Cosméticos'],
  ['cli-grancoffee.png', 'Gran Coffee'],
  ['cli-livre-sofia.png', 'Escola Livre Sofia'],
  ['cli-osteopatia-madrid.png', 'Escola de Osteopatia de Madrid'],
  ['cli-tecnopav.png', 'Tecnopav'],
  ['cli-telashop.png', 'Telashop'],
  ['cli-tso.png', 'TSO'],
  ['cli-waldorf-acalanto.png', 'Escola Waldorf Acalanto'],
  ['cli-wgk.png', 'WGK'],
] as const;

export const testimonials = [
  {
    quote:
      'Luciana tem verdadeiro comprometimento e muita empatia no trabalho que desenvolve. Sua escuta ativa, assertividade no diálogo e experiência resultam em orientações extremamente pertinentes para a tomada de decisão.',
    name: 'Camila Horiye Rodrigues',
    role: 'Diretora Adjunta do ICV',
  },
  {
    quote:
      'Parabenizo a forma com que foi conduzido o processo seletivo, estruturado, com foco no candidato e na empresa cliente.',
    name: 'Maria Ieda Tyska Danoski',
    role: 'Gerente de Recursos Humanos',
  },
  {
    quote:
      'Assertiva, inteligente e muito transparente, Luciana teve a capacidade de me atrair para um processo de seleção em um momento em que eu não buscava recolocação.',
    name: 'Fernanda Francabandiera',
    role: 'Gerente Sênior de RH',
  },
] as const;

export const team = [
  {
    image: 'team-luciana-alvim.jpg',
    name: 'Luciana Alvim',
    role: 'Fundadora e especialista em seleção',
    bio: 'Psicóloga responsável pela estratégia, métodos, processos, novos negócios e relações com clientes.',
  },
  {
    image: 'team-vanessa-luiz.jpg',
    name: 'Vanessa Luiz',
    role: 'Operação e processos seletivos',
    bio: 'Administradora com carreira consolidada em Recursos Humanos, responsável pela operação e pelos indicadores da consultoria.',
  },
  {
    image: 'team-tamara-tordin.jpg',
    name: 'Tamara Tordin',
    role: 'Experiência de candidatos',
    bio: 'Administradora responsável por assegurar uma experiência positiva e uma interação eficaz com candidatos.',
  },
  {
    image: 'team-elaine-souza.jpg',
    name: 'Elaine Souza',
    role: 'Recursos Humanos e seleção',
    bio: 'Administradora com experiência generalista em Recursos Humanos, Departamento Pessoal, recrutamento e seleção.',
  },
  {
    image: 'team-georgia-frattini.jpg',
    name: 'Georgia Frattini',
    role: 'Desenvolvimento de pessoas e seleção',
    bio: 'Administradora com experiência em desenvolvimento de pessoas, recrutamento e seleção.',
  },
  {
    image: 'team-keila-assis.jpg',
    name: 'Keila Assis',
    role: 'Avaliação psicológica',
    bio: 'Psicóloga e terapeuta que conduz avaliações e testes de atenção, cognição e personalidade.',
  },
] as const;

export const media = {
  hero: '/assets/img/equipe-grupo-2.jpg',
  humanGroup: '/assets/img/socias-2.jpg',
  humanPortrait: '/assets/img/retrato-a.jpg',
  process: '/assets/img/office-candid.jpg',
  teamGroup: '/assets/img/equipe-grupo.jpg',
} as const;

export const pageCopy = {
  heroTitle: 'Antes do currículo, vem o contexto.',
  heroLead: 'Recrutamento e seleção em Campinas para empresas que precisam contratar com mais clareza e confiança.',
  heroPrimary: 'Conversar sobre uma contratação',
  heroSecondary: 'Conhecer nosso processo',
} as const;
