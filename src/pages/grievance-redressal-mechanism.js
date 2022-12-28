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
import DOMPurify from "dompurify";
import parse from 'html-react-parser'
const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

const GrievanceRedressalMechanism = () => {
  const [loading, setLoading] = useState(true);
  const [grivance_data, setGrievancedata] = useState([]);
  const [abc, setABCdata] = useState([]);
  const router = useHistory();
  useEffect(async () => {
    // window.scrollTo(0, 0);
    setLoading(true);
    const response = await axios.get(`${API_HOST_URL}/wd/ajax/grievance/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    const abc = "<div>Mukti Prime aims to provide our audiences entertainment through series, shows and films. We try to give our viewers contents that are under community guidelines and globally accepted standards. In case, you have grievances against any content that we post, you must launch on your complaint by sending an email to hello@muktiprime.com in the following format:<ul><li>•\tName of the complainant: </li><li>•\tEmail ID of the complainant: </li><li>•\tUser login ID of the complainant:</li><li>•\tTitle (with URL) of the content:</li><li>•\tNature of the complaint:</li><li>•\tDetails of the complaint:  </li><li>•\tSuggestion or Request to resolve the Content: </li></ul>It must be noted that every complaint should have the complainant’s signature, either written or digital. Mukti Prime may ask for additional information in order to resolve the issue. Mukti Prime will be generating a receipt of the grievance that you’ll receive with 24 hours. After a review of the complaint, Mukti Prime will revert back to you with a decision or action within 48 hours from the date of generation of the receipt of the complaint. Additional time may be required in case we have incomplete information of the complainant. You can withdraw your complaint at any time.</div>";
    // const mySafeHTML = DOMPurify.sanitize(abc);
    // const abc_new = () => <div dangerouslySetInnerHTML={{ __html: mySafeHTML }} />;
    setABCdata(abc);
    setGrievancedata(data);
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
        <title>Mukti Prime - Grievance Redressal Mechanism</title>
      </Helmet>
      <Header />
      <div style={styles.content}>
        <h2 style={styles.heading}>{grivance_data.title}</h2>
        <hr style={styles.border} />
        <h2 className="text-center mt-5 mb-5" style={{marginBottom:'10%'}}>
        {
            grivance_data.content.split("\n").map(function(item, idx) {
                return (
                    <span key={idx}>
                        {item}
                        <br/>
                    </span>
                )
            })
        }
        {/* {parse(abc)} */}
        </h2>
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
export default GrievanceRedressalMechanism;
