import React from "react";
import "../static/css/contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-right">
        <h2>
          <span>How can we help?</span>
        </h2>
        <p>
          For quickest response times, please use our contact form or{" "}
          <a className="email-send" href="https://mail.google.com/mail/?view=cm&fs=1&to=1upgamesstoreproject@gmail.com">
            email us
          </a>{" "}
          directly.
        </p>
      </div>
      <div id="contact" className="contact-form">
        <form>
          <div className="contact-form-inputs">
            <div className="contact-form-single-input">
              <label>First name:</label>
              <br />
              <input type="text" autoComplete={"false"}></input>
            </div>
            <div className="contact-form-single-input">
              <label>Last name:</label>
              <br />
              <input type="text" autoComplete={"false"}></input>
            </div>
            <div className="contact-form-single-input">
              <label>Email:</label>
              <br />
              <input type="email" autoComplete={"false"}></input>
            </div>
            <div className="contact-form-single-input">
              <label>Message:</label>
              <br />
              <input
                className="contact-form-single-input-box"
                type="text"
                autoComplete={"false"}
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
      </div>
    </div>
  );
};

export default Contact;
