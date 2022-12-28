/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import Header from "../Header/Header";
import SideBar from "../Sidebar/Sidebar";
import closeStyles from "./CloseAccount.module.css";
import { getRequest, postRequest } from "../../utilities/ApiCall";
import Context from "../../context_api/global";
import { Helmet } from "react-helmet";
import { setCookies } from "../../utilities/auth";

const CloseAccount = () => {
  const { userData } = useContext(Context);
  const [formJson, setFormJson] = useState({
    user: userData.id,
    reason: "I'm not using this account anymore",
  });

  const closeAccount = async () => {
    try {
      // console.log(formJson);
      const response = await postRequest(
        `/user/profile/deactivate/`,
        JSON.stringify({ ...formJson, user: userData.id }),
        "POST",
        true
      );
      const data = await response.json();
      // console.log("CLOSSE RESPONSE", data);
      localStorage.removeItem("loginToken");
      setCookies("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mukti Prime : Close Account</title>
      </Helmet>
      <Header />
      <SideBar />
      <div className={closeStyles.sections}>
        <div className="container">
          <div className={closeStyles.card00}>
            <p>
              <i
                className="fa fa-warning"
                style={{ fontSize: "22px", color: "#d1aa1d" }}
              ></i>
              <span
                style={{
                  color: "#d1aa1d",
                  fontWeight: "550",
                  marginLeft: "4px",
                }}
              >
                Account Closure Is A Permanent Action
              </span>
              <br />
              Please note account closure is a permanent action and once your
              account is closed it will no longer be available to you and cannot
              be restored. If you decide later that you want to start ordering
              from us again, or if you would like to use services that require
              an account, you will need to create a new account.
            </p>{" "}
          </div>
          <h5 className="mt-3">
            <br />
            Please select the main reason for closing your Mukti account
            (Optional)
          </h5>
          <select
            onChange={(e) =>
              setFormJson({ ...formJson, reason: e.target.value })
            }
            className="form-select"
            aria-label="Default select example"
            required
          >
            {/* <option value='' selected>Choose reason</option> */}
            <option value="I'm not using this account anymore">
              I'm not using this account anymore
            </option>
            <option value="I have another account">
              I have another account
            </option>
            <option value="I want to create a new account">
              I want to create a new account
            </option>
            <option value="Privacy Concerns">Privacy Concerns</option>
            <option value="I don't want to provide a reason">
              I don't want to provide a reason
            </option>
          </select>{" "}
          <br />
          <br />
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckIndeterminate"
              checked={true}
              required
            />
            <label className="form-check-label" for="flexCheckIndeterminate">
              Yes, I want to permanently close my Mukti account and delete my
              data.
            </label>
          </div>{" "}
          {/* <button type="button" class="btn btn-secondary">Close my account</button> */}
        </div>
      </div>
      <div className={closeStyles.sections}>
        <div className="container mt-3">
          <a
            href="#myModal"
            className="btn btn-secondary pl-2"
            data-toggle="modal"
          >
            Close my account
          </a>
        </div>
      </div>
      <div id="myModal" className="modal fade">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header flex-column">
              <div className="icon-box">
                <i className="material-icons">&#xE5CD;</i>
              </div>
              <h4 className="modal-title w-100">Are you sure?</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Do you really want to delete these records? This process cannot
                be undone.
              </p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={() => closeAccount()}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CloseAccount;
