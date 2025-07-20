import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ButtonUpdateTaskStatus } from "@/components/ButtonUpdateTaskStatus";
import { Task } from "@/types/task";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Fazer café",
    description: "Passar um café fresquinho",
    status: "pending",
    category: "Pessoal",
    createdAt: "2025-07-18T17:30:00.000Z",
    user: { firstName: "João", lastName: "Pedro" },
  },
  {
    id: "2",
    title: "Ler um livro",
    description: "Terminar de ler um livro",
    status: "completed",
    category: "Estudos",
    createdAt: "2025-07-17T15:30:00.000Z",
    user: { firstName: "Ana", lastName: "Maria" },
  },
];

jest.mock("@/lib/graphql", () => ({
  updateTaskStatus: jest.fn(
    (taskId: string, newStatus: "pending" | "completed") =>
      Promise.resolve({ id: taskId, status: newStatus })
  ),
}));

jest.mock("sonner", () => ({
  toast: {
    promise: (
      promise: Promise<unknown>,
      { success }: { success: (res: unknown) => void }
    ) => promise.then(success),
  },
}));

describe("ButtonUpdateTaskStatus", () => {
  // Testa a atualização de status da tarefa de "pending" para "completed"
  it('muda o status para "completed" ao clicar em "Concluir"', async () => {
    const mockOnUpdate = jest.fn();
    render(
      <ButtonUpdateTaskStatus
        task={mockTasks[0]}
        onStatusUpdate={mockOnUpdate}
      />
    );

    fireEvent.click(screen.getByText("Concluir"));
    await waitFor(() => expect(mockOnUpdate).toHaveBeenCalledWith("completed"));
  });

  // Testa a atualização de status da tarefa de "completed" para "pending"
  it('muda o status para "pending" ao clicar em "Reabrir"', async () => {
    const mockOnUpdate = jest.fn();
    render(
      <ButtonUpdateTaskStatus
        task={mockTasks[1]}
        onStatusUpdate={mockOnUpdate}
      />
    );

    fireEvent.click(screen.getByText("Reabrir"));
    await waitFor(() => expect(mockOnUpdate).toHaveBeenCalledWith("pending"));
  });
});
