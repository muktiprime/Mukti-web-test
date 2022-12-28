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

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const [contact_data, setContactdata] = useState([]);
  const router = useHistory();
  useEffect(async () => {
    // window.scrollTo(0, 0);
    setLoading(true);
    const response = await axios.get(`${API_HOST_URL}/wd/ajax/contact_us/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    setContactdata(data);
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
        <title>Mukti Prime - Contact</title>
      </Helmet>
      <Header />
      <div style={{ padding: "0 15px" }}>
        <div className="row">
          <div className="col-10 col-md-5" style={styles.content}>
            <h2 style={styles.heading}>Technical Help</h2>
            <hr style={styles.border} />
            <p>{contact_data.technical_help} </p>
          </div>
          <div className="col-10 col-md-5" style={styles.content}>
            <h2 style={styles.heading}>Official Contact</h2>
            <hr style={styles.border} />
            <p>
              {contact_data.official_contact}
            </p>
          </div>
        </div>
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
  mark: {
    color: "#e62728",
  },
};
export default ContactUs;
