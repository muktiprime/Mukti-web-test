/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import signinStyles from "../styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FcGoogle } from "react-icons/fc";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, Redirect, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../utilities/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { object } from "prop-types";
import { useRadioGroup } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import FacebookLogin from 'react-facebook-login';
import { api_url } from "../utilities/constants";
import { setCookies } from "../utilities/auth";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { API_HOST_URL } from "../config";
import Swal from "sweetalert2";
import { Window } from "@mui/icons-material";

const Override = styled.div`
  margin-top: -10px;
`;

export default function Login(props) {
  const [username, setUsername] = useState();
  const [mobile, setMobile] = useState();
  const [otp, setOtp] = useState();
  const [otpInput, setOtpInput] = useState(false);
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [redirectUrl, setRedirectUrl] = useState("/");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [device, setDevice] = useState();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  let history = useHistory();
  useEffect(() => {
    try {
      if (props.location.state) {
        setRedirectUrl(props.location.state.from.pathname);
      } else {
        // console.log("props user came direct");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // const responseGoogle = async (response) => {
  //   // setGoogleLoading()
  //   // console.log("google response", JSON.stringify(response));
  //   setError("");
  //   try {
  //     let google_token = "";
  //     if (response.tokenId) google_token = response.tokenId;

  //     const body = {
  //       auth_token: google_token,
  //     };
  //     const res = await fetch(`${api_url}/auth/google/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     });
  //     const data = await res.json();
  //     // console.log(data);
  //     if (data.detail) {
  //       setError(data.detail);
  //       // Swal.fire({
  //       //     title: 'Login!',
  //       //     text: `${data.detail && ''}`,
  //       //     icon: 'info',
  //       //     confirmButtonText: 'Try Again'
  //       // })
  //     }
  //     if (data.tokens) {
  //       localStorage.setItem("loginToken", JSON.stringify(data["tokens"]));
  //       localStorage.setItem("user", data["id"]);
  //       localStorage.setItem("user_email", data["email"]);
  //       setCookies(await JSON.stringify(data["tokens"]));
  //       setError("");

  //       window.location.reload();
  //     }
  //     setGoogleLoading(false);
  //   } catch (error) {
  //     console.log("ERROR ->", error);
  //     setGoogleLoading(false);
  //   }

  //   // console.log(data);
  // };

  // const responseFacebook = async (response) => {
  //   // console.log("facebook response", response);
  //   // console.log("facebook response", response.accessToken);
  //   setError("");
  //   const body = {
  //     auth_token: response.accessToken ? response.accessToken : "",
  //   };
  //   const res = await fetch(`${api_url}/auth/facebook/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   const data = await res.json();
  //   if (data.detail) {
  //     setError(data.detail);
  //     // Swal.fire({
  //     //     title: 'Login!',
  //     //     text: `${data.detail && ''}`,
  //     //     icon: 'info',
  //     //     confirmButtonText: 'Try Again'
  //     // })
  //   }
  //   if (data.tokens) {
  //     localStorage.setItem("loginToken", JSON.stringify(data["tokens"]));
  //     localStorage.setItem("user", data["id"]);
  //     setCookies(await JSON.stringify(data["tokens"]));
  //     setError("");
  //     // setFacebookLoading(false)
  //     window.location.reload();
  //   }
  //   // console.log(data);
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = `${API_HOST_URL}/v1/login_verify/mobile/send/`;
    setError("");
    let data = { mobile_number: mobile };
    setLoader(true);
    console.log("🚀 ~ file: login.js:152 ~ handleLogin ~ data", data)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    setUser(responseJson.username)
    if (response.status === 200) {
      const s_response = await axios.get(`${API_HOST_URL}/devb/ajax/login/` + mobile + `/add`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const s_data = await s_response.data;
      setDevice(s_data.status)
      setOtpInput(true)
      setLoader(false);
      setOtpInput(true)
      // console.log(s_data);
      // if (s_data.status === 0) {
      //   let devices = s_data.devices;
      //   setLoader(false);
      //   // console.log("logged in failed", response.status, responseJson);

      //   Swal.fire({
      //     title: "Login Failed!",
      //     text: `You've exceeded you device limit. Your max device limit is ` +
      //       devices +
      //       `. Please log out from other ` +
      //       (devices > 1 ? `devices` : `device`) +
      //       ` to continue.`,
      //     icon: "error",
      //     confirmButtonText: "Try Again",
      //   });
      //   // setError(s_data.message);
      // } else {
      //   setOtpInput(true)
      //   // console.log("logged in successfully", response.status, responseJson);
      //   // localStorage.setItem(
      //   //   "loginToken",
      //   //   JSON.stringify(responseJson["tokens"])
      //   // );
      //   // localStorage.setItem("user", responseJson["id"]);
      //   // localStorage.setItem("user_email", responseJson["email"]);
      //   // setCookies(await JSON.stringify(responseJson["tokens"]));
      //   // setLoader(false);

      //   // // window.location.reload();
      //   // // history.push("/");
      //   // Swal.fire({
      //   //   title: "Login Success!",
      //   //   icon: "success",
      //   //   confirmButtonText: "Explore Mukti Prime!",
      //   // });
      //   // setTimeout(() => {
      //   //   setError("");
      //   // }, 4000);
      // }
      // Device Binding Checking end
    } else {
      Swal.fire({
        title: "Login Failed!",
        text: `${responseJson.detail && ""}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
      setLoader(false);
      setError(responseJson.detail);
      responseJson.mobile?.length > 0
        ? setUsernameError(responseJson.mobile[0])
        : setUsernameError("");
      responseJson.otp?.length > 0
        ? setPasswordError(responseJson.otp[0])
        : setPasswordError("");
    }
  };
  console.log("first+++++++++++++++++++++++++++++", otpInput)
  const isAuthenticated = localStorage.getItem("loginToken");

  const VerifyOtp = async () => {
    console.log("OTP Verify -==-=-=-=-=-");
    // http://127.0.0.1:8000/v1/verify/mobile/
    const url = `${API_HOST_URL}/v1/auth/login/`;
    const data = {
      otp: parseInt(otp),
      mobile: mobile,
      username: user
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("🚀 ~ file: login.js:247 ~ VerifyOtp ~ response", response, "-=-=-=-=", response.status)

    const responseJson = await response.json();

    let devices = device;

    if (response.status === 200) {
      console.log("logged in successfully", response.status, responseJson);
      localStorage.setItem(
        "loginToken",
        JSON.stringify(responseJson["tokens"])
      );
      localStorage.setItem("user", responseJson["id"]);
      localStorage.setItem("mobile", responseJson["mobile"]);
      setCookies(await JSON.stringify(responseJson["tokens"]));
      setLoader(false);

      window.location.reload();
      history.push("/");
      Swal.fire({
        title: "Login Success!",
        icon: "success",
        confirmButtonText: "Explore Mukti Prime!",
      });
      setTimeout(() => {
        setError("");
      }, 4000);
    } else {
      setLoader(false);
      Swal.fire({
        title: "Login Failed!",
        text: `You've exceeded you device limit. Your max device limit is ` +
          devices +
          `. Please log out from other ` +
          (devices > 1 ? `devices` : `device`) +
          ` to continue.`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }

  }

  if (isAuthenticated) {
    // console.log("authenticated");
    return <Redirect to={redirectUrl} />;
  } else {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mukti Prime : Login</title>
        </Helmet>
        <Header />
        <div className={signinStyles.signin}>
          <div className={signinStyles.signin__bg} />
          <div className={signinStyles.signin__container}>
            <div className={signinStyles.signin__shadow}>
              {/* <form onSubmit={(e) => handleLogin(e)} method="post"> */}
              <h1 className={signinStyles.signin__title}>Sign In</h1>
              <p
                style={{ textAlign: "center" }}
                className={signinStyles.btnerrorMessage}
              >
                {error}
              </p>


              <div>
                <div className={signinStyles.group}>
                  <input
                    type="number"
                    className={signinStyles.form_input}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder=" Mobile "
                    required={true}
                  />
                  <label className={signinStyles.form_input_label}>
                    Mobile No
                  </label>
                </div>
                <p className={signinStyles.errorMessage}> {usernameError} </p>
                {/* Button */}
                {otpInput === true ? (
                  <div>
                    <div className={signinStyles.group}>
                      <input
                        className={signinStyles.form_input}
                        // type={showPassword ? "text" : "password"}
                        type="number"
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter Otp"
                        defaultValue={otp}
                        required
                      />

                      <label className={signinStyles.form_input_label}>
                        Otp
                      </label>

                    </div>
                    <p className={signinStyles.errorMessage}> {passwordError} </p>
                    {/* Button */}
                    <div className={signinStyles.signin__btn_container}>
                    </div>
                  </div>) : ("")}
                <div className={signinStyles.signin__btn_container}>
                  {otpInput !== true ? (
                    <div className={signinStyles.signin__btn}>
                      {!loader ? (
                        <input
                          type="submit"
                          className={signinStyles.custom_button}
                          value="Send OTP"
                          onClick={(e) => handleLogin(e)}
                        />
                      ) : (
                        <button className={signinStyles.custom_button}>
                          <Override>
                            <Loader
                              type="ThreeDots"
                              color="white"
                              height={60}
                              width={60}
                            />
                          </Override>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className={signinStyles.signin__btn}>
                      {!loader ? (
                        <input
                          type="submit"
                          className={signinStyles.custom_button}
                          value="Sign In"
                          onClick={(e) => VerifyOtp(e)}
                        />
                      ) : (
                        <button className={signinStyles.custom_button}>
                          <Override>
                            <Loader
                              type="ThreeDots"
                              color="white"
                              height={60}
                              width={60}
                            />
                          </Override>
                        </button>
                      )}
                    </div>)}

                </div>
              </div>



              {/* </form> */}
              {/* <div className={signinStyles.signin__btn_container}>
                <div className={signinStyles.signin__btn}> */}
              {/* <p className={signinStyles.btnerrorMessage}>{error}</p> */}
              {/* <GoogleLogin
                    clientId="163036482960-82de4ravfon3kuktl09cl365ojdgh1la.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        className={signinStyles.google}
                      >
                        <FcGoogle
                          className={signinStyles.signin__google_icon}
                        />

                        {googleLoading ? "Loading..." : "Signin With Google"}
                      </button>
                    )}
                    onSuccess={responseGoogle}
                    onRequest={() => setGoogleLoading(true)}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  /> */}

              {/* <FacebookLogin
                    // appId="1287664624627977"
                    appId="817087449185726"
                    autoLoad={false}
                    fields="name,email"
                    callback={responseFacebook}
                    // onRequest={() => setFacebookLoading(true)}
                    render={(renderProps) => (
                      <button
                        style={{ marginTop: "10px" }}
                        className={signinStyles.facebook}
                        onClick={renderProps.onClick}
                      >
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className={signinStyles.signin__google_icon}
                        />
                        {facebookLoading
                          ? "Loading..."
                          : "Signin With Facebook"}
                      </button>
                    )}
                  /> */}
              {/* </div>
              </div> */}
              {/* <div>
                <p
                  style={{
                    textAlign: "center",
                    color: "#bbbaba",
                    fontSize: "12px",
                  }}
                >
                  By logging in, you agree to our{" "}
                  <Link to="terms-of-use">Terms of Use</Link> and{" "}
                  <Link to="privacy-policy">Privacy Policy</Link>
                </p>
              </div> */}
              <div className={signinStyles.signin__option}>
                <span className={signinStyles.signin__option_newuser}>
                  Not on Mukti Prime yet?
                </span>
                <Link to="/signup" className={signinStyles.signin__option_link}>
                  Sign up now.
                </Link>
              </div>
              <div
                className={signinStyles.user_forgot}
                style={{ marginTop: "20px" }}
              >
                <Link
                  to="/forgot-password"
                  className={signinStyles.forgot_password}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}
