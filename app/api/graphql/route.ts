import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import gql from "graphql-tag";
import { NextRequest } from "next/server";

// Definição dos tipos de dados
type Task = {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  category: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
};

// Mock de tarefas
const tarefas: Task[] = [
  {
    id: "1",
    title: "Estudar pintura com aquarela",
    description: "Realizar testes com diferentes técnicas de aquarela",
    status: "pending",
    category: "Estudos",
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    user: {
      firstName: "Nycollas",
      lastName: "Kaique",
    },
  },
  {
    id: "5",
    title: "Cozinhar almoço",
    description: "Organizar ingredientes e preparar o almoço",
    status: "pending",
    category: "Pessoal",
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    user: {
      firstName: "Nycollas",
      lastName: "Kaique",
    },
  },
];

const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    category: String!
    createdAt: String!
    user: User!
  }

  type Query {
    tasks(category: String, take: Int): [Task!]!
    task(id: String!): Task
  }

  type Mutation {
    updateTaskStatus(id: String!, status: String!): Task
    createTask(input: NewTaskInput!): Task
    deleteTask(id: String!): Boolean
  }

  input NewTaskInput {
    title: String!
    description: String
    category: String!
    status: String!
    user: UserInput!
  }

  input UserInput {
    firstName: String!
    lastName: String!
  }
`;

const resolvers = {
  Query: {
    tasks: (_: unknown, args: { category?: string; take?: number }): Task[] => {
      let result = tarefas;
      if (args.category && args.category !== "Todos") {
        result = result.filter((t) => t.category === args.category);
      }
      if (args.take) {
        result = result.slice(0, args.take);
      }
      return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    task: (_: unknown, args: { id: string }): Task | undefined => {
      return tarefas.find((t) => t.id === args.id);
    },
  },
  Mutation: {
    updateTaskStatus: (
      _: unknown,
      args: { id: string; status: Task["status"] }
    ): Task | undefined => {
      const task = tarefas.find((t) => t.id === args.id);
      if (task) task.status = args.status;
      return task;
    },
    createTask: (
      _: unknown,
      args: { input: Omit<Task, "id" | "createdAt"> }
    ): Task => {
      const newTask: Task = {
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        ...args.input,
      };
      tarefas.push(newTask);
      return newTask;
    },
    deleteTask: (_: unknown, args: { id: string }): boolean => {
      const index = tarefas.findIndex((t) => t.id === args.id);
      if (index > -1) {
        tarefas.splice(index, 1);
        return true;
      }
      return false;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
