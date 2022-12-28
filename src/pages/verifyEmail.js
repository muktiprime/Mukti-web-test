/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRequest } from "../utilities/ApiCall";
import NotVerified from "../components/EmailVerification/notVerified";
import Verified from "../components/EmailVerification/verified";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import Header from "../components/Header/Header";

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

const VerifyEmail = () => {
  const [togleVerified, setToggleverified] = useState(true);
  const [metaData, setMetaData] = useState({
    success_msg: "Your email has been verified!",
    error: "Email not verified",
    apiloaded: false,
    success: true,
  });

  var url = window.location;

  useEffect(() => {
    VerifyEmail();
  }, []);

  console.log("Token", url.search);
  const VerifyEmail = async () => {
    const response = await getRequest(`/verify/email/${url.search}`);
    const data = await response.json();
    // console.log("DATA", data);
    if (data.error)
      return setMetaData({
        ...metaData,
        success: false,
        error: data["error"],
        apiloaded: true,
      });
    if (data.email)
      return setMetaData({
        ...metaData,
        success_msg: data["email"],
        apiloaded: true,
      });
    if (data.detail)
      return setMetaData({
        ...metaData,
        error: "Invalid request!!",
        apiloaded: true,
        success: false,
      });
    setMetaData({ ...metaData, apiloaded: true });
  };

  if (!metaData.apiloaded) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={70} width={70} />
      </Override>
    );
  } else
    return (
      <div>
        <Header />
        <div>
          {metaData.success ? (
            <Verified message={metaData.success_msg} />
          ) : (
            <NotVerified message={metaData.error} />
          )}
        </div>
      </div>
    );
};

export default VerifyEmail;
