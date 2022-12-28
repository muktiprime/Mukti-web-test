import React, { Component } from "react";
import { Link } from "react-router-dom";
import FooterStyles from "./Footer.module.css";

export default class Footer extends Component {
  render() {
    return (
      <>
        <div className={FooterStyles.footer}>
          <div className={FooterStyles.footerSection}>
            <div className={FooterStyles.footerIcons}>
              <a
                href="https://www.facebook.com/muktiprime"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/muktiprime/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-instagram"></i>
              </a>
              <a
                href="https://youtube.com/c/MuktiPrime"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-youtube"></i>
              </a>
              {/* <a href="/">
                <i className="fa fa-twitter"></i>
              </a> */}
            </div>
          </div>
          <div className={FooterStyles.footerSection}>
            <ul>
              {/* <li>
                <Link to="#">Get the Mukti Prime App</Link>
              </li> */}
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/terms-of-use">Terms & Use</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
              <li>
                <Link to="/grievance-redressal-mechanism">Grievance Redressal Mechanism</Link>
              </li>

              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className={FooterStyles.footerSection}>
            <div className={FooterStyles.footerText}>
              Copyright © 2022 Mukti Production LLP - All rights reserved.
            </div>
          </div>
        </div>
      </>
    );
  }
}
