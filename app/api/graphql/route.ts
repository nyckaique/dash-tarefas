import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import gql from "graphql-tag";
import { NextRequest, NextResponse } from "next/server";
import { mockDB } from "@/lib/mockDB";
import { Task } from "@/types/task";

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
      let result = mockDB.tarefas;
      if (args.category && args.category !== "Todos") {
        result = result.filter((t) => t.category === args.category);
      }
      result = result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (args.take) {
        result = result.slice(0, args.take);
      }
      return result;
    },
    task: (_: unknown, args: { id: string }): Task | undefined => {
      return mockDB.tarefas.find((t) => t.id === args.id);
    },
  },
  Mutation: {
    updateTaskStatus: (
      _: unknown,
      args: { id: string; status: Task["status"] }
    ): Task | undefined => {
      const task = mockDB.tarefas.find((t) => t.id === args.id);
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
      mockDB.tarefas.push(newTask);
      return newTask;
    },
    deleteTask: (_: unknown, args: { id: string }): boolean => {
      const index = mockDB.tarefas.findIndex((t) => t.id === args.id);
      if (index > -1) {
        mockDB.tarefas.splice(index, 1);
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

const createHandler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => ({ req }),
});

function addCorsHeaders(res: Response): Response {
  const newHeaders = new Headers(res.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  newHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: newHeaders,
  });
}

export async function GET(req: NextRequest) {
  const res = await createHandler(req);
  return addCorsHeaders(res);
}

export async function POST(req: NextRequest) {
  const res = await createHandler(req);
  return addCorsHeaders(res);
}

export async function OPTIONS() {
  const res = NextResponse.json(null, { status: 204 });
  return addCorsHeaders(res);
}
