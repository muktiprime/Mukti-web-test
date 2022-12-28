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

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

const AboutUs = (props) => {
  const [loading, setLoading] = useState(true);
  const [about_data, setAboutus] = useState([]);
  const router = useHistory();
  useEffect(async () => {
    setLoading(true);
    const response = await axios.get(`${API_HOST_URL}/wd/ajax/aboutus/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    setAboutus(data);
    setLoading(false);

    // console.log(data)
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
        <title>Mukti Prime - About</title>
      </Helmet>
      <Header />
      <div className="content" style={styles.content}>
        <h2 style={styles.heading}>About Mukti Prime Streaming Platform</h2>
        <hr style={styles.border} />
        <p>{about_data.data}</p>
        
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
export default AboutUs;
