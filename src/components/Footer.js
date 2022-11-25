import React from "react";
import { NavLink } from "react-router-dom";
import "../static/css/footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-row-links-container">
        <h5>
          <NavLink className="navigation-link">Terms of Service</NavLink>
        </h5>
        -
        <h5>
          <NavLink className="navigation-link">Privacy Policy</NavLink>
        </h5>
        -
        <h5>
          <NavLink className="navigation-link">Store Refund Policy</NavLink>
        </h5>
      </div>
      <div className="footer-row-copyright-container">
        <p>
          © 2022 - 2022 https://up-374ca.firebaseapp.com/ <br /> All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
