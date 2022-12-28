/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import activeStyles from "../styles/activePlan.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { api_url, image_base } from "../utilities/constants";
import styled from "styled-components";
import Footer from "../components/Footer/Footer";
import Loader from "react-loader-spinner";
import Header from "../components/Header/Header";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SideBar from "../components/Sidebar/Sidebar";
import { Helmet } from "react-helmet";

const Override = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;

const ActivePlan = () => {
  const [errorMsg, setErrorMsg] = useState();
  const [curPlan, setCurPlan] = useState({
    plan: {},
    billing: {},
  });
  const [isPlanavailabel, setPlanavailabel] = useState("");
  const [loading, setLoading] = useState(true);

  const getPlan = async () => {
    // console.log("get plans");
    const token = await JSON.parse(localStorage.getItem("loginToken"));
    const response = await fetch(`${api_url}/user/plan/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });
    const responseData = await response.json();
    // console.log(responseData);
    if (response.status === 200) {
      setCurPlan({
        ...curPlan,
        plan: responseData["plan"],
        billing: responseData["billing"],
      });
    }
    if (response.status === 404) {
      setPlanavailabel(responseData.message);
      // console.log("da", curPlan);
    } else {
      setErrorMsg(responseData.message);
      // console.log("he", responseData.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPlan();
  }, []);

  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={80} width={80} />
      </Override>
    );
  } else {
    if (isPlanavailabel)
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Mukti Prime : Active Plan</title>
          </Helmet>
          <Header />
          <SideBar />
          <div className={activeStyles.pref}>
            <h2
              className="mx-5 mt-5"
              style={{ color: "white", textAlign: "center" }}
            >
              {isPlanavailabel}
            </h2>
            <div style={{ color: "white", textAlign: "center" }}>
              <br />
              <Link to="/plans">
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ backgroundColor: "red" }}
                >
                  Choose Plans
                </button>{" "}
              </Link>
            </div>
          </div>
        </div>
      );

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mukti Prime : Active Plan</title>
        </Helmet>
        <Header />
        <SideBar />
        <div className={activeStyles.pref2}>
          <div className={activeStyles.main}>
            <p>{errorMsg}</p>
            <div className={activeStyles.left_section}>
              <span className={activeStyles.btn_section}>
                <button className={activeStyles.plan_btn}>Active Plan</button>
              </span>
              <div className={activeStyles.title_back}>
                <h2>
                  <strong className={activeStyles.title}>
                    {curPlan.plan.name}
                  </strong>
                </h2>
              </div>
              <p className={activeStyles.price}>
                <span className={activeStyles.rupee}></span>₹{" "}
                {curPlan.billing.plan_price}
              </p>
            </div>
            <div className={activeStyles.list}>
              <ul>
                <li className={activeStyles.list_content}>
                  <i className="fa fa-lg fa-check-circle  mr-2"></i>
                  <strong>Validity: </strong> {curPlan.plan.plan_validity}
                </li>
                <li className={activeStyles.list_content}>
                  <i className="fa fa-lg fa-check-circle  mr-2"></i>
                  <strong>Device: </strong> {curPlan.plan.device}
                </li>

                <li className={activeStyles.list_content}>
                  <i className="fa fa-lg fa-check-circle  mr-2"></i>
                  <strong>Purchase Date: </strong>{" "}
                  {new Date(curPlan.plan.purchase_date).toLocaleDateString(
                    "en-US"
                  )}
                </li>
                <li className={activeStyles.list_content}>
                  <i className="fa fa-lg fa-check-circle  mr-2"></i>
                  <strong>Expiry Date: </strong>{" "}
                  {new Date(curPlan.plan.expiry_date).toLocaleDateString(
                    "en-US"
                  )}
                </li>
                <li className={activeStyles.list_content}>
                  <i className="fa fa-lg fa-check-circle mr-2"></i>
                  <strong>Payment ID: </strong>{" "}
                  {curPlan.billing.trans_id.replace("pay_", "")}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
};

export default ActivePlan;
