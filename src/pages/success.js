import React from "react";
import successStyles from "../styles/success.module.css";
import Check from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const success = () => {
  return (
    <div>
      <Header />
      <br />
      <div className={successStyles.wrapperAlert}>
        <div className={successStyles.contentAlert}>
          <div className={successStyles.topHalf}>
            <p className={successStyles.icon_box}>
              <Check className={successStyles.icon} />
            </p>
            <h1 className={successStyles.text}>Congratulations</h1>
            <ul className={successStyles.bg_bubbles}>
              <li className={successStyles.float} />
              <li className={successStyles.float} />
              <li className={successStyles.float} />
              <li className={successStyles.float} />
              <li className={successStyles.float} />
              <li className={successStyles.float} />
              <li className={successStyles.float} />
              <li className={successStyles.float} />
              <li className={successStyles.float} />
              <li className={successStyles.float} />
            </ul>
          </div>
          <div className={successStyles.bottomHalf}>
            <p className={successStyles.para}>
              Well Done!, You have successfully purchased a plan
            </p>
            <Link to="/">
              <button
                className={successStyles.button}
                id={successStyles.alertMO}
              >
                Continue Streaming
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default success;
