import { Task } from "@/types/task";

const endpoint = "http://localhost:3000/api/graphql";

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
