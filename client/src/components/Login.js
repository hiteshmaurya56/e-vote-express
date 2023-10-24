import React, { useContext, useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import AlertContext from "../contexts/alert/AlertContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { successful, unSuccessful } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleOnChange = async (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    console.log(json);
    if (json.error) {
      unSuccessful(json.error);
    } else {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("uname", json.name);
      successful("Login Successful!");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  };

  return (
    <section className="reg-login">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-box">
            <span className="icon">
              <img src="./images/user.png" alt="" />
            </span>
            <input
              type="text"
              name="username"
              required
              onChange={handleOnChange}
              value={credentials.username}
            />
            <label>Username</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <img src="./images/password.png" alt="" />
            </span>
            <input
              type="password"
              name="password"
              required
              onChange={handleOnChange}
              value={credentials.password}
            />
            <label>Password</label>
          </div>

          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account?<a href="/signup">Register</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
