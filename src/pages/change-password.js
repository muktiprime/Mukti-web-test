/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import changeStyles from "../styles/change.module.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/Sidebar/Sidebar";
import Context from "../context_api/global";
import { AiFillEyeInvisible } from "react-icons/ai";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Helmet } from "react-helmet";
import { postRequest, getRequest } from "../utilities/ApiCall";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const { userId } = useContext(Context);

  const [chngPwdForm, setchngPwdForm] = useState({
    old_password: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState();
  const [done, setDone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordN, setShowPasswordN] = useState(false);
  const [showPasswordCNF, setShowPasswordCNF] = useState(false);
  const router = useHistory();
  // console.log(chngPwdForm, userId);

  const confirmPopup = () => {
    if (
      window.confirm(
        "Account will be logged out! Are you sure you want to continue?"
      )
    )
      window.location = "/forgot-password";
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setDone("");
    if (chngPwdForm.password !== chngPwdForm.password2)
      return setError("Password and confirm password must be same");
    const response = await postRequest(
      `/password/change/${userId}/`,
      JSON.stringify(chngPwdForm),
      "PATCH",
      true
    );
    var responseData = await response.json();
    // console.log("res", response, responseData);

    if (response.status === 200) {
      setDone("Password Updated Successfully");
      Swal.fire({
        title: `Password has been changed.`,
        icon: "success",
      });
      // setTimeout(() => {
      // 	setDone("");
      // 	setchngPwdForm({
      // 		old_password: "",
      // 		password: "",
      // 		password2: "",
      // 	});
      // }, 4000);
      return router.push("/account/user-account");
    }
    if (responseData.old_password) {
      return setError(responseData.old_password.old_password);
    }
    if (response.status !== 200) {
      setError("please try again after sometime!");
    }
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mukti Prime : Change Password</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <Header />
      <SideBar />
      <div className={changeStyles.forgot}>
        <div
          className={changeStyles.forgot__bg}
          // style={{
          // 	backgroundImage:
          // 		"url(" +
          // 		"https://cdn1.vox-cdn.com/assets/4229567/game-of-thrones-poster_85627-1920x1200.jpg" +
          // 		")",
          // }}
        />
        <div className={changeStyles.forgot__container}>
          <div className={changeStyles.forgot__shadow}>
            <h1
              style={{ textAlign: "center", marginLeft: 0 }}
              className={changeStyles.forgot__title}
            >
              Change Password
            </h1>
            <p style={{ color: "green" }} className="text-center">
              {done}
            </p>

            <form method="post" onSubmit={(e) => submit(e)}>
              <div className={changeStyles.group}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={chngPwdForm.old_password}
                  onChange={(e) =>
                    setchngPwdForm({
                      ...chngPwdForm,
                      old_password: e.target.value,
                    })
                  }
                  required
                  className={changeStyles.form_input}
                />
                <label className={changeStyles.form_input_label}>
                  Current password <required>*</required>
                </label>
                {showPassword ? (
                  <Visibility
                    onClick={() => setShowPassword(!showPassword)}
                    className={changeStyles.rahil}
                  />
                ) : (
                  <VisibilityOff
                    onClick={() => setShowPassword(!showPassword)}
                    className={changeStyles.rahil}
                  />
                )}
              </div>
              <div className={changeStyles.groupFg}>
                <div
                  className={changeStyles.fg_pwd}
                  onClick={() => confirmPopup()}
                >
                  Forgot Password
                </div>
              </div>
              <div className={changeStyles.group}>
                <input
                  type={showPasswordN ? "text" : "password"}
                  value={chngPwdForm.password}
                  onChange={(e) =>
                    setchngPwdForm({
                      ...chngPwdForm,
                      password: e.target.value,
                    })
                  }
                  required
                  className={changeStyles.form_input}
                />
                <label className={changeStyles.form_input_label}>
                  New Password <required>*</required>
                </label>
                {showPasswordN ? (
                  <Visibility
                    onClick={() => setShowPasswordN(!showPasswordN)}
                    className={changeStyles.rahil}
                  />
                ) : (
                  <VisibilityOff
                    onClick={() => setShowPasswordN(!showPasswordN)}
                    className={changeStyles.rahil}
                  />
                )}
              </div>

              <div className={changeStyles.group}>
                <input
                  type={showPasswordCNF ? "text" : "password"}
                  // value={chngPwdForm.password}
                  value={chngPwdForm.password2}
                  onChange={(e) =>
                    setchngPwdForm({
                      ...chngPwdForm,
                      password2: e.target.value,
                    })
                  }
                  required
                  className={changeStyles.form_input}
                />
                <label className={changeStyles.form_input_label}>
                  Confirm Password <required>*</required>
                </label>
                {showPasswordCNF ? (
                  <Visibility
                    onClick={() => setShowPasswordCNF(!showPasswordCNF)}
                    className={changeStyles.rahil}
                  />
                ) : (
                  <VisibilityOff
                    onClick={() => setShowPasswordCNF(!showPasswordCNF)}
                    className={changeStyles.rahil}
                  />
                )}
              </div>
              <p style={{ color: "red" }} className={changeStyles.errors}>
                {error}
              </p>
              <div className={changeStyles.forgot__btn_container}>
                <button
                  className={changeStyles.forgot__btn}
                  type="submit"
                  forgot
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
