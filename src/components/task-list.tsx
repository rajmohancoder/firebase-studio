"use client";

import TaskItem from "./task-item";
import type { Task } from "./task-app";

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  emptyMessage: string;
};

export default function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
  emptyMessage,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-muted-foreground text-center py-4">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-2 py-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}
