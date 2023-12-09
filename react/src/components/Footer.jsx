import React from "react";
import "./css/Navbar.css";

function Footer() {
  return (
    <div className="row justify-content-center sm-10 bo pr-2 pl-2" id="footer">
      <div className="col-md-10">
        <div className="row">
          <div className="col-md-3">
            <a className="navbar-brand" href="#" id="brand-name">
              <img
                className="img-fluid"
                id="footer-love-img"
                src="data:image/png;base64,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"
                alt="Donate"
              />
              Donate
            </a>
            <p id="why-choose-para">Let's Make the World Without Saying "NO"</p>
            <h5>
              <strong>Follow Us</strong>
            </h5>
            <hr className="hr mt-4 mb-4" id="hr-footer" />
            <i className="bi bi-facebook mt-1" id="icon-footer"></i>
            <i className="bi bi-instagram" id="icon-footer"></i>
            <i className="bi bi-whatsapp" id="icon-footer"></i>
            <i className="bi bi-google" id="icon-footer"></i>
          </div>
          <div className="col-md-5" id="footer-links">
            <h5>
              <strong>Useful Links</strong>
              <hr className="hr mt-4" id="hr-footer" />
            </h5>
            <div className="row">
              <div className="col-md-6">
                <a href="">Home</a>
                <br />
                <a href="">Requirement</a>
                <br />
                <a href="">Contact</a>
                <br />
                <a href="">Privacy Policy</a>
                <br />
                <a href="">Sign In</a>
              </div>
              <div className="col-md-6">
                <a href="">Donate</a>
                <br />
                <a href="">Memories</a>
                <br />
                <a href="">About Us</a>
                <br />
                <a href="">T&C</a>
                <br />
                <a href="">Latest News</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h5>
              <strong>Subscribe to our Newsletter</strong>
              <hr className="hr mt-4" id="hr-footer" />
            </h5>
            <p id="why-choose-para">
              Don't miss to subscribe to our new feeds, kindly fill the form
              below.
            </p>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                id="input-footer"
              />
              <div className="input-group-append">
                <button className="btn" id="send-btn-footer">
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="hr mt-4" />
        <div className="col-md-10 d-flex">
          <p id="why-choose-para" style={{ marginRight: "5px" }}>
            Copyright © 2023 donate. All right reserved. Developed by{" "}
            <span id="why-choose-para" style={{ color: "rgb(235, 58, 117)" }}>
              GreenBurds
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
