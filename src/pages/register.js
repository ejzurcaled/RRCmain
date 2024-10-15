import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://roadrescueconnect.com/rrc/register.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&password=${password}`,
      }
    );

    const data = await response.json();

    if (data.success) {
      setMessage("Registration successful! You can now log in.");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after 2 seconds
      }, 2000);
    } else {
      setMessage("Registration failed: " + (data.message || "Unknown error"));
    }
  };

  return (
    <div className="login-container">
      <img
        src="/rrc/rrc-logo.png"
        alt="RoadRescue Connect Logo"
        className="logo-login"
      />{" "}
      {/* Add logo */}
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
      <p>
        Already have an account? <a href="/rrc/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
