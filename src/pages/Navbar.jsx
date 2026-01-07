
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Update login state on load and when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    handleStorageChange(); // initial check
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">TaskApp</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/showTask">Tasks</Link>}
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
