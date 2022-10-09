import React from "react";
import "../static/css/register.css";

const Register = () => {
  return (
    <div className="register-form-container">
      <div className="register-info">
        <h1>Register</h1>
        <form>
          <label>First name</label>
          <input type="text"></input>
        </form>
      </div>
    </div>
  );
};

export default Register;
