import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  getAllTasks,
} from "../services/apiTask";
import TodoItem from "../components/TodoItem";

function Home() {
  const [itemLoading, setItemLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    setItemLoading(true);

    async function fetchTodos() {
      try {
        const data = await getAllTasks();

        setTodos(data.allTasks);
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setItemLoading(false);
      }
    }
    fetchTodos();
  }, [isAuthenticated, refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  async function handleCreateItem(e) {
    e.preventDefault();
    if (!title || !description) return;
    setItemLoading(true);

    try {
      const data = await createTask(title, description);
      setRefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setItemLoading(false);
      setTitle("");
      setDescription("");
    }
  }

  async function handleUpdateItem(id) {
    setItemLoading(true);
    try {
      const data = await changeTaskStatus(id);

      setRefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setItemLoading(false);
    }
  }
  async function handleDeleteItem(id) {
    setItemLoading(true);

    try {
      const data = await deleteTask(id);

      setRefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setItemLoading(false);
    }
  }

  return (
    <div className="container">
      <section className="todosContainer">
        <div className="login">
          <section>
            <form name="login-form" id="login-form" onSubmit={handleCreateItem}>
              <input
                type="text"
                placeholder="Enter title.."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Enter description.."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <button type="submit" disabled={itemLoading}>
                Add
              </button>
            </form>
          </section>
        </div>

        <section className="todosContainer">
          {todos.map((item) => (
            <TodoItem
              key={item._id}
              item={item}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
            />
          ))}
        </section>
      </section>
    </div>
  );
}

export default Home;
