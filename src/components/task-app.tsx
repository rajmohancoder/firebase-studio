"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AddTaskForm from "./add-task-form";
import TaskList from "./task-list";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isMounted]);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  
  const { pendingTasks, completedTasks } = useMemo(() => {
    const sortedTasks = [...tasks].sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1);
    return sortedTasks.reduce(
      (acc, task) => {
        if (task.completed) {
          acc.completedTasks.push(task);
        } else {
          acc.pendingTasks.push(task);
        }
        return acc;
      },
      { pendingTasks: [] as Task[], completedTasks: [] as Task[] }
    );
  }, [tasks]);

  if (!isMounted) {
     return (
        <Card className="w-full max-w-2xl shadow-lg animate-pulse">
            <CardHeader>
                <div className="h-8 bg-muted rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-3/4 mx-auto mt-2"></div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex space-x-2">
                    <div className="h-10 bg-muted rounded flex-grow"></div>
                    <div className="h-10 bg-muted rounded w-28"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-6 bg-muted rounded w-24"></div>
                    <div className="h-px bg-muted"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                </div>
            </CardContent>
        </Card>
     );
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-primary font-headline">TaskTrack</CardTitle>
        <CardDescription className="text-center">
          Your simple and focused to-do list.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <AddTaskForm onAddTask={handleAddTask} />
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground/80 mb-2">To-Do</h3>
            <Separator />
            <TaskList
              tasks={pendingTasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
              emptyMessage="All tasks are done! ✨"
            />
          </div>
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground/80 mb-2">Completed</h3>
              <Separator />
              <TaskList
                tasks={completedTasks}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                emptyMessage="Get started on your tasks."
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
