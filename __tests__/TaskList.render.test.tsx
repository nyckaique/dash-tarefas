import { render, screen, waitFor } from "@testing-library/react";
import { TasksList } from "@/components/TasksList";
import { getTasks } from "@/lib/graphql";
import { Task } from "@/types/task";
import "@testing-library/jest-dom";

jest.mock("@/lib/graphql", () => ({
  getTasks: jest.fn(),
}));

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

describe("TasksList", () => {
  it("renderiza cards com todas as informações da tarefa", async () => {
    (getTasks as jest.Mock).mockResolvedValue(mockTasks);
    render(<TasksList />);

    await waitFor(() => {
      expect(screen.getByText("Fazer café")).toBeInTheDocument();
      expect(screen.getByText("Ler um livro")).toBeInTheDocument();
    });

    // Título com link
    expect(screen.getByRole("link", { name: "Fazer café" })).toHaveAttribute(
      "href",
      "/task/1"
    );
    expect(screen.getByRole("link", { name: "Ler um livro" })).toHaveAttribute(
      "href",
      "/task/2"
    );

    // Descrições
    expect(screen.getByText(/Passar um café fresquinho/i)).toBeInTheDocument();
    expect(screen.getByText(/Terminar de ler um livro/i)).toBeInTheDocument();

    // Badges de status
    expect(screen.getByText("Pendente")).toBeInTheDocument();
    expect(screen.getByText("Concluída")).toBeInTheDocument();

    // Badge de categoria
    expect(screen.getByText("Pessoal")).toBeInTheDocument();
    expect(screen.getByText("Estudos")).toBeInTheDocument();

    // Badge de data
    expect(screen.getByText("18/07/2025")).toBeInTheDocument();
    expect(screen.getByText("17/07/2025")).toBeInTheDocument();

    // Nome do usuário
    expect(screen.getByText("João Pedro")).toBeInTheDocument();
    expect(screen.getByText("Ana Maria")).toBeInTheDocument();

    // AvatarFallback com iniciais
    expect(screen.getByText("JP")).toBeInTheDocument();
    expect(screen.getByText("AM")).toBeInTheDocument();

    // Botões de ação
    expect(screen.getAllByRole("button", { name: /concluir/i })).toHaveLength(
      1
    );
    expect(screen.getAllByRole("button", { name: /reabrir/i })).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: /excluir/i })).toHaveLength(2);
  });
});
