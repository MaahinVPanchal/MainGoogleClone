import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import loginImage from "../assets/undraw_login.svg";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    login();
  };

  const login = () => {
    axios
      .post("http://localhost:9002/login", user)
      .then((res) => {
        if (res.data.success) {
          navigate("/");
          onLogin(res.data.user); // Pass the user data to onLogin

          alert(res.data.message);
        } else {
          console.error("Login failed:", res.data.message);
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("An error occurred during login.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="login-container">
      <img src={loginImage} alt="Login illustration" className="login-image" />
      <h1 className="login-header">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-wrapper">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            required
            className="login-input"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            required
            className="login-input"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
