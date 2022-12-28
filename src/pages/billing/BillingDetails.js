import { Details } from "@mui/icons-material";
import React from "react";
import detailStyles from "../../styles/billingDetails.module.css";

const BillingDetails = () => {
  return (
    <div>
      <div className={detailStyles.main}>
        <div className={detailStyles.left_section}>
          <span className={detailStyles.btn_section}>
            <button className={detailStyles.plan_btn}>Your Plan</button>
          </span>
          <div className={detailStyles.title_back}>
            <h2>
              <strong className={detailStyles.title}>Youngster</strong>
            </h2>
          </div>
          <p className={detailStyles.price}>
            <span className={detailStyles.rupee}></span>₹ 399.00
          </p>
        </div>
        <div className={detailStyles.list}>
          <ul>
            <li className={detailStyles.list_content}>
              <i className="fa fa-lg fa-check-circle  mr-2"></i>
              <strong>Validity</strong> 12 Months
            </li>
            <li className={detailStyles.list_content}>
              <i className="fa fa-lg fa-check-circle  mr-2"></i>
              <strong>Device</strong> 3
            </li>
            <li className={detailStyles.list_content}>
              <i className="fa fa-lg fa-check-circle mr-2"></i>
              <strong>Description</strong> plan for family members
            </li>
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
          <p>Shekhar</p>
          <p>Sahani</p>
        </div>
        <div className={detailStyles.content_new}>
          <strong>
            {" "}
            <p style={{ marginRight: "38px" }}>Address:</p>
          </strong>
          <p>Arya Kumar Road machhuatoli opp- union bank</p>
        </div>
        <div className={detailStyles.content_new}>
          <strong>
            <p>Phone No:</p>
          </strong>
          <p>9931901901</p>
        </div>
        <div className={detailStyles.content_new}>
          <strong>
            <p>Email:</p>
          </strong>
          <p style={{ textTransform: "none" }}>starlord0987@gmail.com</p>
        </div>
        <div className={detailStyles.button_section}>
          <button className={detailStyles.button}>Apply</button>
          <input
            className={detailStyles.coupon}
            placeholder="Have a Coupon Code?"
            type="text"
          ></input>
          <button className={detailStyles.button_1}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
