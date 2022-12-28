import React from "react";

export default function AppDownload() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-12">
          <center>
            <div className="mt-3 mb-3">
              {/* <img src={require('../assets/img/logo.png')} style={{width:'100%'}} alt='logo' /> */}
              <img
                src={require("../assets/img/screenshot.png")}
                style={{ width: "100%" }}
                alt="logo"
              />
              <p
                style={{ color: "green", fontWeight: "bold" }}
                className="mt-3"
              >
                Latest Version
              </p>
              <p style={{ color: "white" }}>Version: 1.0.0</p>
            </div>
            <a href="#" className="btn btn-lg btn-outline-danger mt-2 mb-5">
              Download the App Now
            </a>
          </center>
        </div>
      </div>
    </div>
  );
}
