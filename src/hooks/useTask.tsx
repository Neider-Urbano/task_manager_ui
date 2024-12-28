import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { ErrorResponse, Task, UseTasksReturn } from "../types/taskTypes";
import { getToken } from "../utils/token";

const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const API_URL_TASK = API_URL + "/api/tasks";
  const token = getToken();

  const fetchTasks = async (filter?: "completed" | "pending") => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL_TASK, {
        params: filter ? { completed: filter === "completed" } : {},
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

  const createTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL_TASK, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prevTasks) => [...prevTasks, response.data]);
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
      const response = await axios.put(`${API_URL_TASK}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task))
      );
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

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      setError(error.response?.data?.error ?? "Error al eliminar la tarea");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    task,
    loading,
    error,
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
