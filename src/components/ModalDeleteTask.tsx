import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";

interface ModalDeleteTaskProps {
  taskId: string;
  onClose: () => void;
  onDeleteTask: (id: string) => void;
}

export const ModalDeleteTask: React.FC<ModalDeleteTaskProps> = ({
  taskId,
  onClose,
  onDeleteTask,
}) => {
  const handleSubmit = () => {
    onDeleteTask(taskId);
    onClose();
  };

  return (
    <>
      <ModalHeader className="flex flex-col text-center">
        <h2 className="text-2xl font-semibold">Eliminar Tarea</h2>
        <p className="text-gray-500 p-0 text-medium font-medium">
          ¿Estás seguro de que deseas eliminar esta tarea?
        </p>
      </ModalHeader>

      <ModalBody className="py-4">
        <p className="text-center text-gray-700">
          Esta acción no se puede deshacer.
        </p>
      </ModalBody>

      <ModalFooter className="flex justify-end gap-2">
        <Button onClick={handleSubmit} color="danger" variant="flat">
          Eliminar
        </Button>

        <Button onClick={onClose} color="secondary" variant="flat">
          Cancelar
        </Button>
      </ModalFooter>
    </>
  );
};
