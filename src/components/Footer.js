import React from "react";
import { NavLink } from "react-router-dom";
import "../static/css/footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-row-links-container">
        <NavLink className="footer-link" >
          Terms of Service
        </NavLink>
        <NavLink className="footer-link" >
          Privacy Policy
        </NavLink>
        <NavLink className="footer-link">Store Refund Policy</NavLink>
      </div>
      <div className="footer-row-copyright-container">
        <p>
          © 2022 - 2022 http://localhost:3000/wishlist - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
