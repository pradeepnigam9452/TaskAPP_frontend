import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate,Link } from "react-router-dom";
import Signup from "./Signup";
import Footer from "../Footer";
import api from "../../api.js" // this is my api .js
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
   const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/users/login", {
      email,
      password,
    });

    const data = response.data;

    setMessage("Login successful!");
    localStorage.setItem("token", data.token);
    navigate("/");
  } catch (error) {
    console.error("Login error:", error);

    if (error.response && error.response.data) {
      setMessage(error.response.data.message || "Invalid credentials");
    } else {
      setMessage("Server error. Please try again later.");
    }
  }
};


  return (
    <> <Navbar/> 
    <div style={styles.container}>
     
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>


        <p>Don't have account <Link to= "/signup"> sigup</Link></p>

        {message && <p>{message}</p>}
      </form>
    </div>
    <Footer/>
    </>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    cursor: "pointer",
  },
};

export default Login;


