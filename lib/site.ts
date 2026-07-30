/**
 * Todo o conteúdo editável do site em um lugar só.
 * Para trocar textos, telefones ou posts, mexa só aqui — nenhum componente
 * tem texto fixo dentro dele.
 */

export const site = {
  name: "Otosons",
  razaoSocial: "Centro Auditivo Otosons LTDA",
  cnpj: "07.970.236/0001-08",
  fundacao: "2006-04-17",
  tagline: "Aparelhos Auditivos",
  description:
    "Tecnologia de ponta e atendimento fonoaudiológico personalizado para recuperar a sua audição e a sua qualidade de vida.",
  /*
   * Base de TODO o SEO: canonical, sitemap, Open Graph e JSON-LD saem daqui.
   *
   * Vem de env para a hospedagem poder trocar sem alterar código. ATENÇÃO: o
   * padrão abaixo é o domínio do site ANTIGO — se o site novo for para outro
   * domínio ou subdomínio, definir NEXT_PUBLIC_SITE_URL ANTES do build, senão
   * o Google indexa as URLs erradas. Ver .env.example.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://otosons.com.br",
  /* Usado no <meta keywords> e como base semântica dos textos das páginas.
     Termos escolhidos por intenção de busca local ("em Niterói", "Icaraí"),
     que é onde uma clínica de bairro realmente compete. */
  palavrasChave: [
    "aparelho auditivo Niterói",
    "aparelhos auditivos Icaraí",
    "centro auditivo Niterói",
    "audiometria Niterói",
    "fonoaudiólogo Niterói",
    "teste auditivo gratuito",
    "adaptação de aparelho auditivo",
    "perda auditiva",
    "zumbido",
    "CPAP apneia do sono",
  ],
};

/**
 * Descrição de cada rota, usada nas <meta> e no Open Graph.
 *
 * Ficam aqui (e não espalhadas nos `page.tsx`) por dois motivos: o texto é
 * conteúdo editável como qualquer outro, e assim dá pra revisar todas as
 * descrições lado a lado — que é como se percebe canibalização de palavra
 * chave entre páginas do mesmo site.
 *
 * Regra de ouro do formato: 150–160 caracteres, verbo de ação no começo,
 * cidade no texto (busca local), sem repetir o nome da marca (o `template`
 * do layout já concatena "| Otosons").
 */
export const seoPaginas = {
  home: {
    titulo: `${site.name} — ${site.tagline} em Niterói — RJ`,
    descricao:
      "Centro auditivo em Icaraí, Niterói, há 20 anos. Audiometria, adaptação de aparelhos auditivos e acompanhamento fonoaudiológico. Agende sua avaliação gratuita.",
  },
  sobre: {
    titulo: "Sobre a Otosons",
    descricao:
      "Conheça o Centro Auditivo Otosons: 20 anos em Icaraí, Niterói, com fonoaudiólogos especializados em reabilitação auditiva e adaptação de aparelhos.",
  },
  servicos: {
    titulo: "Serviços e Atendimento",
    descricao:
      "Audiometria tonal e vocal, atendimento fonoaudiológico, adaptação de aparelhos auditivos e manutenção técnica em Niterói. Veja como funciona cada etapa.",
  },
  aparelhos: {
    titulo: "Catálogo de Aparelhos Auditivos",
    descricao:
      "Aparelhos auditivos Oticon, Interton e Argosy em Niterói: retroauriculares, intra-auriculares e recarregáveis. Teste em casa antes de decidir.",
  },
  depoimentos: {
    titulo: "Depoimentos de Pacientes",
    descricao:
      "Avaliações reais de quem voltou a ouvir com a Otosons — nota 4,6 no Google. Veja histórias de pacientes atendidos em Icaraí, Niterói.",
  },
  blog: {
    titulo: "Blog sobre Saúde Auditiva",
    descricao:
      "Artigos sobre perda auditiva, tipos de aparelhos e cuidados com o seu dispositivo, escritos pela equipe de fonoaudiologia da Otosons.",
  },
  faq: {
    titulo: "Dúvidas Frequentes",
    descricao:
      "Quanto custa um aparelho auditivo? Como é o teste? Tem garantia? Respostas diretas às principais dúvidas sobre audição e aparelhos auditivos.",
  },
  contato: {
    titulo: "Contato e Localização",
    descricao:
      "Rua Gavião Peixoto, 13 — Loja 103, Icaraí, Niterói. Telefone, WhatsApp, horários e mapa. Atendimento presencial e visitas domiciliares na região.",
  },
} as const;

/**
 * Endereço, telefone e nota vieram do perfil real da Otosons no Google Maps
 * (4,6 · 85 avaliações) — substituem o endereço de Maricá do mockup original,
 * que não corresponde a nenhuma unidade encontrada.
 *
 * Horário é uma aproximação: o Maps não deixou expandir "Outros horários" e o
 * Waze só devolveu dois dias, com valores inconsistentes entre si (seg. até
 * 18h, ter. até 17h). Pendência de conferência — ver CONTEXTO.md.
 */
export const contato = {
  endereco: "Rua Gavião Peixoto, 13 — Loja 103, Icaraí — Niterói, RJ",
  cep: "24230-090",
  telefone: "(21) 98191-0466",
  telefoneLink: "tel:+5521981910466",
  whatsapp:
    "https://wa.me/5521981910466?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20auditiva.",
  email: "contato@otosons.com.br",
  horario: "Seg a Sex: 9h às 18h",
  /**
   * Quebra por dia, usada na página /contato e no JSON-LD `openingHours`.
   * ATENÇÃO: sábado está como "a confirmar" de propósito — o Google Maps não
   * deixou expandir "Outros horários" e o Waze devolveu dois dias com valores
   * inconsistentes entre si. Preencher quando o cliente confirmar; enquanto
   * estiver `null`, a UI mostra o aviso em vez de um horário inventado.
   */
  horarioDetalhado: [
    { dia: "Segunda a sexta", horas: "9h às 18h" },
    { dia: "Sábado", horas: null },
    { dia: "Domingo e feriados", horas: "Fechado" },
  ] as { dia: string; horas: string | null }[],
  bairro: "Icaraí",
  cidade: "Niterói",
  estado: "RJ",
  mapsUrl: "https://maps.google.com/?q=Otosons+Aparelhos+Auditivos+Icaraí+Niterói",
  /** Coordenadas exatas do perfil do Google Maps — usadas no embed do mapa. */
  lat: -22.9011994,
  lng: -43.1126201,
  notaGoogle: 4.6,
  avaliacoesGoogle: 85,
};

/**
 * Orientações de chegada. Tudo aqui é observável no mapa (a loja fica na
 * Gavião Peixoto, a duas quadras do Campo de São Bento, em Icaraí) — não há
 * afirmação sobre estacionamento próprio ou convênio de garagem, que seriam
 * promessas que não posso verificar.
 */
export const comoChegar = [
  {
    icone: "car",
    titulo: "De carro",
    texto:
      "A Rua Gavião Peixoto é uma das vias principais de Icaraí. Há estacionamentos rotativos e garagens particulares nas ruas do entorno.",
  },
  {
    icone: "bus",
    titulo: "De ônibus",
    texto:
      "Diversas linhas municipais e intermunicipais param na Gavião Peixoto e na Avenida Roberto Silveira, a poucos metros da loja.",
  },
  {
    icone: "walk",
    titulo: "A pé",
    texto:
      "Estamos a poucos minutos do Campo de São Bento e da Praia de Icaraí, no coração do bairro.",
  },
  {
    icone: "home",
    titulo: "Atendimento domiciliar",
    texto:
      "Para quem tem dificuldade de locomoção, levamos a avaliação e o teste do aparelho até a sua casa — combine pelo WhatsApp.",
  },
] as const;

export const social = [
  { nome: "Instagram", href: "https://instagram.com/otosons", icone: "instagram" },
  { nome: "Facebook", href: "https://facebook.com/otosons", icone: "facebook" },
  { nome: "YouTube", href: "https://youtube.com/@otosons", icone: "youtube" },
  { nome: "LinkedIn", href: "https://linkedin.com/company/otosons", icone: "linkedin" },
] as const;

/*
 * Rotas de página de verdade, não âncoras — site institucional multi-página,
 * como o protótipo Figma. O Home continua tendo sua própria seção "Serviços"
 * e "Blog" resumidas (com âncora própria, ver home.tsx), mas o item da nav
 * sempre leva para a página completa.
 */
export const navegacao = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Aparelhos", href: "/aparelhos" },
  { label: "Depoimentos", href: "/depoimentos" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contato", href: "/contato" },
];

export const hero = {
  /**
   * Quebras de linha fixas, medidas no mockup. Cada item é uma linha:
   * `escuro` sai em preto e `claro` em cinza.
   *
   * As quebras são explícitas em vez de deixadas para o navegador porque o
   * mockup usa uma fonte mais estreita que a Poppins — confiar na quebra
   * automática daria três linhas diferentes das do desenho. Em telas
   * estreitas as linhas voltam a ser texto corrido e quebram sozinhas.
   */
  linhas: [
    { escuro: "Recupere Sua Audição e Redescubra", claro: "" },
    { escuro: "os Momentos que", claro: "Fazem a Vida" },
    { escuro: "", claro: "Valer a Pena" },
  ],
  subtitulo:
    "Tecnologia de ponta unida a um atendimento fonoaudiológico personalizado.",
  cta: "Agende sua avaliação gratuita",
};

/**
 * Grid bento de serviços (usado só no teaser do Home). `span` é quantas
 * colunas de 12 o card ocupa no desktop — 7/5 na primeira linha e 5/7 na
 * segunda, reproduzindo o ritmo largo-estreito / estreito-largo do mockup.
 *
 * `duracao` e `comoFunciona` alimentam a página /servicos completa (ver
 * components/servicos-completo.tsx). Só o primeiro item (Testes Auditivos)
 * veio de captura real do protótipo Figma — "Cerca de 40 minutos" e os 4
 * passos são texto exato visto na tela. Os outros três são extrapolações
 * coerentes com o mesmo padrão, não confirmadas visualmente (o Figma travou
 * antes de eu rolar até eles) — revisar se quiser fidelidade total.
 */
export const servicos = [
  {
    titulo: "Testes Auditivos",
    descricao:
      "Audiometria completa com equipamento calibrado e laudo no mesmo dia.",
    imagem: "/images/servicos/testes-auditivos.webp",
    span: 7,
    duracao: "Cerca de 40 minutos",
    comoFunciona: [
      "Anamnese e histórico auditivo",
      "Exame otoscópico",
      "Audiometria tonal e vocal",
      "Interpretação e orientação",
    ],
  },
  {
    titulo: "Atendimento Fonoaudiológico",
    descricao: "Acompanhamento individual do diagnóstico à adaptação.",
    imagem: "/images/servicos/atendimento.webp",
    span: 5,
    /* duracao/comoFunciona confirmados por print real do protótipo Figma em
       29/07/2026 (pasta "fotos da pagina") — substituem a extrapolação
       anterior, nunca confirmada visualmente (ver CONTEXTO.md §9). */
    duracao: "Consultas de 30 a 60 minutos",
    comoFunciona: [
      "Consulta inicial detalhada",
      "Plano terapêutico individual",
      "Reabilitação auditiva",
      "Acompanhamento contínuo",
    ],
  },
  {
    titulo: "Adaptação de Aparelhos",
    descricao: "Regulagem fina do aparelho ao seu perfil auditivo e rotina.",
    imagem: "/images/servicos/adaptacao.webp",
    span: 5,
    duracao: "Processo de 2 a 4 semanas",
    comoFunciona: [
      "Seleção do modelo ideal",
      "Programação personalizada",
      "Teste de adaptação",
      "Ajustes finos de acompanhamento",
    ],
  },
  {
    titulo: "Manutenção e Suporte",
    descricao:
      "Limpeza, revisão e assistência técnica para prolongar a vida do aparelho.",
    imagem: "/images/servicos/manutencao.webp",
    span: 7,
    duracao: "Atendimento no mesmo dia",
    comoFunciona: [
      "Limpeza e higienização",
      "Reparos e troca de peças",
      "Cobertura de garantia",
      "Suporte técnico rápido",
    ],
  },
];

/**
 * Serviços que o site antigo (otosons.com.br) anuncia além da adaptação de
 * aparelhos, e que até agora só apareciam citados numa resposta do FAQ —
 * pendência §12.12 do CONTEXTO. São fonte real, não invenção.
 */
export const servicosComplementares = {
  kicker: "Também cuidamos de",
  titulo: "Além dos aparelhos auditivos",
  subtitulo:
    "A saúde auditiva não se resume à perda de audição. Dois tratamentos que também fazem parte do nosso trabalho.",
  itens: [
    {
      titulo: "Tratamento de Zumbido",
      descricao:
        "O zumbido — aquele apito ou chiado constante no ouvido — tem tratamento. Fazemos a avaliação e o acompanhamento fonoaudiológico para reduzir o incômodo e devolver qualidade ao seu descanso.",
      imagem: "/images/servicos/zumbido.webp",
      topicos: [
        "Avaliação da intensidade e do impacto no dia a dia",
        "Terapia sonora e orientação de manejo",
        "Acompanhamento contínuo da evolução",
      ],
    },
    {
      titulo: "CPAP — Apneia do Sono",
      descricao:
        "Para quem tem apneia obstrutiva do sono, o CPAP mantém as vias aéreas abertas durante a noite. Cuidamos da adaptação ao equipamento e do acompanhamento do uso.",
      imagem: "/images/servicos/cpap.webp",
      topicos: [
        "Adaptação à máscara e à pressão do aparelho",
        "Orientação de higienização e manutenção",
        "Acompanhamento da adesão ao tratamento",
      ],
    },
  ],
} as const;

/**
 * Equipe — seção "Profissionais que cuidam de você" vista no protótipo
 * Figma (na página Sobre, print real de 29/07/2026), adicionada aqui na
 * página Serviços a pedido do cliente. O Figma mostrava 3 nomes fictícios
 * com fotos de pacientes (não de profissionais) e números de CRFa
 * sequenciais (12345, 23456...) claramente inventados — nada disso foi
 * reaproveitado. Só 2 profissionais reais, ambos fonoaudiólogos: Wagner é
 * citado por nome em depoimentos reais do Google (ver `depoimentos` abaixo);
 * Patrícia foi indicada pelo cliente nesta sessão. Sobrenomes e nº de
 * registro CRFa não informados — sem foto real disponível, os cards usam
 * iniciais em vez de imagem.
 */
export const equipe = {
  kicker: "Equipe",
  titulo: "Profissionais que cuidam de você",
  subtitulo:
    "Fonoaudiólogos dedicados a cada etapa do seu atendimento, do teste à adaptação completa.",
  itens: [
    { nome: "Wagner", cargo: "Fonoaudiólogo" },
    { nome: "Patrícia", cargo: "Fonoaudióloga" },
  ],
};

/**
 * Diferenciais específicos da página Serviços — texto confirmado por print
 * real do protótipo Figma (página Sobre, 29/07/2026), diferente do bloco de
 * 3 itens já usado no Home (`diferenciais`, extraído do site antigo e
 * propositalmente não mexido — ver CONTEXTO.md §12.12).
 */
export const diferenciaisServicos = {
  kicker: "Diferenciais",
  titulo: "O que torna a Otosons única",
  itens: [
    {
      icone: "handshake",
      titulo: "Atendimento humanizado",
      descricao: "Cada paciente é único e recebe um plano individual.",
    },
    {
      icone: "award",
      titulo: "Profissionais certificados",
      descricao: "Fonoaudiólogos registrados e em constante atualização.",
    },
    {
      icone: "shield",
      titulo: "Garantia e suporte",
      descricao: "Acompanhamento pós-venda e assistência técnica completa.",
    },
    {
      icone: "users",
      titulo: "Foco na família",
      descricao: "Orientamos também os familiares durante a adaptação.",
    },
  ],
} as const;

/**
 * `valor` é o número que o contador anima até e `sufixo` é o texto colado
 * nele. Separo assim para o count-up animar só a parte numérica.
 * `separador: true` formata com ponto de milhar (10.000).
 */
type Estatistica = {
  valor: number;
  sufixo: string;
  label: string;
  separador?: boolean;
};

export const estatisticas: Estatistica[] = [
  { valor: 500, sufixo: "+", label: "Clientes satisfeitos" },
  /* 20 = anos completos desde a fundação (17/04/2006, CNPJ 07.970.236/0001-08),
     não os "18 anos" que o site antigo divulga — a data de registro é a fonte
     mais objetiva das duas. */
  { valor: 20, sufixo: " anos", label: "De experiência" },
  { valor: 10000, sufixo: "+", label: "Aparelhos adaptados", separador: true },
  { valor: 98, sufixo: "%", label: "Recomendariam" },
];

export const diferenciais = {
  kicker: "Por que Otosons",
  titulo: "Cuidado completo com a sua audição",
  subtitulo:
    "Unimos as melhores marcas de aparelhos auditivos ao acompanhamento de profissionais especializados.",
  itens: [
    {
      icone: "cpu",
      titulo: "Tecnologia de Ponta",
      descricao:
        "Aparelhos digitais das melhores marcas mundiais, com inteligência artificial e conectividade Bluetooth.",
    },
    {
      icone: "handshake",
      titulo: "Atendimento Humano",
      descricao:
        "Fonoaudiólogos dedicados que acompanham você em cada etapa, do teste à adaptação completa.",
    },
    {
      icone: "shield",
      titulo: "Confiança e Garantia",
      descricao:
        "20 anos de experiência, garantia estendida e suporte técnico sempre que você precisar.",
    },
  ],
} as const;

/**
 * Bloco de conteúdo de artigo. Mantido deliberadamente pequeno (3 formas) —
 * o que o texto precisa é hierarquia e lista, não um mini-CMS.
 */
export type BlocoArtigo =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "ul"; itens: string[] };

export const blog = {
  kicker: "Blog",
  titulo: "Aprenda sobre saúde auditiva",
  subtitulo: "Conteúdo produzido pela nossa equipe de fonoaudiólogos.",
  /* Datas, tags e resumos batem exatamente com o protótipo Figma (única
     página do resto do site que já estava idêntica ao que eu tinha
     construído antes). `slug` foi adicionado agora para gerar /blog/[slug] —
     não existe no Figma, que eu não consegui ver (BlogPost.tsx está na lista
     de arquivos do Make, mas a navegação nunca chegou lá). */
  posts: [
    {
      slug: "perda-auditiva-tipos-graus-solucoes",
      tag: "Saúde auditiva",
      leitura: "8 min de leitura",
      data: "14 de janeiro de 2025",
      titulo: "Guia Completo: Perda Auditiva — Tipos, Graus e Soluções",
      resumo:
        "Entenda os tipos de perda auditiva, os graus de severidade e quando procurar ajuda profissional.",
      imagem: "/images/blog/perda-auditiva.webp",
      corpo: [
        {
          tipo: "p",
          texto:
            "A perda auditiva raramente chega de uma vez. Na maior parte dos casos ela avança devagar, ao longo de anos, e quem convive com ela é o último a perceber — geralmente é a família que nota primeiro, quando o volume da TV sobe ou quando as mesmas frases precisam ser repetidas várias vezes.",
        },
        {
          tipo: "p",
          texto:
            "Entender que tipo de perda existe, em que grau ela está e o que pode ser feito é o primeiro passo para sair da adivinhação. Este guia resume o que costuma aparecer na avaliação auditiva.",
        },
        { tipo: "h2", texto: "Os três tipos de perda auditiva" },
        {
          tipo: "p",
          texto:
            "A classificação depende de onde está a alteração no caminho que o som percorre até o cérebro:",
        },
        {
          tipo: "ul",
          itens: [
            "Condutiva: o som tem dificuldade de atravessar o ouvido externo ou médio. Pode vir de rolha de cera, perfuração do tímpano, otite ou alterações nos ossículos. Em muitos casos tem tratamento clínico ou cirúrgico.",
            "Neurossensorial: a alteração está na cóclea (ouvido interno) ou no nervo auditivo. É o tipo mais comum, geralmente permanente, e o que mais se beneficia de aparelho auditivo.",
            "Mista: combinação das duas anteriores, com componente condutivo e neurossensorial ao mesmo tempo.",
          ],
        },
        { tipo: "h2", texto: "Os graus de perda auditiva" },
        {
          tipo: "p",
          texto:
            "O grau é medido em decibéis (dB) na audiometria e indica a intensidade mínima que você precisa para ouvir um som. Quanto maior o número, maior a perda:",
        },
        {
          tipo: "ul",
          itens: [
            "Leve: dificuldade com sons baixos e com conversas em ambiente ruidoso.",
            "Moderada: já é difícil acompanhar uma conversa em volume normal sem se esforçar.",
            "Severa: a fala só é compreendida em volume bem alto ou muito perto.",
            "Profunda: mesmo sons muito intensos não são percebidos com clareza.",
          ],
        },
        { tipo: "h2", texto: "Sinais de que é hora de fazer uma avaliação" },
        {
          tipo: "ul",
          itens: [
            "Pedir para repetirem o que foi dito com frequência",
            "Achar que as pessoas estão sempre falando baixo ou 'mastigando' as palavras",
            "Aumentar o volume da TV acima do que os outros consideram confortável",
            "Ter dificuldade em restaurantes, festas e outros ambientes com ruído de fundo",
            "Zumbido persistente em um ou nos dois ouvidos",
            "Cansaço mental depois de conversas longas — o esforço de decodificar a fala consome energia",
          ],
        },
        { tipo: "h2", texto: "O que pode ser feito" },
        {
          tipo: "p",
          texto:
            "Depende do tipo e do grau. Perdas condutivas podem ter solução clínica. Perdas neurossensoriais, que são a maioria, costumam ser tratadas com aparelho auditivo — e quanto mais cedo a adaptação começa, melhor tende a ser o resultado, porque o cérebro mantém o hábito de processar os sons da fala.",
        },
        {
          tipo: "p",
          texto:
            "O ponto de partida é sempre o mesmo: uma audiometria tonal e vocal completa, com equipamento calibrado, interpretada por um fonoaudiólogo. É esse exame que transforma 'acho que estou ouvindo menos' em um diagnóstico com nome, grau e caminho de tratamento.",
        },
      ] as BlocoArtigo[],
    },
    {
      slug: "tipos-de-aparelhos-auditivos",
      tag: "Tecnologia de aparelhos",
      leitura: "6 min de leitura",
      data: "21 de janeiro de 2025",
      titulo: "Tipos de Aparelhos Auditivos: Qual é o Ideal para Você?",
      resumo:
        "Intra-auricular, retroauricular, open-fit: conheça as diferenças e vantagens de cada modelo.",
      imagem: "/images/blog/tipos-aparelhos.webp",
      corpo: [
        {
          tipo: "p",
          texto:
            "Não existe aparelho auditivo melhor que o outro em termos absolutos — existe o que combina com o seu grau de perda, com o formato do seu canal auditivo e com a sua rotina. Um modelo discreto demais pode não dar a potência necessária; um modelo potente demais pode ser desconfortável para quem tem perda leve.",
        },
        { tipo: "h2", texto: "Retroauricular com receptor no canal (RIC)" },
        {
          tipo: "p",
          texto:
            "O corpo do aparelho fica atrás da orelha e apenas um fio fino leva o receptor até dentro do canal auditivo. É hoje o formato mais indicado na maioria dos casos, porque equilibra bem discrição, potência e conforto.",
        },
        {
          tipo: "ul",
          itens: [
            "Indicado para perdas leves a severas",
            "Praticamente invisível de frente",
            "Disponível em versões recarregáveis e com Bluetooth",
            "Fácil de higienizar e de trocar peças",
          ],
        },
        { tipo: "h2", texto: "Retroauricular clássico (BTE)" },
        {
          tipo: "p",
          texto:
            "Todo o componente eletrônico fica atrás da orelha, ligado ao ouvido por um molde. É o formato com maior capacidade de amplificação e o mais robusto dos três.",
        },
        {
          tipo: "ul",
          itens: [
            "Indicado para perdas severas a profundas",
            "Maior autonomia de bateria",
            "Mais fácil de manusear para quem tem menos destreza nas mãos",
            "Existe em versão CROS, para quem tem audição em apenas um dos ouvidos",
          ],
        },
        { tipo: "h2", texto: "Intra-auricular (ITE)" },
        {
          tipo: "p",
          texto:
            "Fica inteiramente dentro da orelha, com molde feito sob medida — hoje normalmente a partir de um escaneamento 3D do canal auditivo. É a opção mais discreta.",
        },
        {
          tipo: "ul",
          itens: [
            "Indicado para perdas leves a moderadas",
            "O mais discreto dos formatos",
            "Não conflita com armação de óculos nem com máscara",
            "Exige canal auditivo com anatomia compatível",
          ],
        },
        { tipo: "h2", texto: "O que pesa mais na escolha" },
        {
          tipo: "p",
          texto:
            "Além do grau da perda, três fatores costumam decidir: a sua destreza manual (aparelhos menores exigem mais precisão para manusear), a sua rotina sonora (quem passa o dia em ambiente ruidoso se beneficia de processamento mais avançado) e se você quer conectar o aparelho ao celular ou à TV.",
        },
        {
          tipo: "p",
          texto:
            "A recomendação prática é simples: não decida pela foto do catálogo. Faça a avaliação, entenda o seu resultado e teste o aparelho na sua própria rotina antes de fechar. A diferença real aparece na conversa em família e na rua, não dentro da loja.",
        },
      ] as BlocoArtigo[],
    },
    {
      slug: "manutencao-aparelhos-checklist",
      tag: "Dicas de manutenção",
      leitura: "5 min de leitura",
      data: "03 de fevereiro de 2025",
      titulo: "Manutenção de Aparelhos Auditivos: Checklist Essencial",
      resumo:
        "Como limpar, armazenar e cuidar do seu aparelho para prolongar a vida útil e a qualidade do som.",
      imagem: "/images/blog/manutencao.webp",
      corpo: [
        {
          tipo: "p",
          texto:
            "Boa parte das visitas de assistência técnica poderia ser evitada com cinco minutos de cuidado por dia. Aparelho auditivo convive com cera, suor e umidade — os três inimigos naturais de um aparelho eletrônico que passa o dia inteiro dentro da orelha.",
        },
        { tipo: "h2", texto: "Todo dia" },
        {
          tipo: "ul",
          itens: [
            "Limpe a parte externa com um pano seco e macio, sem produtos nem água",
            "Verifique se o filtro de cera está limpo e desobstruído",
            "Ao tirar à noite, deixe o compartimento de bateria aberto para arejar (ou coloque no carregador, se for recarregável)",
            "Guarde em local seco, longe do banheiro e da cabeceira com copo d'água",
          ],
        },
        { tipo: "h2", texto: "Toda semana" },
        {
          tipo: "ul",
          itens: [
            "Limpe o molde ou a oliva com escovinha própria, removendo resíduo de cera",
            "Confira se o tubo ou o fio do receptor não está ressecado, torcido ou rachado",
            "Se você usa desumidificador, faça o ciclo completo",
          ],
        },
        { tipo: "h2", texto: "O que nunca fazer" },
        {
          tipo: "ul",
          itens: [
            "Lavar o aparelho em água corrente ou mergulhar em álcool",
            "Usar secador, micro-ondas ou forno para 'secar' o aparelho",
            "Usar objetos pontiagudos (alfinete, agulha) para desentupir a saída de som",
            "Aplicar spray de cabelo, perfume ou protetor solar com o aparelho no ouvido",
            "Deixar dentro do carro no sol — o calor danifica o circuito e a bateria",
          ],
        },
        { tipo: "h2", texto: "Sinais de que algo não vai bem" },
        {
          tipo: "ul",
          itens: [
            "Som fraco, abafado ou intermitente mesmo com a bateria carregada",
            "Apito constante (microfonia) que antes não acontecia",
            "Chiado, estalo ou distorção em sons que antes eram limpos",
            "Bateria durando visivelmente menos que o normal",
          ],
        },
        {
          tipo: "p",
          texto:
            "Se algum desses sinais aparecer, o mais provável é filtro de cera obstruído ou tubo ressecado — coisas simples de resolver. Não tente abrir o aparelho: leve para revisão. Uma limpeza profissional periódica, além do cuidado diário, mantém a qualidade do som e prolonga bastante a vida útil do dispositivo.",
        },
      ] as BlocoArtigo[],
    },
  ],
  /* Faixa de destaque no fim da listagem — dá saída para quem leu e quer agir. */
  cta: {
    titulo: "Ficou com dúvida sobre a sua audição?",
    texto:
      "Artigo nenhum substitui um exame. Agende uma avaliação auditiva e tire suas dúvidas com um fonoaudiólogo.",
  },
  /**
   * Aviso exibido no fim de todo artigo. Existe porque o conteúdo destes
   * posts é educativo e geral: ele não pode ser lido como orientação clínica
   * individual, e deixar isso explícito protege tanto o leitor quanto a
   * clínica.
   */
  aviso:
    "Este conteúdo tem caráter informativo e não substitui a avaliação de um profissional. Cada caso de perda auditiva é individual e precisa de exame para ser diagnosticado.",
};

export type PostBlog = (typeof blog)["posts"][number];

/**
 * Missão, visão, valores e diferenciais são texto real, extraído da página
 * "Quem Somos" do site antigo (otosons.com.br) — não foram inventados.
 */
export const sobre = {
  kicker: "Quem somos",
  titulo: "20 anos cuidando da audição de Niterói",
  subtitulo:
    "Centro Auditivo Otosons — fundado em 2006, especializado em seleção, indicação e adaptação de aparelhos auditivos com foco em reabilitação.",
  historia:
    "Nosso trabalho vai além da venda de um aparelho: buscamos desenvolver resultados satisfatórios através do uso efetivo da tecnologia auditiva, acompanhando cada paciente da avaliação à adaptação completa.",
  missao:
    "Garantir a comunicação e a qualidade de vida dos nossos pacientes por meio da otimização de suas habilidades auditivas.",
  visao: "Ser reconhecida como referência em Reabilitação Auditiva de excelência.",
  valores: [
    "Transparência nos serviços prestados",
    "Honestidade",
    "Comprometimento",
    "Satisfação de clientes e colaboradores",
    "Produtos e serviços de qualidade",
  ],
  /**
   * Linha do tempo. Só o primeiro marco tem data verificável (registro do
   * CNPJ em 17/04/2006). Os demais são descritos por FASE, não por ano — não
   * inventei "em 2014 inauguramos a segunda unidade" nem nada parecido.
   * Se o cliente souber os anos exatos, é só preencher `ano`.
   */
  marcos: [
    {
      ano: "2006",
      titulo: "Fundação em Niterói",
      texto:
        "O Centro Auditivo Otosons é registrado em 17 de abril de 2006, com foco em seleção, indicação e adaptação de aparelhos auditivos.",
    },
    {
      ano: null,
      titulo: "Especialização em reabilitação",
      texto:
        "O trabalho deixa de ser só a venda do aparelho e passa a incluir acompanhamento fonoaudiológico contínuo até a adaptação completa.",
    },
    {
      ano: null,
      titulo: "Atendimento domiciliar",
      texto:
        "Passamos a levar avaliação e teste de aparelho até a casa de pacientes com dificuldade de locomoção, em Niterói e municípios vizinhos.",
    },
    {
      ano: "Hoje",
      titulo: "Referência em Icaraí",
      texto:
        "Nota 4,6 no Google com 85 avaliações, catálogo com Oticon, Interton e Argosy, e atendimento também para zumbido e apneia do sono.",
    },
  ] as { ano: string | null; titulo: string; texto: string }[],
};

/**
 * Jornada do paciente — as 5 etapas do primeiro contato ao acompanhamento.
 *
 * Não é invenção: cada etapa é a consolidação do que já está descrito nos
 * `servicos` (anamnese → audiometria → seleção → adaptação → manutenção).
 * Serve para dar à página /servicos o que ela não tinha: uma visão de
 * processo, e não só uma lista de itens soltos.
 */
export const processo = {
  kicker: "Como funciona",
  titulo: "Da primeira conversa ao acompanhamento",
  subtitulo:
    "Um caminho claro, sem surpresa em nenhuma etapa. Você sabe o que esperar desde o primeiro contato.",
  etapas: [
    {
      titulo: "Agendamento",
      texto:
        "Você fala com a gente pelo WhatsApp ou telefone e escolhe o melhor horário. Se a locomoção for um problema, combinamos atendimento na sua casa.",
    },
    {
      titulo: "Avaliação auditiva",
      texto:
        "Anamnese, exame otoscópico e audiometria tonal e vocal com equipamento calibrado. Cerca de 40 minutos, com laudo no mesmo dia.",
    },
    {
      titulo: "Indicação",
      texto:
        "Explicamos o resultado em linguagem simples e apresentamos as opções que fazem sentido para o seu grau de perda, rotina e orçamento.",
    },
    {
      titulo: "Teste e adaptação",
      texto:
        "Você experimenta o aparelho na sua própria rotina antes de decidir. Depois vem a programação personalizada e o período de adaptação acompanhado.",
    },
    {
      titulo: "Acompanhamento",
      texto:
        "Ajustes finos, limpeza, revisão técnica e suporte sempre que precisar. A adaptação não termina na entrega do aparelho.",
    },
  ],
} as const;

/**
 * Catálogo de aparelhos — estrutura de filtros (marca + tipo) copiada do
 * protótipo Figma, mas com as 3 marcas reais que o cliente indicou, cada
 * modelo com dados extraídos direto do site oficial do fabricante:
 * oticon.com(.br), interton.com, argosy.com.br.
 *
 * Sem fotos de produto — não há direito de uso sobre imagens oficiais dessas
 * marcas, então cada card usa ícone por tipo de encaixe, como o resto do site.
 */
type TipoAparelho = "RIC" | "BTE" | "ITE";

export const aparelhos = {
  kicker: "Aparelhos",
  titulo: "Catálogo de Aparelhos",
  subtitulo:
    "Explore os modelos das marcas com que trabalhamos e encontre a solução ideal para o seu perfil auditivo.",
  marcas: ["Oticon", "Interton", "Argosy"] as const,
  tipos: [
    { valor: "RIC" as TipoAparelho, label: "Retroauricular (RIC)" },
    { valor: "BTE" as TipoAparelho, label: "Retroauricular (BTE)" },
    { valor: "ITE" as TipoAparelho, label: "Intra-auricular (ITE)" },
  ],
  itens: [
    {
      marca: "Oticon",
      modelo: "Intent miniRITE",
      tipo: "RIC" as TipoAparelho,
      descricao:
        "Sensores 4D de intenção do usuário e IA que se ajustam sozinhos entre ambientes ruidosos, conversas em grupo e diálogos individuais.",
    },
    {
      marca: "Oticon",
      modelo: "Real",
      tipo: "RIC" as TipoAparelho,
      descricao:
        "Devolve os sons reais do dia a dia com naturalidade, para quem quer estar presente em cada momento.",
    },
    {
      marca: "Oticon",
      modelo: "Xceed",
      tipo: "BTE" as TipoAparelho,
      descricao:
        "O modelo mais potente da linha Oticon, indicado para perda auditiva severa a profunda.",
    },
    {
      marca: "Interton",
      modelo: "Presto microRIE",
      tipo: "RIC" as TipoAparelho,
      descricao:
        "Recarregável, resistência IP68 e Bluetooth LE Audio — pensado para quem precisa ouvir bem em ambientes com ruído.",
    },
    {
      marca: "Interton",
      modelo: "Presto BTE CROS",
      tipo: "BTE" as TipoAparelho,
      descricao:
        "Solução sem fio para surdez unilateral, com o mesmo conforto e autonomia da linha Presto.",
    },
    {
      marca: "Argosy",
      modelo: "Vista V-R",
      tipo: "RIC" as TipoAparelho,
      descricao:
        "Retroauricular recarregável com conectividade direta, fabricado pela Sonova (suíça).",
    },
    {
      marca: "Argosy",
      modelo: "Vista V-PR",
      tipo: "BTE" as TipoAparelho,
      descricao:
        "Versão BTE recarregável da linha Vista, com adaptação automática ao ambiente sonoro.",
    },
    {
      marca: "Argosy",
      modelo: "Vista B-10 NW O",
      tipo: "ITE" as TipoAparelho,
      descricao:
        "O modelo intra-auricular mais discreto da linha, com molde feito por escaneamento 3D do ouvido.",
    },
  ],
  destaque: {
    titulo: "Teste antes de decidir",
    texto:
      "Levamos um aparelho até a sua casa para um teste real, sem compromisso — assim você sente a diferença no seu dia a dia antes de investir.",
  },
  /**
   * Cards de marca. Diferente do protótipo Figma (que listava 8 marcas
   * fictícias com "12 modelos", "10 modelos" — números inventados), aqui
   * são as 3 marcas reais com que a Otosons trabalha, e a contagem de
   * modelos é DERIVADA de `itens` acima, não digitada à mão.
   * Descrições resumidas dos sites oficiais dos fabricantes.
   */
  marcasInfo: [
    {
      nome: "Oticon",
      origem: "Dinamarca",
      texto:
        "Som 360° processado com base em como o cérebro entende a fala. Linha Intent com sensores 4D e a Xceed para perdas severas a profundas.",
    },
    {
      nome: "Interton",
      origem: "Dinamarca",
      texto:
        "Recarregáveis com resistência IP68 e Bluetooth LE Audio. A linha Presto inclui solução CROS para surdez em apenas um dos ouvidos.",
    },
    {
      nome: "Argosy",
      origem: "Brasil / Sonova",
      texto:
        "Fabricados pelo grupo suíço Sonova. A linha Vista vai do retroauricular recarregável ao intra-auricular discreto com molde escaneado em 3D.",
    },
  ],
  /**
   * Guia de tipos de encaixe. Conteúdo técnico geral (verdadeiro para
   * qualquer centro auditivo, não uma afirmação sobre a Otosons) — serve para
   * a página parar de ser só uma grade de produtos e virar material de
   * decisão, que é o que traz busca orgânica de cauda longa.
   */
  guia: {
    kicker: "Guia rápido",
    titulo: "Qual tipo combina com você?",
    subtitulo:
      "O formato do aparelho muda o conforto, a discrição e a potência disponível. Na avaliação nós indicamos o que faz sentido para o seu caso.",
    tipos: [
      {
        valor: "RIC" as TipoAparelho,
        nome: "Retroauricular com receptor no canal (RIC)",
        resumo:
          "O corpo fica atrás da orelha e o receptor dentro do canal, ligado por um fio fino.",
        indicado: "Perdas leves a severas — é o formato mais adaptável.",
        pontos: [
          "Discreto: quase invisível de frente",
          "Compatível com recarga e Bluetooth",
          "Fácil de manusear e higienizar",
        ],
      },
      {
        valor: "BTE" as TipoAparelho,
        nome: "Retroauricular clássico (BTE)",
        resumo:
          "Todo o eletrônico fica atrás da orelha, ligado ao ouvido por um molde.",
        indicado: "Perdas severas a profundas e casos que exigem mais potência.",
        pontos: [
          "Maior amplificação disponível",
          "Bateria de longa duração",
          "Robusto, bom para quem tem menos destreza",
        ],
      },
      {
        valor: "ITE" as TipoAparelho,
        nome: "Intra-auricular (ITE)",
        resumo:
          "Fica inteiro dentro da orelha, com molde feito sob medida para o seu canal.",
        indicado: "Perdas leves a moderadas, para quem prioriza discrição.",
        pontos: [
          "O mais discreto dos três",
          "Molde sob medida por escaneamento 3D",
          "Não interfere com óculos ou máscara",
        ],
      },
    ],
  },
};

/**
 * As três avaliações são públicas, do perfil real da Otosons no Google Maps
 * (4,6 · 85 avaliações) — não foram reescritas, só levemente resumidas onde
 * indicado.
 */
export const depoimentos = {
  kicker: "Depoimentos",
  /* Título e subtítulo exatos do protótipo Figma — os depoimentos abaixo são
     os reais do Google, não os fictícios que o Figma mostrava (decisão do
     cliente). */
  titulo: "Histórias de Sucesso",
  subtitulo:
    "Conheça pessoas que transformaram suas vidas voltando a ouvir com clareza.",
  itens: [
    {
      nome: "Ana Cristina Machado",
      texto:
        "Após 3 anos da minha mãe (87) com um tratamento sem muito resultado, tivemos a indicação do fonoaudiólogo Wagner da Otosons. Atendimento excelente. Há 1 ano minha mãe progrediu na escuta, no entendimento e na adaptação de uso contínuo do aparelho auditivo, por ele indicado. Super indico.",
    },
    {
      nome: "Barbara Nagime",
      texto:
        "Super recomendo! Ótimo produto! Wagner foi impecável no atendimento da minha filha! Só tenho elogios! Nota mil!",
    },
    {
      nome: "Giseuda Leal",
      texto:
        "Atendimento bem positivo. Os aparelhos são bem confortáveis. Estamos satisfeitos.",
    },
  ],
  /**
   * O protótipo Figma tinha aqui uma seção "Casos de sucesso — desafio,
   * solução e resultado" com dois pacientes (José, 70 anos; Mariana) que são
   * PERSONAGENS INVENTADOS do protótipo, com foto de banco de imagem. Não
   * reproduzi: história de paciente fabricada apresentada como real é o tipo
   * de conteúdo que não se conserta depois.
   *
   * No lugar, a seção de vídeo abaixo reserva o espaço para depoimento REAL
   * gravado com paciente que autorize. Enquanto o arquivo não existir em
   * /public/videos, o componente mostra o placeholder e nada quebra.
   */
  video: {
    kicker: "Em vídeo",
    titulo: "Ouça de quem já passou por isso",
    texto:
      "Depoimentos gravados na loja, com pacientes que autorizaram o uso da imagem.",
    arquivo: "/videos/depoimento-paciente.mp4",
    poster: "/images/depoimentos/video-capa.webp",
  },
  /** Convite para avaliar — leva ao perfil real do Google. */
  convite: {
    titulo: "Você já é nosso paciente?",
    texto:
      "Sua avaliação ajuda outras pessoas de Niterói a decidirem procurar ajuda. Leva menos de um minuto.",
    acao: "Avaliar no Google",
  },
};

/**
 * Perguntas fundamentadas nos diferenciais reais da empresa (teste domiciliar,
 * atendimento fora de Niterói) e nos serviços que o site antigo anuncia além
 * de aparelhos auditivos (CPAP, zumbido) — não são genéricas de FAQ de estoque.
 */
/*
 * As 4 CATEGORIAS e as 12 PERGUNTAS abaixo são exatamente as do protótipo
 * Figma — confirmadas por print real da página FAQ em 29/07/2026 (pasta
 * "fotos da pagina"). Antes desta sessão eu só tinha visto as 5 primeiras
 * perguntas e havia inventado uma 3ª categoria ("Sobre atendimento") que o
 * protótipo não tem; ela foi removida e as perguntas úteis dela migraram
 * para "Sobre serviços", que é a categoria real.
 *
 * As RESPOSTAS continuam sendo minhas — o acordeão do Figma nunca abriu.
 * São coerentes com o que já se sabe do negócio (o passo a passo do teste é
 * o mesmo de servicos[0].comoFunciona; teste domiciliar, zumbido e CPAP vêm
 * do site antigo). Duas delas fogem do padrão de propósito:
 *
 *   - "Quanto custa": não cita valor. O catálogo não tem preço público e
 *     inventar faixa de preço é o tipo de erro que gera reclamação.
 *   - "Horário de funcionamento": não afirma sábado, porque `horarioDetalhado`
 *     ainda está pendente de confirmação.
 *
 * Vale o cliente revisar todas antes de publicar.
 */
export const faq = {
  kicker: "FAQ",
  titulo: "Dúvidas Frequentes",
  subtitulo:
    "Encontre respostas rápidas para as principais perguntas sobre aparelhos auditivos e nossos serviços.",
  categorias: [
    {
      nome: "Sobre aparelhos auditivos",
      itens: [
        {
          pergunta: "O que é perda auditiva?",
          resposta:
            "É a redução, parcial ou total, da capacidade de ouvir sons — pode afetar um ou os dois ouvidos, em diferentes graus (leve, moderada, severa ou profunda) e ter causas variadas, do envelhecimento natural à exposição prolongada a ruído.",
        },
        {
          pergunta: "Como funcionam os aparelhos auditivos?",
          resposta:
            "Captam o som do ambiente por um microfone, processam digitalmente para amplificar as frequências que você tem mais dificuldade de ouvir, e entregam o som já ajustado por um receptor — tudo calibrado ao seu exame auditivo individual.",
        },
        {
          pergunta: "Como saber se preciso de um aparelho?",
          resposta:
            "Alguns sinais são pedir para repetirem o que foi dito, aumentar muito o volume da TV e ter dificuldade de acompanhar conversas em ambientes com ruído. O primeiro passo é uma audiometria completa: a partir do resultado, nossos fonoaudiólogos indicam se há perda auditiva e qual o melhor caminho.",
        },
      ],
    },
    {
      nome: "Sobre teste e diagnóstico",
      itens: [
        {
          pergunta: "Como é feito o teste auditivo?",
          resposta:
            "Em quatro etapas: anamnese e histórico auditivo, exame otoscópico, audiometria tonal e vocal, e por fim a interpretação dos resultados com orientação sobre os próximos passos.",
        },
        {
          pergunta: "É necessário agendamento?",
          resposta:
            "Sim, para garantir tempo adequado com o fonoaudiólogo e a sala de exame livre. Você pode agendar direto pelo WhatsApp ou por telefone.",
        },
        {
          pergunta: "Qual é a duração do teste?",
          resposta:
            "Cerca de 40 minutos, contando a conversa inicial, o exame e a explicação do resultado. Você sai da consulta já sabendo o que o exame mostrou.",
        },
      ],
    },
    {
      nome: "Sobre produtos e preços",
      itens: [
        {
          pergunta: "Quanto custa um aparelho auditivo?",
          resposta:
            "O valor depende do grau da sua perda auditiva, do formato do aparelho e dos recursos que você realmente vai usar — não faz sentido citar um preço antes da avaliação. Após o exame apresentamos as opções que atendem o seu caso, com o valor de cada uma, e você decide sem pressão.",
        },
        {
          pergunta: "Qual é a duração da bateria?",
          resposta:
            "Nos modelos recarregáveis, uma carga completa costuma cobrir o dia inteiro de uso, com recarga durante a noite. Nos modelos com pilha descartável, a troca é periódica e varia conforme o tamanho da pilha e o quanto o aparelho amplifica.",
        },
        {
          pergunta: "Como funciona a garantia?",
          resposta:
            "Todos os aparelhos saem com a garantia do fabricante, e nossa equipe faz o acompanhamento pós-venda: limpeza, revisão, ajuste de programação e intermediação com a assistência técnica sempre que necessário.",
        },
      ],
    },
    {
      nome: "Sobre serviços",
      itens: [
        {
          pergunta: "Oferecem atendimento domiciliar?",
          resposta:
            "Sim. Para quem tem dificuldade de locomoção, levamos a avaliação e o teste do aparelho até a sua casa, em Niterói e municípios da região. Combine pelo WhatsApp.",
        },
        {
          pergunta: "É possível testar o aparelho antes de comprar?",
          resposta:
            "Sim, e recomendamos. Você experimenta o aparelho na sua própria rotina, sem compromisso, porque a diferença real aparece na conversa em família e na rua — não dentro da loja.",
        },
        {
          pergunta: "Vocês tratam zumbido e apneia do sono (CPAP)?",
          resposta:
            "Sim. Além da adaptação de aparelhos auditivos, oferecemos acompanhamento fonoaudiológico para zumbido e terapia com CPAP para apneia obstrutiva do sono.",
        },
        {
          pergunta: "Qual o horário de funcionamento?",
          resposta:
            "Atendemos de segunda a sexta, das 9h às 18h, com agendamento. Para confirmar disponibilidade em outros dias e horários, fale com a gente pelo WhatsApp.",
        },
        {
          pergunta: "Aceitam diferentes formas de pagamento?",
          resposta:
            "Sim, trabalhamos com diferentes formas de pagamento e condições de parcelamento. As opções disponíveis são apresentadas junto com a indicação do aparelho, depois da avaliação.",
        },
      ],
    },
  ],
  /* Faixa azul no fim da página FAQ — vista no print real do protótipo. */
  cta: {
    titulo: "Ainda tem dúvidas?",
    texto:
      "Fale com nossa equipe pelo WhatsApp ou agende uma avaliação. Teremos prazer em ajudar você.",
  },
};

export const ctaFinal = {
  titulo: "Pronto para ouvir melhor?",
  texto:
    "Agende hoje mesmo uma avaliação auditiva com nossos especialistas. O primeiro passo para transformar a sua vida é gratuito.",
  primario: "Marcar Consulta",
  secundario: "Ver Aparelhos",
};

export const rodape = {
  colunas: [
    {
      titulo: "Navegação",
      links: navegacao,
    },
    {
      titulo: "Serviços",
      links: [
        { label: "Testes Auditivos", href: "/servicos" },
        { label: "Atendimento Fonoaudiológico", href: "/servicos" },
        { label: "Adaptação de Aparelhos", href: "/servicos" },
        { label: "Manutenção e Suporte", href: "/servicos" },
      ],
    },
  ],
  legal: [
    { label: "Política de Privacidade", href: "#privacidade" },
    { label: "Termos de Uso", href: "#termos" },
  ],
};
