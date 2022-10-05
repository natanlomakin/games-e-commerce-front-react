import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../static/css/navbar.css";
const NavBar = () => {
  return (
    <div className="container">
      <nav>
        <h2 className="logo">
          1<span>UP</span>
        </h2>
        <ul>
          <li>
            <NavLink to="/mainboard">Home</NavLink>
          </li>
          <li>
            <NavLink>About</NavLink>
          </li>
          <li>
            <NavLink>Service</NavLink>
          </li>
        </ul>
        <div className="dropdown">
          <button className="dropbtn">
            <img
              src="https://picsum.photos/seed/picsum/200"
              className="profilePic"
              alt="..."
            />
          </button>
          <div className="dropdown-content">
            <NavLink>Profile</NavLink>
            <NavLink>Login</NavLink>
            <NavLink>Wishlist</NavLink>
            <NavLink>Cart</NavLink>
          </div>
        </div>
        {/* <NavLink className="cartButton" to="/cart">
          Cart
        </NavLink> */}
        {/* <button type="button">Cart</button> */}
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
