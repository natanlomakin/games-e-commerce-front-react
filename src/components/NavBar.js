import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../static/css/navbar.css";
import axios from "axios";
import { SERVER_URL } from "../utils/serverUtil";

const NavBar = () => {
  /* const isAuthenticated = localStorage.getItem("token"); */
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [LoggedInDisplay, setLoggedInDisplay] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");

  /**
   * It removes the access-token, refresh-token,and user from localStorage,
   * after the user logs out.
   */
  const logoutHandle = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("user");
    setIsAuthenticated(null);
  };

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("access-token"));
    /**
     * It's a function that makes a request to the server to get the user profile, and if the request is successful, it
     * sets the profile picture to the image returned by the server. If the request fails,
     * it sets the profile picture to a default image.
     */
    const userProfile = async () => {
      const result = await axios(SERVER_URL + "/userprofile/getuserprofile/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access-token"),
        },
        Accept: "application/json",
        "Content-Type": "application/json",
      }).catch(
        setProfilePicture(
          "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
        )
      );
      setProfilePicture(SERVER_URL + result.data.profilePicture);
    };
    localStorage.getItem("access-token")
      ? userProfile()
      : setProfilePicture(
          "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png"
        );
  }, [isAuthenticated]);

  const displayByLoginStatus = () => {
    return (
      <div className="container">
        <nav>
          <h2 className="logo">
            1<span>UP</span>
          </h2>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/mainboard">Store</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
          <div className="dropdown">
            <button className="dropbtn">
              <img src={profilePicture} className="profilePic" alt="..." />
            </button>
            {isAuthenticated ? (
              <div className="dropdown-content">
                <NavLink to="/profile">Profile</NavLink>
                <a onClick={logoutHandle}>Logout</a>
                <NavLink to="/wishlist">Wishlist</NavLink>
                <NavLink to="/cart">Cart</NavLink>
              </div>
            ) : (
              <div className="dropdown-content">
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/wishlist">Wishlist</NavLink>
                <NavLink to="/cart">Cart</NavLink>
              </div>
            )}
          </div>
        </nav>
      </div>
    );
  };

  return displayByLoginStatus();
};

export default NavBar;
