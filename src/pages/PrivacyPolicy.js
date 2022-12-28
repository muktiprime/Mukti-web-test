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

const PrivacyPolicy = () => {
  const [loading, setLoading] = useState(true);
  const [privacy_data, setPrivvacydata] = useState([]);
  const router = useHistory();
  useEffect(async () => {
    // window.scrollTo(0, 0);
    setLoading(true);
    const response = await axios.get(`${API_HOST_URL}/wd/ajax/privacy_policy/`, {
      // const response = await axios.get(`https://api.muktiprime.com/wd/ajax/privacy_policy/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    setPrivvacydata(data);
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
        <title>Mukti Prime - Privacy Policy</title>
      </Helmet>
      <Header />
      <div style={styles.content}>
        <h2 style={styles.heading}>{privacy_data.title}</h2>
        <hr style={styles.border} />
        <p>{privacy_data.description}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Information We Collect From You</h3>
        <p>{privacy_data.info_collect_from_u}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Information which you provide to us</h3>
        <p>{privacy_data.info_u_provide}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>WHY WE COLLECT YOUR INFORMATION?</h3>
        <p>{privacy_data.why_we_collect_info}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>INFORMATION COLLECTION AND USE</h3>
        <p>{privacy_data.info_coll_and_use}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>PRIVACY CONTROLS</h3>
        <p>{privacy_data.privacy_controls}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>SHARING YOUR INFORMATION</h3>
        <p>{privacy_data.sharing_your_info}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>SECURITY OF YOUR INFORMATION</h3>
        <p>{privacy_data.security_of_info}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>DATA TRANSFERS</h3>
        <p>{privacy_data.data_transfers}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>APPLICATION OF THIS POLICY</h3>
        <p>{privacy_data.application_of_policy}</p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>PRIVACY CONTACT</h3>
        <p>{privacy_data.privacy_contact}</p>
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

export default PrivacyPolicy;
