import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./CreateTask.css";
import api from "../../api.js";

const CreateTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("pending");

  const navigate = useNavigate();

  // 🔐 Auth check + fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await api.get("/api/tasks");
        setTasks(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  // ➕ Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/tasks", {
        title,
        description,
        dueDate,
        priority,
        status,
      });

      setTasks((prev) => [...prev, res.data]);

      // reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("low");
      setStatus("pending");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <>
      <Navbar />

      <div className="task-container">
        <h2>My Tasks</h2>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="task-form">
          <h3>Add New Task</h3>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button type="submit">Add Task</button>
        </form>

        {/* States */}
        {loading && <p className="task-loading">Loading tasks...</p>}
        {error && <p className="task-error">{error}</p>}
        {!loading && tasks.length === 0 && (
          <p className="task-empty">You have no tasks yet.</p>
        )}

        {/* Task List */}
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
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreateTask;
