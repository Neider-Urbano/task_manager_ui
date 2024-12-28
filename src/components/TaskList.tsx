import { useState } from "react";
import useTasks from "../hooks/useTask";

const TaskList = () => {
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<string>("all");

  const handleCompleteToggle = (taskId: string, currentStatus: boolean) => {
    updateTask(taskId, { completed: !currentStatus });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Lista de Tareas</h2>
        <div>
          <button
            onClick={() => setFilter("all")}
            className="mr-2 bg-gray-300 py-1 px-3 rounded-md hover:bg-gray-400"
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("completed")}
            className="mr-2 bg-green-300 py-1 px-3 rounded-md hover:bg-green-400"
          >
            Completadas
          </button>
          <button
            onClick={() => setFilter("pending")}
            className="bg-red-300 py-1 px-3 rounded-md hover:bg-red-400"
          >
            Pendientes
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li key={task.id} className="bg-white shadow-md rounded p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">
                  Creada el: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleCompleteToggle(task.id, task.completed)}
                  className={`py-1 px-3 rounded-md ${
                    task.completed ? "bg-green-500" : "bg-gray-500"
                  } text-white`}
                >
                  {task.completed ? "Marcar Pendiente" : "Marcar Completada"}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
