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

const TermsOfUse = (props) => {
  const [loading, setLoading] = useState(true);
  const [terms_data, setTermsdata] = useState([]);
  const router = useHistory();
  useEffect(async () => {
    // window.scrollTo(0, 0);
    setLoading(true);
    const response = await axios.get(`${API_HOST_URL}/wd/ajax/terms_of_use/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    setTermsdata(data);
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
        <title>Mukti Prime - Terms of Use</title>
      </Helmet>
      <Header />
      <div style={styles.content}>
        <h2 style={styles.heading}>{terms_data.title}</h2>
        <hr style={styles.border} />
        <p>{terms_data.description}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Cancellation</h3>
        <p>{terms_data.cancellation}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Changes to Terms of Use</h3>
        <p>{terms_data.changes_to_terms_of_use}</p>
        <p>{terms_data.description}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Law</h3>
        <p>{terms_data.law}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Our Services</h3>
        <p>{terms_data.our_services}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Pay and Termination</h3>
        <p>{terms_data.pay_and_termination}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Refund</h3>
        <p>{terms_data.refund}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Use of Services</h3>
        <p>{terms_data.use_of_services}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Warranty</h3>
        <p>{terms_data.warranty}</p>





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
export default TermsOfUse;
