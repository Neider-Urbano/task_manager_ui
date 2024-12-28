export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface UseTasksReturn {
  tasks: Task[];
  task: Task | null;
  loading: boolean;
  error: string | null;
  fetchTasks: (filter?: "completed" | "pending") => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  createTask: (taskData: Omit<Task, "id" | "createdAt">) => Promise<void>;
  updateTask: (id: string, updatedData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export interface ErrorResponse {
  error: string;
}
