import React from "react";
import verifiedStyles from "./verification.module.css";
import { GoVerified } from "react-icons/go";
const Verified = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className={verifiedStyles.box1}>
              <div className={verifiedStyles.iconssG}>
                <GoVerified />
              </div>
              <h5 style={{ color: "green" }}>{props.message}</h5>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
      {/* <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className={verifiedStyles.box1}>
              <div className={verifiedStyles.roundedG}>
                <div className={verifiedStyles.iconssG}>
                  <i className="fa fa-check" aria-hidden="true"></i>
                </div>
                <br />
                <h5 style={{ color: "green" }}>
                  {props.message}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Verified;
