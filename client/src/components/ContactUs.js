import React, { useEffect } from "react";
import "../css/contact.css";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("../login");
  });
  return (
    <div className="contact">
      <h1>Create a new Request</h1>
      <div className="request-form">
        <form action="">
          <div className="input-request">
            <label htmlFor="title">Title</label>
            <textarea cols={70} rows={5} name="" id="title" />
          </div>
          <div className="input-request">
            <label htmlFor="title">Description</label>
            <textarea cols={70} rows={10} name="" id="title" />
          </div>
          <div className="submit-reset">
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
