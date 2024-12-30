import TaskCard from "./TaskCard";
import { Task } from "../types/taskTypes";
import { Button, Spinner } from "@nextui-org/react";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onDeleteTask: (id: string) => void;
  onSetFilter: (filter: "completed" | "pending" | "all") => void;
  onUpdateTask: (id: string, updatedData: Partial<Task>) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onUpdateTask,
  loading,
  onSetFilter,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📋 Lista de Tareas</h2>

        <div className="flex gap-2">
          <Button
            onClick={() => onSetFilter("all")}
            variant="flat"
            color="primary"
            isIconOnly={false}
          >
            Todas
          </Button>

          <Button
            onClick={() => onSetFilter("completed")}
            variant="flat"
            color="success"
            isIconOnly={false}
          >
            Completadas
          </Button>

          <Button
            onClick={() => onSetFilter("pending")}
            variant="flat"
            color="warning"
            isIconOnly={false}
          >
            Pendientes
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Spinner size="lg" color="primary" />
          <p className="ml-4 text-lg font-medium text-gray-600">Cargando...</p>
        </div>
      )}

      {!loading && tasks.length === 0 ? (
        <div className="flex flex-col items-center py-10">
          <p className="text-lg text-gray-500 font-medium">
            🚀 No hay tareas para mostrar
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              task={task}
              key={task._id}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
