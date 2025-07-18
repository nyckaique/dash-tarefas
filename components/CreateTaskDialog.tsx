"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState } from "react";
import { createTask } from "@/lib/graphql";
import { Task } from "@/types/task";
import { toast } from "sonner";
import { CirclePlus, CircleX } from "lucide-react";

export function CreateTaskDialog({
  onCreate,
}: {
  onCreate: (task: Task) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Trabalho");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // error states
  const [errors, setErrors] = useState({
    title: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = async () => {
    // validação simples
    const newErrors = {
      title: title ? "" : "Título obrigatório",
      firstName: firstName ? "" : "Primeiro nome obrigatório",
      lastName: lastName ? "" : "Sobrenome obrigatório",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) return;

    try {
      setLoading(true);
      const newTask = await createTask({
        title,
        description,
        category,
        status: "pending",
        user: {
          firstName,
          lastName,
        },
      });

      toast("Tarefa criada com sucesso!");
      onCreate(newTask);
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar tarefa");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Trabalho");
    setFirstName("");
    setLastName("");
    setErrors({ title: "", firstName: "", lastName: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          <CirclePlus />
          Criar nova tarefa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label>Título</label>
            <Input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <label>Descrição</label>
          <Textarea
            placeholder="Descrição (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Categoria</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[180px] bg-white">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Trabalho">Trabalho</SelectItem>
              <SelectItem value="Pessoal">Pessoal</SelectItem>
              <SelectItem value="Estudos">Estudos</SelectItem>
            </SelectContent>
          </Select>

          <div>
            <label>Nome</label>
            <Input
              placeholder="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label>Sobrenome</label>
            <Input
              placeholder="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            <CircleX />
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 cursor-pointer"
          >
            <CirclePlus />
            {loading ? "Criando..." : "Criar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
