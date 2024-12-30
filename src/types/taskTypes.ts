export interface Task {
  _id: string;
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
  filter: string;
  setFilter: (filter: "completed" | "pending" | "all") => void;
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  createTask: (taskData: Omit<Task, "_id" | "createdAt">) => Promise<void>;
  updateTask: (id: string, updatedData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export interface ErrorResponse {
  error: string;
}
