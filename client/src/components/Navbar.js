import React from "react";
import "../css/navbar.css";
import logo from "./logo.png";
import { ToastContainer } from "react-toastify";
import "../css/toast.css";

const Navbar = () => {


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        style={{ fontSize: "1.5em" }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <header className="header">
        <a href="/">
          <img src={logo} alt="eVoteExpress" className="logo" />
        </a>
        <nav className="navbar">
          <ul className="navbar-list">
            <li>
              {sessionStorage.getItem("uname") !== "Admin" ? (
                <a className="navbar-link" href="/">
                  Home
                </a>
              ) : (
                <a className="navbar-link" href="/elections">
                  Elections
                </a>
              )}
            </li>
            <li>
              {sessionStorage.getItem("uname") === "Admin" ? (
                <a className="navbar-link" href="/registrations">
                  Registrations
                </a>
              ) : (
                <a className="navbar-link" href="/elections">
                  Elections
                </a>
              )}
            </li>
            <li>
              {sessionStorage.getItem("uname") === "Admin" ? (
                <a className="navbar-link" href="/requests">
                  Requests
                </a>
              ) : (
                <a className="navbar-link" href="/results">
                  Results
                </a>
              )}
            </li>
            <li>
              {sessionStorage.getItem("uname") === "Admin" ? (
                <a className="navbar-link" href="/allusers">
                  All Users
                </a>
              ) : (
                <a className="navbar-link" href="/contactus">
                  Contact Us
                </a>
              )}
            </li>
            {!sessionStorage.getItem("token") ? (
              <li>
                <a className="navbar-link" href="/login">
                  Login
                </a>
              </li>
            ) : (
              <li>
                <a className="navbar-link" href="/profile">
                  {sessionStorage.getItem("uname")}
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
