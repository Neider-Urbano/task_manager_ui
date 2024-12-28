import CreateTaskForm from "../components/CreateTaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  // const { tasks, loading, error } = useTasks();
  // console.log(tasks);

  // if (loading) return <p>Cargando...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <>
      <CreateTaskForm />
      <TaskList />
    </>
  );
};

export default Home;
