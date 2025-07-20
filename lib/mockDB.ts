import { Task } from "@/types/task";

// Mock de tarefas
export const mockDB = {
  tarefas: [
    {
      id: "1",
      title: "Estudar pintura com aquarela",
      description: "Realizar testes com diferentes técnicas de aquarela",
      status: "pending",
      category: "Estudos",
      createdAt: new Date("2025-07-14T17:30:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "2",
      title: "Supino inclinado máquina",
      description:
        "Executar 3 séries de 10 repetições de supino inclinado na máquina",
      status: "completed",
      category: "Pessoal",
      createdAt: new Date("2025-07-17T10:00:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "3",
      title: "Landing Page cliente",
      description:
        "Desenvolver a landing page para o cliente conforme design Figma",
      status: "pending",
      category: "Trabalho",
      createdAt: new Date("2025-07-16T07:30:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "4",
      title: "Implementar carrossel de produtos",
      description: "Adicionar carrossel de produtos na página inicial do site",
      status: "completed",
      category: "Trabalho",
      createdAt: new Date("2025-07-18T08:30:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "5",
      title: "Assar um bolo de cenoura",
      description:
        "Ingredientes: 3 cenouras médias (cerca de 360g ou 2 ¼ xícaras (chá) de cenoura descascada e ralada), 4 ovos em temperatura ambiente, 1 xícara (chá) de óleo, 1½ xícara (chá) de açúcar, 2 xícaras (chá) de farinha de trigo, 1 colher (sopa) de fermento em pó, 1 pitada de sal, manteiga e farinha de trigo para untar e polvilhar a fôrma. Modo de preparo: Preaqueça o forno a 180 ºC (temperatura média). Unte com manteiga uma fôrma retangular de 30 cm x 20 cm e 5 cm de altura. Polvilhe farinha de trigo, chacoalhe para cobrir todo o fundo e as laterais e bata na pia para tirar o excesso. Numa tigela, coloque a farinha, o sal e o fermento, passando pela peneira. Misture e reserve. Lave e descasque as cenouras. Descarte a ponta da rama. Corte cada uma em rodelas e transfira para o liquidificador — a cenoura cortada em rodelas é triturada mais facilmente. Junte o óleo às cenouras cortadas. Numa tigela pequena, quebre um ovo de cada vez e transfira para o liquidificador — se algum estiver estragado, você não perde a receita. Acrescente o açúcar e bata bem até ficar liso, por cerca de 5 minutos. Transfira a mistura líquida para uma tigela grande e adicione os secos em 3 etapas, passando pela peneira. Misture delicadamente com um batedor de arame a cada adição para incorporar. Transfira a massa para a fôrma e leve ao forno para assar por cerca de 45 minutos. Para saber se o bolo está pronto, espete um palito na massa: se sair limpo, pode tirar do forno; caso contrário, deixe assar por mais alguns minutos. Retire o bolo do forno e deixe esfriar por 15 minutos antes de preparar a cobertura — o bolo deve estar morno na hora de colocar a cobertura de chocolate.",
      status: "pending",
      category: "Pessoal",
      createdAt: new Date("2025-07-18T18:30:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "6",
      title: "Revisar vocabulário de inglês",
      description:
        "Fazer revisão de vocabulário das palavras aprendidas na última semana",
      status: "completed",
      category: "Estudos",
      createdAt: new Date("2025-07-17T22:30:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "7",
      title: "Fazer ajustes mobile",
      description:
        "Corrigir problemas com responsividade no site para dispositivos móveis",
      status: "completed",
      category: "Trabalho",
      createdAt: new Date("2025-07-16T15:00:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "8",
      title: "Ir ao supermercado",
      description: "Aprovetar a promoção de frutas e verduras no supermercado",
      status: "completed",
      category: "Pessoal",
      createdAt: new Date("2025-07-18T06:00:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "9",
      title: "Passear com o cachorro",
      description: "Levar a Luna para passear",
      status: "pending",
      category: "Pessoal",
      createdAt: new Date("2025-07-16T09:00:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "10",
      title: "Cardio na esteira e abdominais",
      description:
        "Executar 20 minutos de cardio na esteira e 3 exercícios de abdominais",
      status: "completed",
      category: "Pessoal",
      createdAt: new Date("2025-07-18T10:40:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "11",
      title: "Atualizar documentos do cliente",
      description:
        "Fazer upload dos novos documentos do cliente para o formulário de inscrição",
      status: "pending",
      category: "Trabalho",
      createdAt: new Date("2025-07-18T11:10:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
    {
      id: "12",
      title: "Cortar o cabelo",
      description: "Agendar horário para cortar o cabelo e barba",
      status: "completed",
      category: "Pessoal",
      createdAt: new Date("2025-07-16T13:30:00.000Z").toISOString(),
      user: {
        firstName: "Nycollas",
        lastName: "Kaique",
      },
    },
  ] as Task[],
};
