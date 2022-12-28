import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import forgotpwdStyles from "../styles/ForgotPassword.module.css";
import { api_url } from "../utilities/constants";
import Axios from "axios";
import SideBar from "../components/Sidebar/Sidebar";
import { postRequest } from "../utilities/ApiCall";
import Header from "../components/Header/Header";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
export default function ForgotPassword() {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // fetchData()
  }, []);

  const sendOtp = async (event) => {
    // Migration Error
    event.preventDefault();
    var body = { email: email };
    try {
      const response = await postRequest(
        `/password/forgot/`,
        JSON.stringify(body),
        "POST"
      );
      if (!response) return;
      const data = await response.json();
      // console.log("DATAA", data);
      if (response.status === 200) {
        // setShowOtp(true);
        // setMessage(`${data.success} ${email}`);
        Swal.fire({
          title: `${data.success} ${email}`,
          icon: "success",
        });
      }
      if (data.error) {
        setMessage(data.error);
      }
      if (data.detail) {
        setMessage(data.detail);
      }
    } catch (error) {
      // console.log("ERRORR", error);
      setMessage(error.error);
      // Migration Error
      // console.log("ERRR", JSON.stringify(error), data)
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MuktiPrime : Forgot Password </title>
      </Helmet>
      <Header />
      <div className={forgotpwdStyles.forgot}>
        <div
          className={forgotpwdStyles.forgot__bg}
          // style={{
          // 	backgroundImage:
          // 		"url(" +
          // 		"https://cdn1.vox-cdn.com/assets/4229567/game-of-thrones-poster_85627-1920x1200.jpg" +
          // 		")",
          // }}
        />
        <div className={forgotpwdStyles.forgot__container}>
          <div className={forgotpwdStyles.forgot__shadow}>
            <h1
              style={{ textAlign: "center", marginLeft: 0 }}
              className={forgotpwdStyles.forgot__title}
            >
              Forgot Password
            </h1>

            <form
              onSubmit={(e) => sendOtp(e)}
              action="POST"
              autoComplete="new-password"
            >
              {!showOtp ? (
                <div>
                  <h6 style={{ textAlign: "center", color: "white" }}>
                    {message}
                  </h6>
                  <div
                    style={{ marginTop: 25 }}
                    className={forgotpwdStyles.group}
                  >
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={forgotpwdStyles.form_input}
                      required
                      placeholder="Your e-mail address"
                    />
                    <label className={forgotpwdStyles.form_input_label}>
                      Email
                    </label>
                  </div>
                  <div className={forgotpwdStyles.forgot__btn_container}>
                    <input
                      className={forgotpwdStyles.forgot__btn}
                      type="submit"
                      value="Reset Password"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h6 style={{ textAlign: "center", color: "white" }}>
                    {message}
                  </h6>
                  <div className={forgotpwdStyles.group}>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className={forgotpwdStyles.form_input}
                      required
                    />
                    <label className={forgotpwdStyles.form_input_label}>
                      Enter OTP
                    </label>
                  </div>
                  <div className={forgotpwdStyles.forgot__btn_container}>
                    <button
                      onClick={(e) => verifyOtp(e)}
                      className={forgotpwdStyles.forgot__btn}
                      type="submit"
                      forgot
                    >
                      Verify otp
                    </button>
                  </div>
                </div>
              )}
            </form>
            <div className={forgotpwdStyles.forgot__option}>
              <span className={forgotpwdStyles.forgot__option_newuser}>
                Back to Login?
              </span>
              <Link to="login" className={forgotpwdStyles.forgot__option_link}>
                Login
              </Link>
            </div>
            <div className={forgotpwdStyles.user_forgot}>
              {/* <Link href="forgot-password" className={forgotpwdStyles.forgot_password}>
                Forgot Password
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
