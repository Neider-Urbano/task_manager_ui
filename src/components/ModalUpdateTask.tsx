import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Task } from "../types/taskTypes";

interface ModalUpdateTaskProps {
  task: Omit<Task, "createdAt">;
  onClose: () => void;
  onUpdateTask: (id: string, updatedData: Partial<Task>) => void;
}

export const ModalUpdateTask: React.FC<ModalUpdateTaskProps> = ({
  task,
  onClose,
  onUpdateTask,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [taskDescription, setTaskDescription] = useState<string | undefined>(
    task.description
  );
  const [error, setError] = useState<string | null>(null);

  const isValidTitle = taskTitle.trim().length > 0;

  const handleSubmit = () => {
    validateTitle();

    if (isValidTitle) {
      onUpdateTask(task._id, {
        title: taskTitle,
        description: taskDescription,
        completed: task.completed,
      });

      setError(null);
      onClose();
    }
  };

  const validateTitle = () => {
    if (!isValidTitle) {
      setError("El título es requerido");
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    if (error !== null) {
      validateTitle();
    }
  }, [taskTitle]);

  return (
    <>
      <ModalHeader className="flex flex-col text-center">
        <h2 className="text-2xl font-semibold">Actualizar Tarea</h2>
        <p className="text-gray-500 p-0 text-medium font-medium">
          Edita los detalles de tu tarea
        </p>
      </ModalHeader>

      <ModalBody>
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
          errorMessage={<p className="text-left ml-2 text-red-500">{error}</p>}
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
      </ModalBody>

      <ModalFooter className="flex justify-end gap-2">
        <Button
          onClick={handleSubmit}
          color="success"
          isDisabled={!isValidTitle}
          variant="flat"
        >
          Actualizar
        </Button>

        <Button onClick={onClose} color="danger" variant="flat">
          Cancelar
        </Button>
      </ModalFooter>
    </>
  );
};
