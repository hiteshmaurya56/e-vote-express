import React from "react";
import "../css/navbar.css";
import logo from "./logo.png";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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
              <a className="navbar-link" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="navbar-link" href="/elections">
                Elections
              </a>
            </li>
            <li>
              <a className="navbar-link" href="/results">
                Results
              </a>
            </li>
            <li>
              <a className="navbar-link" href="/contactus">
                Contact Us
              </a>
            </li>
            {!localStorage.getItem("token") ? (
              <li>
                <a className="navbar-link" href="/login">
                  Login
                </a>
              </li>
            ) : (
              <li>
                <a className="navbar-link" href="/login">
                  {localStorage.getItem("uname")}
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
