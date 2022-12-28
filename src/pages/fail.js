import React from "react";
import failStyle from "../styles/fail.module.css";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
const fail = () => {
  return (
    <div>
      <Header />{" "}
      <div className={failStyle.center}>
        <div className={failStyle.error}>
          <div className={failStyle.number}>4</div>
          <div className={failStyle.illustration}>
            <div className={failStyle.circle} />
            <div className={failStyle.clip}>
              <div className={failStyle.paper}>
                <div className={failStyle.face}>
                  <div className={failStyle.eyes}>
                    <div className={failStyle.eye_eye_left} />
                    <div className={failStyle.eye_eye_right} />
                  </div>
                  <div className={failStyle.rosyCheeks_rosyCheeks_left} />
                  <div className={failStyle.rosyCheeks_rosyCheeks_right} />
                  <div className={failStyle.mouth} />
                </div>
              </div>
            </div>
          </div>
          <div className={failStyle.number}>4</div>
        </div>
        <div className={failStyle.text}>
          Oops. Something Went Wrong Please Try again later
        </div>
        <Link className={failStyle.button} to="/">
          Back Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default fail;
