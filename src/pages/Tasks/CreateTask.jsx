import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from '../Footer'
import "./CreateTask.css";

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

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description, dueDate, priority, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
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
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button type="submit">Add Task</button>
        </form>

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
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CreateTask;
