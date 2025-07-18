"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { getTasks } from "@/lib/graphql";
import { CategoryFilter } from "./CategoryFilter";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskCard";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function TasksList() {
  const [category, setCategory] = useState("Todos");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks(category).then(setTasks);
  }, [category]);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Gerenciador de Tarefas</h1>

      <div className="flex flex-wrap flex-col md:flex-row gap-2 justify-start md:justify-between items-start md:items-center">
        <CategoryFilter selected={category} onChange={setCategory} />

        <Button asChild variant={"outline"} className="w-full md:w-auto">
          <Link href="#">
            {" "}
            <CirclePlus /> Criar Nova Task
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 && (
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-1/4 mt-2" />
              </div>
            ))}
          </div>
        )}
        {tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}
