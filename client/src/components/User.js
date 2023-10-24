import React from "react";
import { ReactDOM } from "react";
import Login from "./Login";

const User = () => {
  return ReactDOM.createPortal(
    <div>
      <Login />
    </div>,
    document.querySelector(".login-register")
  );
};

export default User;
