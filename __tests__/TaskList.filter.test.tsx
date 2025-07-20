import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
];

describe("CategoryFilter in TasksList", () => {
  it("atualiza a lista ao trocar categoria (shadcn UI)", async () => {
    const mockedGetTasks = getTasks as jest.Mock;

    // Mock com todas as tarefas
    mockedGetTasks.mockResolvedValueOnce(mockTasks);
    render(<TasksList />);

    await waitFor(() => {
      expect(
        screen.getByText("Estudar pintura com aquarela")
      ).toBeInTheDocument();
      expect(screen.getByText("Supino inclinado máquina")).toBeInTheDocument();
      expect(screen.getByText("Landing Page cliente")).toBeInTheDocument();
    });

    const combobox = screen.getByRole("combobox");

    // Selecionar "Estudos"
    await userEvent.click(combobox);
    mockedGetTasks.mockResolvedValueOnce([mockTasks[0]]);
    const listbox1 = await screen.findByRole("listbox");
    const estudosOption = within(listbox1).getByText("Estudos");
    await userEvent.click(estudosOption);

    await waitFor(() => {
      expect(
        screen.getByText("Estudar pintura com aquarela")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Supino inclinado máquina")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Landing Page cliente")
      ).not.toBeInTheDocument();
    });

    // Selecionar "Pessoal"
    await userEvent.click(combobox);
    mockedGetTasks.mockResolvedValueOnce([mockTasks[1]]);
    const listbox2 = await screen.findByRole("listbox");
    const pessoalOption = within(listbox2).getByText("Pessoal");
    await userEvent.click(pessoalOption);

    await waitFor(() => {
      expect(screen.getByText("Supino inclinado máquina")).toBeInTheDocument();
      expect(
        screen.queryByText("Estudar pintura com aquarela")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Landing Page cliente")
      ).not.toBeInTheDocument();
    });

    // Selecionar "Trabalho"
    await userEvent.click(combobox);
    mockedGetTasks.mockResolvedValueOnce([mockTasks[2]]);
    const listbox3 = await screen.findByRole("listbox");
    const trabalhoOption = within(listbox3).getByText("Trabalho");
    await userEvent.click(trabalhoOption);

    await waitFor(() => {
      expect(screen.getByText("Landing Page cliente")).toBeInTheDocument();
      expect(
        screen.queryByText("Supino inclinado máquina")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Estudar pintura com aquarela")
      ).not.toBeInTheDocument();
    });
  });
});
