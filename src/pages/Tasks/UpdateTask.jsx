import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./UpdateTask.css";
import Footer from "../Footer";


const UpdateTask = () => {
  const { id } = useParams(); // get task id from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Task fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("pending");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch task details
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const task = res.data.find((t) => t._id === id);
        if (!task) {
          setError("Task not found");
          return;
        }
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate.split("T")[0]); // format YYYY-MM-DD
        setPriority(task.priority);
        setStatus(task.status);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { title, description, dueDate, priority, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Task updated successfully!");
      navigate("/showTask"); // redirect to task list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update task");
    }
  };

  if (loading) return <p className="task-loading">Loading task...</p>;
  if (error) return <p className="task-error">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="update-task-container">
        <h2>Update Task</h2>
        <form onSubmit={handleUpdate} className="update-task-form">
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
          <button type="submit" className="update-btn">
            Update Task
          </button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default UpdateTask;
