"use client";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { getTask } from "@/lib/graphql";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarCheck,
  Trash2,
  CircleCheckBig,
  RefreshCcw,
  House,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function TaskPage() {
  const [task, setTask] = useState<Task>();
  const [avatarFallbackText, setAvatarFallbackText] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const params = useParams<{ id: string }>();
  const id = params.id;
  useEffect(() => {
    getTask(id).then(setTask);
  }, [id]);
  useEffect(() => {
    setAvatarFallbackText(
      `${task?.user.firstName[0]}${task?.user.lastName[0]}`
    );
    setUserName(`${task?.user.firstName} ${task?.user.lastName}`);
  }, [task]);

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <Button variant={"outline"} className="mb-4">
        <Link href="/" className="flex items-center gap-2 text-sm">
          <House />
          Voltar à Home
        </Link>
      </Button>

      <h1 className="text-xl font-bold flex items-center gap-2">
        <CircleCheckBig className="" size={16} /> Tarefa
      </h1>

      {!task && (
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

      {task && (
        <Card className="w-full flex flex-col md:flex-row gap-4 py-0 overflow-hidden">
          <div className="w-full md:w-3/5 py-6">
            <CardContent className="space-y-2">
              <h1 className="text-3xl">{task.title}</h1>
              {task.description && (
                <CardDescription className="text-base line-clamp-2">
                  <ScrollArea className="h-72 w-full">
                    {task.description}
                  </ScrollArea>
                </CardDescription>
              )}
            </CardContent>
          </div>
          <div className="w-full md:w-2/5 border-t-2 md:border-l-2 md:border-t-0 py-6 bg-neutral-100 ">
            <CardHeader className="">
              <CardTitle className="flex flex-col gap-2 justify-start items-start space-y-0 text-base pb-6">
                <div className="flex items-center gap-2 pb-6">
                  <p>Usuário:</p>
                  <Avatar>
                    <AvatarFallback className="bg-neutral-300">
                      {avatarFallbackText}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium py-1">{userName}</span>
                </div>
                <p className="w-full flex items-center gap-2 text-sm">
                  Status:{" "}
                  <Badge
                    className={`text-sm ${
                      task.status === "pending"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.status === "pending" ? "Pendente" : "Concluída"}
                  </Badge>
                </p>
                <p className="w-full flex items-center gap-2 text-sm">
                  Categoria:{" "}
                  <Badge variant={"outline"} className="text-sm ">
                    {task.category}
                  </Badge>
                </p>
                <p className="w-full flex items-center gap-2 text-sm">
                  Data de criação:{" "}
                  <Badge
                    variant={"outline"}
                    className="text-sm flex items-center gap-1"
                  >
                    <CalendarCheck />
                    {new Date(task.createdAt).toLocaleDateString()}
                  </Badge>
                </p>
              </CardTitle>
              {task.status === "pending" ? (
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <CircleCheckBig />
                  Concluir
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <RefreshCcw />
                  Reabrir
                </Button>
              )}
              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer"
              >
                <Trash2 />
                Excluir
              </Button>
            </CardHeader>
          </div>
        </Card>
      )}
    </main>
  );
}
