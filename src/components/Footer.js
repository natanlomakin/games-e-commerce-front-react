import React from "react";
import { NavLink } from "react-router-dom";
import "../static/css/footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/mainboard">Store</NavLink>
      <NavLink>Service</NavLink>
    </div>
  );
};

export default Footer;
