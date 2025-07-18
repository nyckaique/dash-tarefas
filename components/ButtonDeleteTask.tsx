"use client";

import { Button } from "@/components/ui/button";
import { deleteTask } from "@/lib/graphql";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ButtonDeleteTask({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      toast.promise(deleteTask(id), {
        loading: "Excluindo tarefa...",
        success: () => {
          onDelete();
          return "Tarefa excluída com sucesso!";
        },
        error: "Erro ao excluir tarefa",
      });
    } catch (error) {
      console.error("Erro ao excluir tarefa", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="cursor-pointer"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        <Trash2 />
        Excluir
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a
              tarefa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading} className="cursor-pointer">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive hover:bg-destructive/90 cursor-pointer"
            >
              <Trash2 />
              {loading ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
