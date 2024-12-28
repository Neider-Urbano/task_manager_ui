import React, { useState } from "react";
import useTasks from "../hooks/useTask";

const CreateTaskForm = () => {
  const { createTask } = useTasks();
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return;

    createTask({
      title: taskTitle,
      description: taskDescription,
      completed: false,
    });
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Crear Nueva Tarea</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título de la tarea
          </label>
          <input
            id="title"
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Escribe el título de la tarea"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción (opcional)
          </label>
          <textarea
            id="description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Escribe una descripción de la tarea (opcional)"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear tarea
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
