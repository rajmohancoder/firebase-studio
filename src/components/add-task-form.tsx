"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AddTaskFormProps = {
  onAddTask: (text: string) => void;
};

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = taskText.trim();
    if (text) {
      onAddTask(text);
      setTaskText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="What do you need to do?"
        className="flex-1"
        aria-label="New task"
      />
      <Button type="submit" aria-label="Add task">
        <Plus className="h-4 w-4 mr-2" />
        Add Task
      </Button>
    </form>
  );
}
