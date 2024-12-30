import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ErrorResponse, Task, UseTasksReturn } from "../types/taskTypes";
import { Config } from "../config";
import useToken from "./useToken";
import { toast } from "react-toastify";

const useTasks = (): UseTasksReturn => {
  const { token } = useToken();
  const API_URL_TASK = Config.API_URL + "/api/tasks";
  const [filter, setFilter] = useState<"completed" | "pending" | "all">("all");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL_TASK, {
        params: filter != "all" ? { completed: filter === "completed" } : {},
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(response.data);
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<ErrorResponse>;

      setError(error.response?.data?.error ?? "Error al obtener las tareas");
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL_TASK}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTask(response.data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      setError(error.response?.data?.error ?? "Error al obtener la tarea");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, "_id" | "createdAt">) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(API_URL_TASK, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTasks();
      toast.success("¡Tarea creada!", {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      setError(error.response?.data?.error ?? "Error al crear la tarea");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, updatedData: Partial<Task>) => {
    setLoading(true);
    setError(null);

    try {
      await axios.put(`${API_URL_TASK}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
      toast.success("¡Tarea actualizada!", {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      setError(error.response?.data?.error ?? "Error al actualizar la tarea");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_URL_TASK}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("¡Tarea eliminada!", {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      setError(error.response?.data?.error ?? "Error al eliminar la tarea");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return {
    tasks,
    task,
    loading,
    error,
    filter,
    setFilter,
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
