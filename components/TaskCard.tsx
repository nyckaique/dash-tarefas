import { Task } from "@/types/task";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck } from "lucide-react";
import { ButtonUpdateTaskStatus } from "@/components/ButtonUpdateTaskStatus";
import { ButtonDeleteTask } from "@/components/ButtonDeleteTask";
import { useState } from "react";
type Props = {
  initialTask: Task;
  onDelete: () => void;
};

export function TaskCard({ initialTask, onDelete }: Props) {
  const [task, setTask] = useState(initialTask);
  const avatarFallbackText = `${task.user.firstName[0]}${task.user.lastName[0]}`;
  const userName = `${task.user.firstName} ${task.user.lastName}`;
  const handleStatusUpdate = (newStatus: Task["status"]) => {
    setTask((prev) => (prev ? { ...prev, status: newStatus } : prev));
  };
  return (
    <Card className="w-full hover:drop-shadow-lg transition-shadow duration-700">
      <CardHeader className="">
        <CardTitle className="flex flex-col md:flex-row gap-2 justify-start md:justify-between items-start md:items-center space-y-0 text-base">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{avatarFallbackText}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium px-2 py-1">{userName}</span>
          </div>
          <Badge
            className={`text-xs font-medium ${
              task.status === "pending"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {task.status === "pending" ? "Pendente" : "Concluída"}
          </Badge>
        </CardTitle>

        <Link href={`/task/${task.id}`} className="text-xl hover:underline">
          {task.title}
        </Link>
      </CardHeader>

      <CardContent className="space-y-2">
        {task.description && (
          <CardDescription className="text-base line-clamp-2">
            {task.description}
          </CardDescription>
        )}
      </CardContent>

      <CardFooter className="flex flex-col md:flex-row gap-2 justify-start md:justify-between items-start md:items-center">
        <div className="flex flex-wrap gap-2">
          <Badge variant={"outline"} className="text-sm ">
            {task.category}
          </Badge>
          <Badge
            variant={"outline"}
            className="text-sm flex items-center gap-1"
          >
            <CalendarCheck />
            {new Date(task.createdAt).toLocaleDateString()}
          </Badge>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-start md:justify-end w-full md:w-auto">
          <ButtonUpdateTaskStatus
            task={task}
            onStatusUpdate={handleStatusUpdate}
          />
          <ButtonDeleteTask id={task.id} onDelete={onDelete} />
        </div>
      </CardFooter>
    </Card>
  );
}
