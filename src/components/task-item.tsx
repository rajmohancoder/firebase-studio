"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "./task-app";

type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
}: TaskItemProps) {
  return (
    <li className="flex items-center p-2 rounded-md transition-colors duration-200 hover:bg-accent/50 group">
      <div className="flex items-center flex-1 space-x-3">
        <Checkbox
          id={task.id}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
          className="transition-all duration-200"
        />
        <label
          htmlFor={task.id}
          className={cn(
            "flex-1 cursor-pointer transition-all duration-200",
            task.completed ? "line-through text-muted-foreground" : "text-foreground"
          )}
        >
          {task.text}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive hover:bg-destructive/10"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete task ${task.text}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}
