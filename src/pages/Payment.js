/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import plansStyles from "./../styles/plans.module.css";
import ReactGa from "react-ga";
import {
  is_logged_in,
  is_server,
  is_client,
  getToken,
} from "../utilities/auth";
import axios from "../utilities/axios";
import { api_url } from "../utilities/constants";

import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import { Details, SentimentSatisfied } from "@mui/icons-material";
import detailStyles from "./../styles/billingDetails.module.css";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { postRequest, getRequest } from "../utilities/ApiCall";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Context from "../context_api/global";
import { RAZORPAY_PUBLIC_KEY, RAZORPAY_SECRET_KEY } from "../config";
import Swal from "sweetalert2";

const Override = styled.div`
  position: fixed;
  top: 40%;
  left: 47%;
  @media (max-width: 800px) {
    top: 40%;
    left: 40%;
  }
`;

const Payment = (props) => {
  const { userData } = useContext(Context);
  const [currency, setCurrency] = useState("INR");
  const [billingData, setBillingData] = useState([]);
  const [panInfo, setPlanInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPay, setloadingPay] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [billId, setBillId] = useState("");
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(userData);
  const [success, setSuccess] = useState("");
  const router = useHistory();
  //   const { query } = router;

  ReactGa.initialize("UA-206471971-2");
  ReactGa.pageview(window.location.pathname + window.location.search);

  useEffect(async () => {
    setLoading(true);
    if (!userInfo.email) {
      const response = await getRequest(`/user/profile/`, true);
      if (!response) return;
      const profile = await response.json();
      // console.log("Profile", profile);
      if (response.status === 200) {
        setUserInfo(profile);
      }
    } else if (!billId) {
      let bodyData = {
        plan: props.match.params.payment[0],
        billing_address: `India`,
        // billing_mobile: userInfo.mobile_number,
        // billing_name: userInfo.full_name,
        status: true,
        // billing_email: userInfo.email,
      };
      const response = await postRequest(
        `/payment/bills/`,
        JSON.stringify(bodyData),
        "post",
        true
      );
      const billing = await response.json();
      // console.log("BILL ID", billing);

      setBillId(billing.id);
      if (billing.message) {
        // alert(billing.message);
        Swal.fire({
          title: `${billing.message}`,
          icon: "success",
        });
        router.push("/account/active-plan");
      }
    } else {
      // console.log("Fetching bill id");
      const response = await getRequest(`/payment/bills/${billId}/`, true);
      const bills = await response.json();
      // console.log("BILL INFO", bills);
      if (!response) return;
      var token = await getToken();
      if (token) token = JSON.parse(token);
      setToken(token);
      setBillingData(bills);
      setPlanInfo(bills.plan);
      // console.log("planDetails", billingData.plan);
    }
    setLoading(false);
    // const { cookies } = req;
  }, [billId, userInfo]);

  if (props.coupon) {
    setSuccess(
      `🎉 Coupon ${props.coupon.code} applied successfully. Payable amount Rs ₹ ${props.coupon.price_after_discount}`
    );
    Swal.fire({
      title: `Coupon ${props.coupon.code} applied successfully. Payable amount Rs ₹ ${props.coupon.price_after_discount}`,
      icon: "success",
    });
  }

  const ApplyCoupon = async () => {
    let body = {
      code: coupon,
      bill_id: Number(billId),
    };
    // console.log("BODY", body);
    try {
      const response = await Axios({
        url: `${api_url}/payment/coupon/`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
        data: JSON.stringify(body),
      });
      // console.log(response);
      const responseData = await response.data;
      setSuccess(
        `🎉 Coupon ${responseData.coupon_data.code} applied successfully. Payable amount ${responseData.price_after_discount}`
      );
      Swal.fire({
        title: `🎉 Coupon ${responseData.coupon_data.code} applied successfully. Payable amount ${responseData.price_after_discount}`,
        icon: "success",
      });
      // console.log("COUPON res", responseData);
    } catch (err) {
      // console.log(JSON.stringify(err));
      setSuccess("");
      // alert("Invalid Coupon");
      Swal.fire({
        title: "Invalid Coupon",
        icon: "error",
      });
    }
  };

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const RemoveCoupon = async () => {
    let body = {
      bill_id: billingData.id,
    };
    // console.log("BODY", body);
    try {
      const response = await Axios({
        url: `${api_url}/payment/coupon/delete/`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
        data: JSON.stringify(body),
      });
      setCoupon("");
      // console.log(response);
      // const responseData = await response.data;
      // console.log("DELETING COUPON RESPONSE", responseData);
      setSuccess("");
      Swal.fire({
        title: "Coupon removed",
        icon: "success",
      });
    } catch (err) {
      // console.log(err);
      setSuccess("");
      // alert("Invalid Coupon");
      Swal.fire({
        title: "Try again ...",
        icon: "error",
      });
    }
  };

  const showRazorpay = async () => {
    setloadingPay(true);
    const res = await loadScript();
    let bodyData = new FormData();
    bodyData.append("bill_id", billId);
    bodyData.append("currency", currency);
    const data = await Axios({
      url: `${api_url}/payment/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI0OTczMzY0LCJqdGkiOiJiZmI4OTkwZDIyYWY0OGM5OTQ3OWViNmVlOWUwNjdiMiIsInVzZXJfaWQiOjF9.KGpwJjibGgKS7FfQiSlbanY97uIZWgnEwA2aifMB_oM'
      },
      data: bodyData,
    }).then((res) => {
      setloadingPay(false);
      return res;
    });
    var options = {
      key_id: RAZORPAY_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
      key_secret: RAZORPAY_SECRET_KEY,
      amount: data.data.payment.amount,
      currency: currency,
      name: "Mukti Production LLP",
      description: `${panInfo.name} Subscription`,
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      customer: {
        name: userInfo.full_name,
        contact: userInfo.mobile_number ? userInfo.mobile_number : "",
        email: userInfo.email,
      },
      prefill: {
        name: userInfo.full_name,
        email: userInfo.email,
        contact: userInfo.mobile_number ? userInfo.mobile_number : "",
      },
      notify: {
        sms: true,
        email: true,
      },
      // notes: {
      // 	address: "Razorpay Corporate Office",
      // },
      theme: {
        color: "#ed2828",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePaymentSuccess = async (response) => {
    // console.log('RESPONSE ->', response)
    try {
      let bodyData = new FormData();
      // console.log('RESPONSE BODY DATA->', bodyData)
      bodyData.append("response", JSON.stringify(response));
      await Axios({
        url: `${api_url}/payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          // console.log('-->res', res)
          Swal.fire({
            title: "Payment was successful",
            icon: "success",
          });
          setloadingPay(false);
          window.location.assign("/success");
        })
        .catch((err) => {
          // console.log('Redirect Error -> ', err);
          Swal.fire({
            title: "Payment Processing Error",
            text: "Relax Your Money is Safe! Please Contact to Our Support Team!",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    } catch (error) {
      console.log("Payment Exception -> ", error);
      //   router.push("/fail");
    }
  };

  // useEffect(async () => {
  // 	// console.log("TOKEN", await localStorage.getItem("loginToken"));
  // }, []);

  if (loading) {
    return (
      <Override>
        <Loader type="Bars" color="red" height={70} width={80} />
      </Override>
    );
  } else {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className={detailStyles.main}>
            <div className={detailStyles.left_section}>
              <span className={detailStyles.btn_section}>
                <button className={detailStyles.plan_btn}>Your Plan</button>
              </span>
              <div className={detailStyles.title_back}>
                <h2>
                  <strong className={detailStyles.title}>{panInfo.name}</strong>
                </h2>
              </div>
              <p className={detailStyles.price}>
                <span className={detailStyles.rupee}></span>₹{" "}
                {panInfo.final_price}
              </p>
              <h6 style={{ color: "green" }}>{success}</h6>
              {success ? (
                <a
                  href
                  onClick={() => RemoveCoupon()}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: 5,
                    cursor: "pointer",
                    padding: 5,
                    marginTop: 10,
                    fontSize: 10,
                  }}
                >
                  Remove coupon
                </a>
              ) : null}
            </div>
            <div className={detailStyles.list}>
              <ul>
                <li className={detailStyles.list_content}>
                  <i className="fa fa-lg fa-check-circle  mr-2"></i>
                  <strong>Validity</strong> {panInfo.validity} Months
                </li>
                <li className={detailStyles.list_content}>
                  <i className="fa fa-lg fa-check-circle  mr-2"></i>
                  <strong>Access</strong> {panInfo.device}{" "}
                  {panInfo.device <= 1 ? "Device" : "Devices"}
                </li>
                {panInfo.discount > 0 ? (
                  <li className={detailStyles.list_content}>
                    <i className="fa fa-lg fa-check-circle mr-2"></i>
                    <strong>With</strong> ₹ {Number(panInfo.discount)} Discount
                  </li>
                ) : (
                  <li className={detailStyles.list_content}>
                    <i className="fa fa-lg fa-check-circle mr-2"></i>
                    {panInfo.description}
                  </li>
                )}
              </ul>
            </div>
          </div>

          <br />
          <div className={detailStyles.detail_section}>
            <div className={detailStyles.content_new}>
              <strong>
                {" "}
                <p>Name:</p>
              </strong>
              <p>{userInfo.full_name}</p>
            </div>

            <div className={detailStyles.content_new}>
              <strong>
                <p>Mobile:</p>
              </strong>
              {userInfo.mobile_number ? (
                <p>{userInfo.mobile_number}</p>
              ) : (
                <Link to="/account/profile-update">
                  <a
                    href
                    style={{
                      backgroundColor: "#ee2827",
                      color: "white",
                      padding: 5,
                    }}
                  >
                    Update Mobile
                  </a>
                </Link>
              )}
            </div>
            <div className={detailStyles.content_new}>
              <strong>
                <p>Email:</p>
              </strong>
              <p style={{ textTransform: "none" }}>{userInfo.email}</p>
            </div>
            <div className={detailStyles.content_new}>
              <strong>
                <p className="mt-2">Currency:</p>
              </strong>
              <div
                className="btn-group mb-3"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  onClick={() => {
                    setCurrency("INR");
                    Swal.fire({
                      title: "Currency Changed to INR",
                      icon: "success",
                    });
                  }}
                  className={`btn  btn-dark ${currency === "INR" && "active"}`}
                >
                  INR
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrency("USD");
                    Swal.fire({
                      title: "Currency Changed to USD",
                      icon: "success",
                    });
                  }}
                  className={`btn btn-dark ${currency === "USD" && "active"}`}
                >
                  USD
                </button>
              </div>
            </div>
            <div className={detailStyles.button_section}>
              {!success ? (
                <button
                  onClick={() => ApplyCoupon()}
                  className={detailStyles.button}
                >
                  Apply
                </button>
              ) : (
                <button
                  onClick={() => RemoveCoupon()}
                  className={detailStyles.button}
                >
                  Remove
                </button>
              )}
              <input
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                className={detailStyles.coupon}
                value={coupon}
                placeholder="Have a Coupon Code?"
                type="text"
                disabled={success}
              ></input>
              <button
                className={detailStyles.button_1}
                onClick={() => showRazorpay()}
              >
                {loadingPay ? "Please Wait" : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Payment;
