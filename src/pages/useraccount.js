/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header/Header";
import "../styles/useraccount.css";
import Context from "../context_api/global";
import styled from "styled-components";
import { VerifiedUser } from "@mui/icons-material";
import { BiError } from "react-icons/bi";
import Loader from "react-loader-spinner";
// import userStyles from "../styles/useraccount.module.css";
import SideBar from "../components/Sidebar/Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { postRequest, getRequest } from "../utilities/ApiCall";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

export default function Useraccount() {
  const { userData, getUser } = useContext(Context);
  const [error, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, SetSuccess] = useState("");

  const resendEmailverification = async () => {
    const body = { email: userData.email };
    try {
      const response = await postRequest(
        `/verify/email/resend/`,
        JSON.stringify(body),
        "POST"
      );
      const data = await response.json();
      // console.log("MES", data);
      if (data.error) {
        setErr(data.error);
      } else {
        Swal.fire({
          title: `Verification link sent to your email! Check your inbox!`,
          icon: "success",
        });
        // SetSuccess("Verification link sent to your email!");
      }
      // setTimeout(() => {
      // 	setErr("");
      // 	SetSuccess("");
      // }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userData.email) getUser();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={70} width={80} />
      </Override>
    );
  } else {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mukti Prime : User Account</title>
        </Helmet>
        <Header />
        <SideBar />
        <div className="sidebar_area">
          <div className="container bgUsr">
            <div className="py-3">
              <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>
              <h3 style={{ textAlign: "center", color: "green" }}>{success}</h3>
            </div>
            <h2
              style={{ color: "black", textAlign: "center", fontWeight: "500" }}
            >
              User Account
            </h2>
            <div className="usr_fa_icon">
              <FaUserCircle />
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="text-dark">
                    Email:
                    {userData.email_verified ? (
                      <div className="verifyUsr">
                        <VerifiedUser
                          style={{ color: "green", fontSize: "20px" }}
                        />
                        Email verified
                      </div>
                    ) : (
                      <div className="verifyUsr" style={{ color: "red" }}>
                        <BiError style={{ color: "red", fontSize: "20px" }} />
                        Email not verified
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    className="form-control text-muted"
                    id="formGroupExampleInput"
                    value={userData.email}
                    disabled
                  />
                  {userData.email_verified ? (
                    <div className="verifyUsr"></div>
                  ) : (
                    <button
                      onClick={() => resendEmailverification()}
                      type="button"
                      className="btn btn-danger verifyBtn"
                    >
                      Send verification link
                    </button>
                  )}
                </div>{" "}
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="text-dark">Phone:</label>
                  <input
                    type="text"
                    className="form-control text-muted"
                    id="formGroupExampleInput"
                    value={userData.mobile_number}
                    disabled
                  />
                </div>{" "}
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="text-dark">Full Name:</label>
                  <input
                    type="text"
                    className="form-control text-muted"
                    id="formGroupExampleInput"
                    value={userData.full_name}
                    disabled
                  />
                </div>{" "}
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="text-dark">Username:</label>
                  <input
                    type="text"
                    className="form-control text-muted"
                    id="formGroupExampleInput"
                    value={userData.username}
                    disabled
                  />
                </div>{" "}
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label className="text-dark">Gender:</label>
                  <input
                    type="text"
                    className="form-control text-muted"
                    id="formGroupExampleInput"
                    value={userData.gender ? userData.gender : "Not Specified"}
                    disabled
                  />
                </div>{" "}
              </div>
              <div className="col-sm-12">
                <Link
                  style={{
                    backgroundColor: "red",
                    padding: 8,
                    borderRadius: 8,
                  }}
                  to="/account/profile-update"
                >
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container ">
          <div className="row d-flex justify-content-center">
            <div className="col-md-2"></div>
            <div className=" col-md-offset-2 col-md-10 pt-3">
              <div className="row z-depth-3">
                <div className="col-sm-8 bg-white rounded-right">
                  <div className="py-3">
                    <p style={{ textAlign: "center", color: "red" }}>{error}</p>
                    <p style={{ textAlign: "center", color: "green" }}>
                      {success}
                    </p>
                    <h3 className="mb-3 text-center font-weight-bold ">
                      <i>User Account</i>
                    </h3>
                  </div>
                  <div className="row ">
                    <div className="text-center">
                      <img
                        className="w-25"
                        src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
                        alt=""
                      />
                    </div>
                    <div className="col-sm-6">
                      <p className="font-weight-bold">Email:</p>
                      <h6 className=" text-muted">
                        {userData.email}
                        {userData.email_verified ? (
                          <i
                            title="Email verified"
                            style={{ fontSize: 20, color: "green" }}
                            className="fa fa-check"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <button onClick={() => resendEmailverification()}>
                            Send verification link
                          </button>
                        )}
                      </h6>
                    </div>
                    <div className="col-sm-6">
                      <p className="font-weight-bold">Phone:</p>
                      <h6 className="text-muted">{userData.mobile_number}</h6>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <div>
                        <h6 className="mt-3">
                          {" "}
                          <b>Full Name </b>
                        </h6>
                        <h7 className="text-muted">{userData.full_name}</h7>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div>
                        <h6 className="mt-3">
                          {" "}
                          <b>Username:</b>
                        </h6>
                        <h7 className="text-muted">{userData.username}</h7>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <p className="font-weight-bold">Gender:</p>
                      <h6 className="text-muted">
                        {userData.gender ? userData.gender : "Not Specified"}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
