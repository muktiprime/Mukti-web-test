/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import signupStyles from "../styles/SignUp.module.css";
import { postRequest } from "../utilities/ApiCall";
import Header from "../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { api_url } from "../utilities/constants";
import Loader from "react-loader-spinner";
import { setCookies } from "../utilities/auth";
import { FcGoogle } from "react-icons/fc";
import signinStyles from "../styles/login.module.css";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { AiFillEyeInvisible } from "react-icons/ai";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { API_HOST_URL } from "../config";

const Override = styled.div`
  margin-top: -10px;
`;

function Signup() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    country_code: "91",
    mobile: "",
    // password: "",
    confirm: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [loader, setLoader] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  const [errorData, setErrorData] = useState({
    full_name: [],
    email: [],
    mobile: [],
  });
  // const [showPassword, setShowPassword] = useState(false);
  const router = useHistory();
  const validateForm = () => {
    if (!formData.full_name) {
      setFormData({ ...formData, full_name_error: "Name cannot be blank" });
    // } else if (!formData.email) {
    //   setFormData({ ...formData, email_error: "Email cannot be blank" });
    } else if (formData.mobile && formData.mobile.length !== 10) {
      setFormData({
        ...formData,
        mobile_error: "Mobile no must contain 10 digit ",
      });
    } else {
      return true;
    }
    return false;
  };

  const submit = async (e) => {
    e.preventDefault();
    // setShowPassword(false);
    setError("");
    setErrorData({ full_name: [], email: [], mobile: [] });
    var errors = {
      full_name_error: "",
      email_error: "",
      mobile_error: "",
      // password_error: "",
      confirm_error: "",
    };

    setFormData({ ...formData, ...errors });
    var data = {
      full_name: formData.full_name,
      email: formData.email || "nomail@gmail.com",
      country_code: 91,
      password: "123456",
    };
    if (formData.mobile) data["mobile"] = formData.mobile;

    if (validateForm()) {
      setLoader(true);
      const response = await postRequest(
        `/auth/register/`,
        JSON.stringify(data),
        "post"
      );
      setLoader(false);
      if (!response) return;
      const responseJson = await response.json();
      // console.log("RESP", responseJson, response);

      // console.log(responseJson);
      if (response.status === 200 || response.status === 201) {
        setErrorData({
          full_name: [],
          email: [],
          mobile: [],
        });
        // toast.success("Account created successfully!")
        setSuccess("Account created successfully");
        setFormData({
          full_name: "",
          email: "",
          country_code: "91",
          mobile: "",
          // password: "",
          confirm: "",
        });
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        if (responseJson.errors) {
          if (responseJson.errors.email)
            setErrorData({
              ...errorData,
              email: responseJson.errors.email,
            });
          if (responseJson.errors.mobile)
            setErrorData({
              ...errorData,
              mobile: responseJson.errors.mobile,
            });
          if (responseJson.errors.detail)
            setError(responseJson.errors.detail.join(""));
          if (responseJson.errors.error) setError(responseJson.errors.error);
        }
      }
    }
  };

  const responseGoogle = async (response) => {
    // console.log("google response", JSON.stringify(response));
    let google_token = "";
    if (response.tokenId) google_token = response.tokenId;
    const body = {
      auth_token: google_token,
    };
    const res = await fetch(`${api_url}/auth/google/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.tokens) {
      localStorage.setItem("loginToken", JSON.stringify(data["tokens"]));
      localStorage.setItem("user", data["id"]);
      setCookies(await JSON.stringify(data["tokens"]));
      router.push("/");
      window.location.reload();
    }
    if (data.detail) setError(data.detail);
    // console.log(data);
  };

  const responseFacebook = async (response) => {
    // console.log("facebook response", response.accessToken);
    const body = {
      auth_token: response.accessToken ? response.accessToken : "",
    };
    const res = await fetch(`${api_url}/auth/facebook/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.tokens) {
      localStorage.setItem("loginToken", JSON.stringify(data["tokens"]));
      localStorage.setItem("user", data["id"]);
      setCookies(await JSON.stringify(data["tokens"]));
      router.push("/");
      window.location.reload();
    }
    // console.log(data);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mukti Prime : Sign Up</title>
      </Helmet>
      <Header />

      <ToastContainer />
      <div className={signupStyles.signup}>
        <div className={signupStyles.signup__bg} />
        <div className={signupStyles.signup__container}>
          <div className={signupStyles.signup__shadow}>
            <h1 className={signupStyles.signup__title}>Sign Up</h1>
            <h6 style={{ color: "green", textAlign: "center" }}>{success}</h6>
            {error ? (
              <h6
                style={{ textAlign: "center" }}
                className={signinStyles.btnerrorMessage}
              >
                {error}
              </h6>
            ) : null}
            <form onSubmit={(e) => submit(e)} method="post">
              <div className={signupStyles.group}>
                <input
                  className={signupStyles.form_input}
                  value={formData.full_name}
                  placeholder="Your name"
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  required
                />
                <label className={signupStyles.form_input_label}>
                  Account Name<required> *</required>
                </label>
              </div>
              <p className={signupStyles.errorMessage}>
                {formData.full_name_error}
                {errorData.full_name ? errorData.full_name[0] : ""}
              </p>
              <div className={signupStyles.group}>
                <input
                  type="email"
                  className={signupStyles.form_input}
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  // required
                />
                <label className={signupStyles.form_input_label}>
                  Email
                </label>
              </div>
              <p className={signupStyles.errorMessage}>
                {formData.email_error}
                {errorData.email ? errorData.email[0] : ""}
              </p>

              <div className={signupStyles.group}>
                <input
                  type="number"
                  value={formData.mobile}
                  className={signupStyles.form_input}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  placeholder="10 digit mobile number"
                />
                <label className={signupStyles.form_input_label}>Mobile <required>*</required></label>
              </div>
              <p className={signupStyles.errorMessage}>
                {formData.mobile_error}
                {errorData.mobile ? errorData.mobile[0] : ""}
              </p>

              {/* <div className={signupStyles.group}>
                <input
                  className={signupStyles.form_input}
                  value={formData.password}
                  minLength={6}
                  placeholder="Min 6 characters"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(!showPassword)}
                  className={signinStyles.rahil}
                />
                <label className={signupStyles.form_input_label}>
                  Password<required> *</required>
                </label>
              </div> */}
              {/* <p className={signupStyles.errorMessage}>
                {formData.password_error}
              </p>

              <p className={signupStyles.errorMessage}>
                {formData.confirm_error}
              </p> */}

              <div className={signupStyles.signup__btn_container}>
                <div className={signupStyles.signup__btn}>
                  {/* <p style={{ color: "white" }}>
										<input type="checkbox" checked={true} />
										<span style={{ fontSize: "12px" }}>
											{"  "}I agree to <Link to="/terms-of-use">Terms of Use</Link>.
										</span>
									</p> */}
                  {!loader ? (
                    <input
                      type="submit"
                      value="Join Mukti Prime"
                      className={signupStyles.custom_button}
                    />
                  ) : (
                    <button className={signupStyles.custom_button}>
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
              </div>
            </form>
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
                      <FcGoogle className={signinStyles.signin__google_icon} />

                      {googleLoading ? "Loading..." : "Signup With Google"}
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
                      {facebookLoading ? "Loading..." : "Signup With Facebook"}
                    </button>
                  )}
                />
              </div>
            </div> */}
            <div>
              <p
                style={{
                  textAlign: "center",
                  color: "#bbbaba",
                  fontSize: "12px",
                }}
              >
                By continuing, you agree to our{" "}
                <Link to="terms-of-use">Terms of Use</Link> and{" "}
                <Link to="privacy-policy">Privacy Policy</Link>
              </p>
            </div>
            {/* <div className={signupStyles.checkbox}>
							<p style={{ fontSize: "13px" }}>
								<span className="text-muted">
									By continuing,you agree to our{" "}
								</span>
								<span className="font-weight-bold">
									Terms of service Privacy Policy
								</span>
							</p>
						</div> */}

            <div className={signupStyles.signup__option}>
              <span className={signupStyles.signup__option_newuser}>
                Already have an account?
              </span>
              <Link to="login" className={signupStyles.signup__option_link}>
                Sign in now.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Signup);
