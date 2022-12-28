import React from "react";
import transactionStyles from "../styles/transaction.module.css";
import Axios from "axios";
import ReactGa from "react-ga";
import { api_url, image_base } from "../utilities/constants";
import { useEffect, useState } from "react";
import transitions from "@material-ui/core/styles/transitions";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SideBar from "../components/Sidebar/Sidebar";
import { Helmet } from "react-helmet";

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    tranaction();
    setLoading(false);
  }, []);

  ReactGa.initialize("UA-206471971-2");
  ReactGa.pageview(window.location.pathname + window.location.search);

  const tranaction = async () => {
    var token = await JSON.parse(localStorage.getItem("loginToken"));
    try {
      var response = await fetch(`${api_url}/payment/transactions/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      });
      var responseData = await response.json();
      if (response.status === 200) {
        setTransaction(responseData);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={80} width={80} />
      </Override>
    );
  } else {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mukti Prime : Transaction</title>
        </Helmet>
        <Header />
        <SideBar />
        <div className={transactionStyles.tras}>
          <div className="container">
            <div className="row" className={transactionStyles.main}>
              <div className="col-md-1"></div>
              <div className="col-md-12">
                <p className={transactionStyles.heading}>Transaction History</p>

                <div className={transactionStyles.details}>
                  {!transaction.length ? (
                    <h6 style={{ color: "white", textAlign: "center" }}>
                      No Transaction's found!
                    </h6>
                  ) : null}
                  {transaction.map((item, index) => (
                    <div
                      style={{ borderBottom: "1px solid whitesmoke" }}
                      className={transactionStyles.content}
                    >
                      {/* <div className={transactionStyles.content_child}>
                <p className={transactionStyles.content_heading}>Full Name </p>
                <p className={transactionStyles.content_data}>Shekhar Sahani</p>
              </div> */}
                      <div className={transactionStyles.content_child}>
                        <p
                          style={{ textAlign: "center" }}
                          className={transactionStyles.content_heading}
                        >
                          ID
                        </p>
                        <p className={transactionStyles.content_data}>
                          {index + 1}
                        </p>
                      </div>
                      <div className={transactionStyles.content_child}>
                        <p className={transactionStyles.content_heading}>
                          Order Id
                        </p>
                        <p className={transactionStyles.content_data}>
                          {item.order_id}
                        </p>
                      </div>
                      <div className={transactionStyles.content_child}>
                        <p className={transactionStyles.content_heading}>
                          Date
                        </p>
                        <p className={transactionStyles.content_data}>
                          {item.created_at}
                        </p>
                      </div>
                      <div className={transactionStyles.content_child}>
                        <p className={transactionStyles.content_heading}>
                          Amount
                        </p>
                        <p className={transactionStyles.content_data}>
                          {item.amount}
                        </p>
                      </div>
                      <div className={transactionStyles.content_child}>
                        <p className={transactionStyles.content_heading}>
                          Paid
                        </p>
                        <p className={transactionStyles.content_data}>
                          {item.is_paid ? "Paid" : "Not Paid"}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* </div>
        <div className={transactionStyles.details}>
          <p className={transactionStyles.title}>Transaction Details</p>
          <div className={transactionStyles.content_2}>
            <div
              // style={{ flexGrow: "1" }}
              className={transactionStyles.content_child}
            >
              <p className={transactionStyles.content_heading}>Created At </p>
              <p className={transactionStyles.content_data}>
                {transitions.created_at}
              </p>
            </div>
            <div className={transactionStyles.content_child}>
              <p className={transactionStyles.content_heading}>Refrence</p>
              <p className={transactionStyles.content_data}>Birthday Gift</p>
            </div>
          </div>
          <p className={transactionStyles.title}></p>
          <div className={transactionStyles.content_2}>
            <div className={transactionStyles.content_child}>
              <p className={transactionStyles.content_heading}>Amount</p>
              <p className={transactionStyles.content_data}>399.00</p>
            </div>
            <div className={transactionStyles.content_child}>
              <p className={transactionStyles.content_heading}>Reference</p>
              <p className={transactionStyles.content_data}>Birthday Gift</p>
            </div>
          </div>*/}
                </div>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Transaction;
// 168003667511
