import React, { useState } from "react";
import "../static/css/register.css";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("guest");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegisterd, setIsRegisterd] = useState(false);

  /**
   * When the user clicks the register button, the function will send a post request to the server with
   * the user's information.
   */
  const registerHandle = async (e) => {
    e.preventDefault();
    const response = await axios.post(SERVER_URL + "/register/register/", {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    });
    setIsRegisterd(true);
  };

  return (
    <div className="register-form-container">
      {isRegisterd ? (
        <div className="after-submit">
          <div className="after-submit-message">
            <span>
              <h2>Successfuly signed up !</h2>
            </span>
          </div>
          <div className="after-submit-links">
            <h2>
              Now, <br /> lets log you in.
            </h2>
            <button>
              <NavLink className="navigation-link" to="/login">
                Click here
              </NavLink>
            </button>
          </div>
        </div>
      ) : (
        <div className="register-info">
          <form onSubmit={registerHandle}>
            <h1>
              <span>Sign up</span>
            </h1>
            <div>
              <label>First name: </label>
              <br />
              <input
                id="first_name"
                autoComplete={"false"}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Last name: </label>
              <br />
              <input
                id="last_name"
                type="text"
                autoComplete={"false"}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Username: </label>
              <br />
              <input
                required
                id="username"
                type="text"
                autoComplete={"false"}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Email: </label>
              <br />
              <input
                required
                id="email"
                type={"email"}
                autoComplete={"false"}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Password: </label>
              <br />
              <input
                required
                id="password"
                type={"password"}
                autoComplete={"false"}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <p>
              Already have an account?{" "}
              <NavLink className="register-or-login" to="/login">
                Login
              </NavLink>
            </p>
            <div className="register-submit">
              <button type="submit">Sign me up</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
