import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate,Link } from "react-router-dom";
import Signup from "./Signup";
import Footer from "../Footer";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        // console.log("Server response:", data);

        // Example: save token
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error");
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
