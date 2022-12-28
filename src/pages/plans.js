/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import plansStyles from "../styles/plans.module.css";
import { is_logged_in } from "../utilities/auth";
import axios from "../utilities/axios";
import { api_url } from "../utilities/constants";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { postRequest } from "../utilities/ApiCall";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_HOST_URL } from "../config";

// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('my');

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

const Plans = (props) => {
  const [loading, setLoading] = useState(true);
  const [plan_data, setPlan] = useState([]);
  const router = useHistory();

  useEffect(async () => {
    setLoading(true);
    const response = await axios.get(`${API_HOST_URL}/v1/payment/plans/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    setPlan(data);
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
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mukti Prime : Subscription</title>
        </Helmet>
        <Header />
        <br /> <br />
        <div className="container">
          <div className="row">
            {plan_data.map((item, index) => (
              <div
                key={index}
                // onClick={() => MakeBilling(item.id)}
                className="col-sm-12 col-md-12 col-lg-4"
              >
                <Link
                  to={`/plan/${item.id}12ii12nn3${index}43n4555n12nn${index}n3434kk34n33`}
                >
                  <div className={plansStyles.landing_page_plans}>
                    <div className={plansStyles.planbox}>
                      <div className={plansStyles.planbox__header}>
                        <div
                          className={
                            plansStyles.planbox__header__value__container
                          }
                        >
                          {item.discount > 0 && (
                            <div
                              className={
                                plansStyles.planbox__header__strike_through
                              }
                            >
                              ₹ {item.price}
                            </div>
                          )}
                          <div className={plansStyles.planbox__header__value}>
                            <span className={plansStyles.price}>
                              {" "}
                              ₹ {item.final_price}
                            </span>
                          </div>
                        </div>
                        <div className={plansStyles.planbox__header__cycle}>
                          {" "}
                          {item.name}
                        </div>
                      </div>
                      <div className={plansStyles.planbox__header}>
                        <div
                          className={
                            plansStyles.planbox__header__value__container
                          }
                        >
                          <div className={plansStyles.planbox__header__value}>
                            <span className={plansStyles.price}>
                              {" "}
                              {item.validity} Months
                            </span>
                          </div>
                        </div>
                        <div className={plansStyles.planbox__header__cycle}>
                          {item.device}{" "}
                          {item.device <= 1 ? "Device" : "Devices"}
                        </div>
                      </div>
                      <div className={plansStyles.planbox__details}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Plans;
