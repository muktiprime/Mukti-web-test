/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import forgotpwdStyles from "../styles/ForgotPassword.module.css";
import { postRequest, getRequest } from "../utilities/ApiCall";
import Header from "../components/Header/Header";
import { Link, Redirect, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
export default function SetNewPassword(props) {
  const [formInfo, setForm] = useState({
    password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isValidToken, togleToken] = useState(true);
  const router = useHistory();

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await getRequest(
        `/password/token-check/${props.match.params.id}/${props.match.params.token}/`
      );
      const data = await response.json();
      // console.log("ERR", data);
      if (data["error"]) {
        togleToken(false);
        return setError(data.error);
      } else if (!data.success) {
        setError("Invalid link");
        togleToken(false);
      }
    } catch (err) {
      console.log(err);
      setError("link in invalid");
      togleToken(false);
    }
  };

  const submit = async (event) => {
    try {
      event.preventDefault();
      setError("");
      setMessage("");
      if (formInfo["password"] !== formInfo["confirm_password"])
        return setError("Pasword and confirm password must be same!!");
      const body = {
        password: formInfo.password,
        token: props.match.params.token,
        uidb64: props.match.params.id,
      };
      const response = await postRequest(
        `/password/reset/`,
        JSON.stringify(body),
        "PATCH"
      );
      const data = await response.json();
      if (data.detail) return setError(data.detail);
      if (data.success) {
        // setTimeout(() => {
        // 	router.push("/");
        // }, 3000);

        Swal.fire({
          title: `Password Changed Successfully!`,
          icon: "success",
        });
        return router.push("/login");
        // return setMessage("Password changed successfully!!");
      }
      setError("Something went wrong!");
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div>
      <Header />
      {!isValidToken ? (
        <h1 style={{ textAlign: "center", margin: "15%" }}>{error}</h1>
      ) : (
        <div className={forgotpwdStyles.forgot}>
          <div className={forgotpwdStyles.forgot__container}>
            <div className={forgotpwdStyles.forgot__shadow}>
              <h1
                style={{ textAlign: "center", marginLeft: 0 }}
                className={forgotpwdStyles.forgot__title}
              >
                Set a New Password
              </h1>
              <h5 style={{ textAlign: "center", color: "red" }}>{error}</h5>

              <form
                onSubmit={(e) => submit(e)}
                action="POST"
                autoComplete="new-password"
              >
                <div>
                  <h6 style={{ textAlign: "center", color: "green" }}>
                    {message}
                  </h6>
                  <div
                    style={{ marginTop: 25 }}
                    className={forgotpwdStyles.group}
                  >
                    <input
                      type="password"
                      minLength="6"
                      onChange={(e) =>
                        setForm({ ...formInfo, password: e.target.value })
                      }
                      className={forgotpwdStyles.form_input}
                      required
                      placeholder="Password"
                    />
                    <label className={forgotpwdStyles.form_input_label}>
                      Password
                    </label>
                  </div>
                  <div className={forgotpwdStyles.group}>
                    <input
                      type="password"
                      minLength="6"
                      onChange={(e) =>
                        setForm({
                          ...formInfo,
                          confirm_password: e.target.value,
                        })
                      }
                      className={forgotpwdStyles.form_input}
                      required
                      placeholder="Confirm Password"
                    />
                    <label className={forgotpwdStyles.form_input_label}>
                      Confirm Password
                    </label>
                  </div>
                  <div className={forgotpwdStyles.forgot__btn_container}>
                    <input
                      className={forgotpwdStyles.forgot__btn}
                      type="submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
