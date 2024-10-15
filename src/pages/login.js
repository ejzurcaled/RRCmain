import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://roadrescueconnect.com/rrc/login.php",
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
        localStorage.setItem("authToken", data.token); // Save token
        navigate("/Dashboard"); // Navigate to the dashboard
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleRegisterClick = () => {
    const passcode = prompt("Please enter the passcode:");
    if (passcode === "112912") {
      navigate("/register");
    } else {
      window.location.reload(); // Refresh the login page
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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <p>
        Don't have an account?{" "}
        <span className="register-link" onClick={handleRegisterClick}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
