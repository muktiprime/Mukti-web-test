import React, { useEffect, useState } from "react";
// import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Helmet } from "react-helmet";
import { API_HOST_URL } from "../config";
import { useHistory } from "react-router-dom";
import axios from "../utilities/axios";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Link } from "react-router-dom";

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

const RefundPolicy = () => {
  const [loading, setLoading] = useState(true);
  const [refund_data, setRefunddata] = useState([]);
  const router = useHistory();
  useEffect(async () => {
    // window.scrollTo(0, 0);
    setLoading(true);
    const response = await axios.get(`${API_HOST_URL}/wd/ajax/refundpolicy/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    setRefunddata(data);
    setLoading(false);

    // console.log(data);
  }, []);
  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={70} width={70} />
      </Override>
    );
  } else {
  return (
    <div style={{ color: "white" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mukti Prime - Refund Policy</title>
      </Helmet>
      <Header />
      <div style={styles.content}>
        <h2 style={styles.heading}>REFUND POLICY</h2>
        <hr style={styles.border} />
        <p>
         {refund_data.description}
        </p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>PRIVACY CONTACT</h3>
        <p>{refund_data.privacy_contact}</p>
      </div>
      <Footer />
    </div>
  );
}
};

const styles = {
  content: {
    margin: "25pt",
  },
  heading: {
    textAlign: "center",
  },
  border: {
    marginTop: "30px",
    borderTop: "1px solid #fff",
  },
  gap: {
    marginTop: "30px",
    marginBottom: "25px",
  },
  ul: {
    listStyleType: "square",
    marginLeft: "27px",
  },
};

export default RefundPolicy;
