import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import './Home.css'
const Home = () => {
  return (
    <>
      <Navbar/>
      
      <div className="home-container">
        <h1 className="home-title">Task Manager</h1>

        <p className="home-description">
          Manage your daily tasks efficiently and stay organized.
          Create, track, and complete tasks with ease.
        </p>

        <Link to="/showTask" className="home-button">
          Get Started
        </Link>
     
        
      </div>
      <Footer/>
    </>
  )
}

export default Home
