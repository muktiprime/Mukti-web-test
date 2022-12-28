import React from "react";
import verifiedStyles from "./verification.module.css";
import { BiError } from "react-icons/bi";

const NotVerified = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <div className={verifiedStyles.box1}>
            <div className={verifiedStyles.iconss}>
              <BiError />
            </div>
            <h4 style={{ color: "maroon" }}>{props.message}</h4>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};

export default NotVerified;
