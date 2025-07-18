import { updateTaskStatus } from "@/lib/graphql";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, RefreshCcw } from "lucide-react";
import { Task } from "@/types/task";
import { toast } from "sonner";

export function ButtonUpdateTaskStatus({
  task,
  onStatusUpdate,
}: {
  task: Task;
  onStatusUpdate: (newStatus: Task["status"]) => void;
}) {
  const handleClick = async () => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    const action = newStatus === "completed" ? "concluída" : "reaberta";

    toast.promise(updateTaskStatus(task.id, newStatus), {
      loading: "Atualizando status...",
      success: (updated) => {
        onStatusUpdate(updated.status);
        return `Tarefa ${action} com sucesso!`;
      },
      error: "Erro ao atualizar status da tarefa",
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className="cursor-pointer"
    >
      {task.status === "pending" ? (
        <>
          <CircleCheckBig /> Concluir
        </>
      ) : (
        <>
          <RefreshCcw /> Reabrir
        </>
      )}
    </Button>
  );
}
