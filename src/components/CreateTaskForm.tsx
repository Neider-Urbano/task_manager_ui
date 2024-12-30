import React, { useEffect, useState } from "react";
import { Task } from "../types/taskTypes";
import ReactConfetti from "react-confetti";
import { Button, Input } from "@nextui-org/react";

interface CreateTaskFormProps {
  onNewTask: (taskData: Omit<Task, "_id" | "createdAt">) => void;
  isLoading: boolean;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onNewTask,
  isLoading,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const isValidTitle = taskTitle.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validTitle();

    if (isValidTitle) {
      onNewTask({
        title: taskTitle,
        description: taskDescription,
        completed: false,
      });

      setError(null);
      setTaskTitle("");
      setTaskDescription("");
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  };

  const validTitle = () => {
    if (isValidTitle) {
      setError("");
    } else {
      setError("El título es requerido");
    }
  };

  useEffect(() => {
    if (error !== null) {
      validTitle();
    }
  }, [taskTitle]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        {showConfetti && (
          <ReactConfetti
            width={window.innerWidth - 50}
            height={window.innerHeight}
            numberOfPieces={200}
            gravity={0.4}
            colors={["#4CAF50", "#FFEB3B", "#2196F3", "#FF5722"]}
          />
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Crear Nueva Tarea
        </h2>

        <div className="flex flex-col gap-4">
          <Input
            isRequired
            label="Título de la tarea"
            placeholder="Escribe el título de la tarea"
            value={taskTitle}
            onChange={(e) => {
              const value = e.target.value;
              setTaskTitle(value);
              setError("");
            }}
            errorMessage={
              <p className="text-left ml-2 text-red-500">{error}</p>
            }
            isInvalid={error != null && error.length > 0}
            className="focus:ring-2 focus:ring-primary-500"
            variant="bordered"
            classNames={{
              inputWrapper: ["border"],
            }}
          />

          <Input
            isRequired={false}
            label="Descripción de la tarea"
            placeholder="Escribe la descripción de la tarea"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="focus:ring-2 focus:ring-primary-500"
            variant="bordered"
            classNames={{
              inputWrapper: ["border"],
            }}
          />

          <Button
            onClick={handleSubmit}
            color="primary"
            className="w-full mt-2"
            isDisabled={!isValidTitle}
            isLoading={isLoading}
          >
            Crear tarea
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskForm;
