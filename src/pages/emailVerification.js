/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { postRequest, getRequest } from "../utilities/ApiCall";

const EmailVerification = (props) => {
  const [verified, setVrificationStatus] = useState(false);

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    const response = await getRequest(
      `/verify/email/?token=${props.match.params.id}`
    );
    if (!response) return;
    const verification = await response.json();
    console.log(verification);
    if (response.status === 200) setVrificationStatus(true);
  };

  if (!verified) {
    return (
      <h1 style={{ color: "white", textAlign: "center", marginTop: 250 }}>
        Email verification in progress...
      </h1>
    );
  }

  return (
    <h1 style={{ color: "white", textAlign: "center", marginTop: 250 }}>
      Email verified successfully
    </h1>
  );
};

export default EmailVerification;
