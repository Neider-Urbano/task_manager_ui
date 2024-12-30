import React from "react";
import { Task } from "../types/taskTypes";
import { ModalUpdateTask } from "./ModalUpdateTask";
import {
  Card,
  Button,
  Modal,
  CardHeader,
  CardBody,
  Divider,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import { AiFillDelete } from "react-icons/ai";
import { MdDone, MdEdit } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { ModalDeleteTask } from "./ModalDeleteTask";

interface TaskCardProps {
  task: Task;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updatedData: Partial<Task>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDeleteTask,
  onUpdateTask,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const handleCompleteToggle = (taskId: string, currentStatus: boolean) => {
    onUpdateTask(taskId, {
      completed: !currentStatus,
      title: task.title,
      description: task.description,
    });
  };

  return (
    <Card
      isHoverable
      className="px-4 py-2 shadow-sm border-l-4"
      style={{
        borderColor: task.completed ? "#22c55e" : "#f59e0b",
      }}
    >
      <CardHeader>
        <div className="flex w-full justify-between items-center">
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-800">
              {task.title}
            </h3>
            <p className="text-sm text-gray-500">
              <span className="hidden sm:inline">Creada el: </span>
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              className="min-w-0"
              isIconOnly
              variant="flat"
              onClick={onOpen}
              startContent={<MdEdit size={20} />}
            />

            <Button
              isIconOnly
              variant={task.completed ? "flat" : "flat"}
              color={task.completed ? "success" : "warning"}
              onClick={() => handleCompleteToggle(task._id, task.completed)}
              startContent={
                task.completed ? <BiTime size={20} /> : <MdDone size={20} />
              }
            />

            <Button
              isIconOnly
              variant="flat"
              color="danger"
              onClick={onDeleteOpen}
              startContent={<AiFillDelete size={20} />}
            />
          </div>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        {task.description ? (
          <p className="text-gray-700">{task.description}</p>
        ) : (
          <p className="text-gray-400 italic">Sin descripción.</p>
        )}
      </CardBody>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
        <ModalContent className="py-2">
          <ModalUpdateTask
            task={task}
            onClose={onClose}
            onUpdateTask={onUpdateTask}
          />
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        hideCloseButton={true}
      >
        <ModalContent className="py-2">
          <ModalDeleteTask
            taskId={task._id}
            onClose={onDeleteClose}
            onDeleteTask={onDeleteTask}
          />
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default TaskCard;
