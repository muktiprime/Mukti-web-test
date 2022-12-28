/* eslint-disable no-unused-vars */
import React from "react";
import profileStyles from "../styles/profileUpdate.module.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import SideBar from "../components/Sidebar/Sidebar";
import { api_url, image_base } from "../utilities/constants";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import axios from "../utilities/axios";
import { getTokenFromCookies } from "../utilities/auth";
import { postRequest, getRequest } from "../utilities/ApiCall";
import Header from "../components/Header/Header";
import Swal from "sweetalert2";

const ProfileUpdate = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(props);
  const [token, setToken] = useState(getTokenFromCookies());
  const [success, setSuccess] = useState("");
  const cookie = parseCookies();
  const router = useHistory();
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getRequest(`/user/profile/`, true);
      if (!response) return;
      const profile = await response.json();
      if (response.status === 200) {
        setUser(profile);
        // console.log('profile -> ',profile)
      }
    };
    fetchProfile();
  }, []);

  const update_profile = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccess("");
    var body = {
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      country_code: 91,
      mobile: user.mobile_number,
      gender: user.gender,
    };
    try {
      const response = await postRequest(
        `/user/profile/${user.id}/`,
        JSON.stringify(body),
        "PATCH",
        true
      );
      var responseData = await response.json();
      if (response.status === 200) {
        // console.log(response, responseData);
        setSuccess("Account updated succesfully");
        Swal.fire({
          title: `Account has been updated`,
          icon: "success",
        });
        return router.push("/account/user-account");
      }
      if (responseData.mobile) setErrorMsg(responseData.mobile);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <SideBar />
      <div className={profileStyles.forgot}>
        <div className={profileStyles.forgot__bg} />
        <div className={profileStyles.forgot__container}>
          <div className={profileStyles.forgot__shadow}>
            <h1
              className={profileStyles.forgot__title}
              style={{ marginBottom: 30 }}
            >
              Account Update
            </h1>
            <h6 style={{ color: "green", textAlign: "center" }}>{success}</h6>
            <h6 style={{ color: "red", textAlign: "center" }}>{errorMsg}</h6>
            <form
              onSubmit={(e) => update_profile(e)}
              action="POST"
              autoComplete="new-password"
            >
              <div className={profileStyles.group}>
                <input
                  value={user.full_name}
                  onChange={(e) =>
                    setUser({ ...user, full_name: e.target.value })
                  }
                  className={profileStyles.form_input}
                  required
                />
                <label className={profileStyles.form_input_label}>Name*</label>
              </div>
              {/* <div className={profileStyles.group}>
								<input
									value={user.email}
									// onChange={(e) => setUser({ ...user, email: e.target.value })}
									className={profileStyles.form_input}
									disabled
								/>
								<label className={profileStyles.form_input_label}>Email*</label>
							</div> */}
              <div className={profileStyles.group}>
                <input
                  value={user.username}
                  // onChange={(e) =>  setUser({ ...user, username: e.target.value })    }
                  className={profileStyles.form_input}
                />
                <label className={profileStyles.form_input_label}>
                  Username*
                </label>
              </div>
              <div className={profileStyles.group}>
                <input
                  type="number"
                  value={user.mobile_number}
                  pattern="[0-9]{10}"
                  title="Mobile no must be of 10 digit without county code 91"
                  placeholder="10 Digit Mobile Number"
                  onChange={(e) =>
                    setUser({ ...user, mobile_number: e.target.value })
                  }
                  className={profileStyles.form_input}
                  required
                />
                <label className={profileStyles.form_input_label}>
                  Mobile No.
                </label>
              </div>

              <div className={profileStyles.group}>
                {/* <input value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })} className={profileStyles.form_input} /> */}
                <select
                  defaultValue={user.gender}
                  onChange={(e) => {
                    // console.log( e.target.value)
                    setUser({ ...user, gender: e.target.value });
                  }}
                  className={profileStyles.form_input}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <label className={profileStyles.form_input_label}>Gender</label>
              </div>

              <div className={profileStyles.forgot__btn_container}>
                <button
                  className={profileStyles.forgot__btn}
                  type="submit"
                  forgot
                >
                  Update Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
