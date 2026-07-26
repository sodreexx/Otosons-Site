/**
 * Todo o conteúdo editável do site em um lugar só.
 * Para trocar textos, telefones ou posts, mexa só aqui — nenhum componente
 * tem texto fixo dentro dele.
 */

export const site = {
  name: "Otosons",
  tagline: "Aparelhos Auditivos",
  description:
    "Tecnologia de ponta e atendimento fonoaudiológico personalizado para recuperar a sua audição e a sua qualidade de vida.",
  url: "https://otosons.com.br",
};

export const contato = {
  endereco: "Av. Roberto Silveira, 100 — Centro, Maricá — RJ",
  telefone: "(21) 98191-0466",
  telefoneLink: "tel:+5521981910466",
  whatsapp:
    "https://wa.me/5521981910466?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20auditiva.",
  email: "contato@otosons.com.br",
  horario: "Seg a Sex: 8h às 18h · Sáb: 8h às 12h",
};

export const social = [
  { nome: "Instagram", href: "https://instagram.com/otosons", icone: "instagram" },
  { nome: "Facebook", href: "https://facebook.com/otosons", icone: "facebook" },
  { nome: "YouTube", href: "https://youtube.com/@otosons", icone: "youtube" },
  { nome: "LinkedIn", href: "https://linkedin.com/company/otosons", icone: "linkedin" },
] as const;

export const navegacao = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Aparelhos", href: "#aparelhos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
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
 * Grid bento de serviços. `span` é quantas colunas de 12 o card ocupa no
 * desktop — 7/5 na primeira linha e 5/7 na segunda, reproduzindo o ritmo
 * largo-estreito / estreito-largo do mockup.
 */
export const servicos = [
  {
    titulo: "Testes Auditivos",
    descricao:
      "Audiometria completa com equipamento calibrado e laudo no mesmo dia.",
    imagem: "/images/servicos/testes-auditivos.jpg",
    span: 7,
  },
  {
    titulo: "Atendimento Fonoaudiológico",
    descricao: "Acompanhamento individual do diagnóstico à adaptação.",
    imagem: "/images/servicos/atendimento.jpg",
    span: 5,
  },
  {
    titulo: "Adaptação de Aparelhos",
    descricao: "Regulagem fina do aparelho ao seu perfil auditivo e rotina.",
    imagem: "/images/servicos/adaptacao.jpg",
    span: 5,
  },
  {
    titulo: "Manutenção e Suporte",
    descricao:
      "Limpeza, revisão e assistência técnica para prolongar a vida do aparelho.",
    imagem: "/images/servicos/manutencao.jpg",
    span: 7,
  },
];

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
  { valor: 15, sufixo: " anos", label: "De experiência" },
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
        "15 anos de experiência, garantia estendida e suporte técnico sempre que você precisar.",
    },
  ],
} as const;

export const blog = {
  kicker: "Blog",
  titulo: "Aprenda sobre saúde auditiva",
  subtitulo: "Conteúdo produzido pela nossa equipe de fonoaudiólogos.",
  posts: [
    {
      tag: "Saúde auditiva",
      leitura: "8 min de leitura",
      titulo: "Guia Completo: Perda Auditiva — Tipos, Graus e Soluções",
      resumo:
        "Entenda os tipos de perda auditiva, os graus de severidade e quando procurar ajuda profissional.",
      imagem: "/images/blog/perda-auditiva.jpg",
      href: "#blog",
    },
    {
      tag: "Tecnologia de aparelhos",
      leitura: "6 min de leitura",
      titulo: "Tipos de Aparelhos Auditivos: Qual é o Ideal para Você?",
      resumo:
        "Intra-auricular, retroauricular, open-fit: conheça as diferenças e vantagens de cada modelo.",
      imagem: "/images/blog/tipos-aparelhos.jpg",
      href: "#blog",
    },
    {
      tag: "Dicas de manutenção",
      leitura: "5 min de leitura",
      titulo: "Manutenção de Aparelhos Auditivos: Checklist Essencial",
      resumo:
        "Como limpar, armazenar e cuidar do seu aparelho para prolongar a vida útil e a qualidade do som.",
      imagem: "/images/blog/manutencao.jpg",
      href: "#blog",
    },
  ],
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
        { label: "Testes Auditivos", href: "#servicos" },
        { label: "Atendimento Fonoaudiológico", href: "#servicos" },
        { label: "Adaptação de Aparelhos", href: "#servicos" },
        { label: "Manutenção e Suporte", href: "#servicos" },
      ],
    },
  ],
  legal: [
    { label: "Política de Privacidade", href: "#privacidade" },
    { label: "Termos de Uso", href: "#termos" },
  ],
};
