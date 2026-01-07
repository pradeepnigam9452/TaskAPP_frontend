import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./ShowTask.css";

const ShowTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate, token]);

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <>
      <Navbar />
      <div className="task-container">
        <div className="task-header">
          <h2>My Tasks</h2>
          <Link to="/createTask" className="create-task-btn">
            Create Task
          </Link>
        </div>

        {loading && <p className="task-loading">Loading tasks...</p>}
        {error && <p className="task-error">{error}</p>}
        {!loading && tasks.length === 0 && (
          <p className="task-empty">You have no tasks yet.</p>
        )}

        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p className="status">
                Status:{" "}
                <span
                  className={`status ${
                    task.status === "completed"
                      ? "completed"
                      : task.status === "pending"
                      ? "pending"
                      : "in-progress"
                  }`}
                >
                  {task.status}
                </span>
              </p>

              <div className="task-actions">
                <Link to={`/updateTask/${task._id}`} className="edit-btn">
                  Edit
                </Link>

             
                <button
                  onClick={() => handleDelete(task._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ShowTask;
