import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import gql from "graphql-tag";
import { NextRequest } from "next/server";
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

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
