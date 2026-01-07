import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL : "https://pradeepnigam9452-task-ap-pbackend.vercel.app/"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
