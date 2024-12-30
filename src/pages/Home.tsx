import useToken from "../hooks/useToken";
import { Navigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskForm";
import useTasks from "../hooks/useTask";
import { toast } from "react-toastify";

const Home = () => {
  const { existToken, removeTokenStorage } = useToken();
  const {
    createTask,
    error,
    loading,
    tasks,
    deleteTask,
    updateTask,
    setFilter,
  } = useTasks();

  if (!existToken) {
    return <Navigate to="/" />;
  }

  if (error) {
    toast.error(error, {
      position: "bottom-center",
      autoClose: 3000,
      closeOnClick: true,
    });
  }

  if (error && error == "Unauthorized") {
    removeTokenStorage();
  }

  return (
    <div className="flex gap-10 flex-col lg:flex-row px-10 pb-10">
      <CreateTaskForm onNewTask={createTask} isLoading={loading} />

      <TaskList
        tasks={tasks}
        loading={loading}
        onDeleteTask={deleteTask}
        onUpdateTask={updateTask}
        onSetFilter={setFilter}
      />
    </div>
  );
};

export default Home;
