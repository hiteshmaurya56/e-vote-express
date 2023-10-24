import React, { useContext, useState } from "react";
import "../css/signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AlertContext from "../contexts/alert/AlertContext";
const SignUp = () => {
  const { successful, unSuccessful } = useContext(AlertContext);

  const [credentials, setCredentials] = useState({
    fName: "",
    lName: "",
    dob: "",
    uName: "",
    email: "",
    password: "",
    city: "",
    pinCode: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { uName, fName, lName, email, password, dob, pinCode } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: uName,
        first_name: fName,
        last_name: lName,
        email,
        password,
        dob,
        pin_code: pinCode,
      }),
    });
    const json = await response.json();
    if (json.error) unSuccessful(json.error);
    else {
      successful("Registration Successful");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  };

  return (
    <>
      <section>
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <h2>Register Now!</h2>
            <div className="input-box">
              <input
                type="text"
                name="fName"
                id="fName"
                onChange={handleOnChange}
                minLength={2}
                required
              />
              <label>First Name</label>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="lName"
                id="lName"
                onChange={handleOnChange}
                required
              />
              <label>Last Name</label>
            </div>
            <div className="input-box">
              <input
                type="date"
                name="dob"
                id="dob"
                placeholder=""
                onChange={handleOnChange}
                required
              />
              <label>Date of Birth</label>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="uName"
                id="uName"
                onChange={handleOnChange}
                required
              />
              <label>Username</label>
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleOnChange}
                required
                minLength={5}
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleOnChange}
                required
                minLength={5}
              />
              <label>Password</label>
            </div>
            <div className="input-box">
              <input type="password" onChange={handleOnChange} required />
              <label>Confirm Password</label>
            </div>

            <div className="input-box">
              <input
                type="text"
                name="city"
                id=""
                onChange={handleOnChange}
                required
              />
              <label>City</label>
            </div>
            <div className="input-box">
              <input
                type="number"
                name="pinCode"
                value={credentials.pinCode}
                onChange={handleOnChange}
                required
              />
              <label>Pincode</label>
            </div>
            <button type="submit">Register</button>
            <div className="login-link">
              <p>
                Have an account?<a href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
