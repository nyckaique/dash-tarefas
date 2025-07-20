import { Task } from "@/types/task";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
export const endpoint = `${baseUrl}/api/graphql`;

// Buscar tarefas com base na categoria e limite
export async function getTasks(
  category?: string,
  take?: number
): Promise<Task[]> {
  const query = `
    query GetTasks($category: String, $take: Int) {
      tasks(category: $category, take: $take) {
        id
        title
        description
        status
        category
        createdAt
        user {
          firstName
          lastName
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: {
        category: category || "Todos",
        take: take || 10,
      },
    }),
    cache: "no-store",
  });

  const json = await res.json();
  return json.data.tasks;
}

// Buscar uma tarefa específica pelo ID
export async function getTask(id: string): Promise<Task> {
  const query = `
    query GetTask($id: String!) {
      task(id: $id) {
        id
        title
        description
        status
        category
        createdAt
        user {
          firstName
          lastName
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: {
        id: id,
      },
    }),
    cache: "no-store",
  });

  const json = await res.json();
  return json.data.task;
}

// Atualizar o status de uma tarefa
export async function updateTaskStatus(
  id: string,
  status: "pending" | "completed"
) {
  const mutation = `
    mutation UpdateTaskStatus($id: String!, $status: String!) {
      updateTaskStatus(id: $id, status: $status) {
        id
        status
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: mutation,
      variables: { id, status },
    }),
    cache: "no-store",
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Erro na mutation:", json.errors);
    throw new Error("Erro ao atualizar status da tarefa");
  }

  return json.data.updateTaskStatus as {
    id: string;
    status: "pending" | "completed";
  };
}

// Remover uma tarefa
export async function deleteTask(id: string): Promise<boolean> {
  const mutation = `
    mutation DeleteTask($id: String!) {
      deleteTask(id: $id)
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation, variables: { id } }),
    cache: "no-store",
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Erro ao deletar:", json.errors);
    throw new Error("Erro ao deletar tarefa");
  }

  return json.data.deleteTask;
}

// Criar uma nova tarefa
export async function createTask(
  input: Omit<Task, "id" | "createdAt">
): Promise<Task> {
  const mutation = `
    mutation CreateTask($input: NewTaskInput!) {
      createTask(input: $input) {
        id
        title
        description
        status
        category
        createdAt
        user {
          firstName
          lastName
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation, variables: { input } }),
    cache: "no-store",
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Erro ao criar task:", json.errors);
    throw new Error("Erro ao criar tarefa");
  }

  return json.data.createTask;
}
