import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../static/css/contact.css";

const Contact = () => {
  const [isFormSubmited, setIsFormSubmited] = useState(false);

  useEffect(() => {
    setIsFormSubmited(false);
  }, []);

  const handleContactFormSubmit = () => {
    setIsFormSubmited(true);
  };

  return (
    <div className="contact-container">
      <div className="contact-right">
        <h2>
          <span>How can we help?</span>
        </h2>
        <p>
          For quickest response times, please use our contact form or{" "}
          <a
            className="email-send"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=1upgamesstoreproject@gmail.com"
          >
            email us
          </a>{" "}
          directly.
        </p>
      </div>
      <div id="contact" className="contact-form">
        {isFormSubmited ? (
          <div className="after-submit">
            <div className="after-submit-message">
              <p>
                Thank you !<br />
              </p>
              <p>Your message has been submitted.</p>
            </div>
            <div className="after-submit-links">
              <h2>Where would you like to visit next?</h2>
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
          <form onSubmit={handleContactFormSubmit}>
            <div className="contact-form-inputs">
              <div className="contact-form-single-input">
                <label>First name:</label>
                <br />
                <input type="text" autoComplete={"false"} required></input>
              </div>
              <div className="contact-form-single-input">
                <label>Last name:</label>
                <br />
                <input type="text" autoComplete={"false"} required></input>
              </div>
              <div className="contact-form-single-input">
                <label>Email:</label>
                <br />
                <input type="text" autoComplete={"false"} required></input>
              </div>
              <div className="contact-form-single-input">
                <label>Message:</label>
                <br />
                <input
                  className="contact-form-single-input-box"
                  type="text"
                  autoComplete={"false"}
                  required
                ></input>
              </div>
              <div className="contact-form-single-input">
                <label>Additional info:</label>
                <br />
                <input
                  className="contact-form-single-input-box"
                  type="text"
                  autoComplete={"false"}
                ></input>
              </div>
            </div>
            <div className="contact-form-send">
              <button type="submit">Send message</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
