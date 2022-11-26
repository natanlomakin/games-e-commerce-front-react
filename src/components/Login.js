import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SERVER_URL } from "../utils/serverUtil";
import { parseJwt } from "../utils/tokenDecode";
import "../static/css/register.css";

const Login = () => {
  const [username, setUsername] = useState("guest");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Invalid, setInvalid] = useState(false);

  useEffect(() => {
    localStorage.getItem("access-token") && setIsLoggedIn(true);
  }, []);

  /**
   * It sends a POST request to the server with the username and password, and if the response is
   * successful, it saves the access and refresh tokens in local storage and redirects the user to the
   * mainboard page.
   * @param e - event
   */
  const loginHandle = async (e) => {
    e.preventDefault();
    setInvalid(false);
    let result = await axios
      .post(
        SERVER_URL + "/login/loginuser/",
        {
          username: username,
          password: password,
        },
        { "Content-Type": "application/json" }
      )
      .catch(() => {
        setInvalid(true);
      })
      .then((response) => {
        localStorage.setItem("access-token", response.data.access);
        localStorage.setItem("refresh-token", response.data.refresh);
        localStorage.setItem("user", parseJwt(response.data.access).user_id);
      });
    setIsLoggedIn(true);
  };

  return (
    <div className="register-form-container">
      {isLoggedIn ? (
        <div className="after-submit">
          <div className="after-submit-message">
            <span>
              <h2>Logged in successfuly</h2>
            </span>
          </div>
          <div className="after-submit-links">
            <h2>Where would you like to visit ?</h2>
            <NavLink className="navigation-link" to="/mainboard">
              Store
            </NavLink>
            <NavLink className="navigation-link" to="/profile">
              Your profile
            </NavLink>
            <NavLink className="navigation-link" to="/cart">
              Your cart
            </NavLink>
            <NavLink className="navigation-link" to="/wishlist">
              Your wishlist
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="register-info">
          <form onSubmit={loginHandle}>
            <h1>Login</h1>
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
            {Invalid && (
              <div className="modal">
                <div className="modal-content">
                  <span>One of the credentials is incorrect</span>
                </div>
              </div>
            )}
            <p>
              Dont have an account?{" "}
              <NavLink className="register-or-login" to="/register">
                Register
              </NavLink>
            </p>
            <button>Log in</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
