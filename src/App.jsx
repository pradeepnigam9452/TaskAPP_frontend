import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Navbar from './pages/Navbar'
import Home from "./pages/Home"
import ShowTask from './pages/Tasks/ShowTask'
import CreateTask from './pages/Tasks/CreateTask'
import  UpdateTask from './pages/Tasks/UpdateTask'
const App = () => { 
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/showTask" element={<ShowTask />} /> 
      <Route path="/createTask" element={<CreateTask />} />
       <Route path="/updateTask/:id" element={<UpdateTask />} />
    </Routes>
  );
};

export default App;
